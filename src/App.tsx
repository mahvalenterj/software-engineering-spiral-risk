import { useMemo, useState } from 'react'

import ProjectForm from './components/ProjectForm'
import RiskMatrixTable from './components/RiskMatrixTable'
import SdlcRecommendation from './components/SdlcRecommendation'
import SpiralCanvas from './components/SpiralCanvas'
import { evaluateSdlc } from './engine/sdlcEvaluator'
import { computeSpiralState } from './engine/spiralCalculator'
import type { ProjectParams } from './types/sdlc'

const defaultParams: ProjectParams = {
  teamSize: 7,
  requirementsStability: 3,
  businessRiskLevel: 4,
  deadlinePressure: 3,
  needsPrototyping: true,
  domainComplexity: 4,
}

function App() {
  const [params, setParams] = useState<ProjectParams>(defaultParams)
  const recommendation = useMemo(() => evaluateSdlc(params), [params])
  const spiralState = useMemo(() => computeSpiralState(5, [0.2, 0.3, 0.4, 0.5, 0.6]), [params])

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-800 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-700 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">SpiralRisk</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Simulador de Ciclo de Vida de Software e Gestão de Riscos de Boehm
          </h1>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
          <ProjectForm params={params} onChange={setParams} />
          <SdlcRecommendation recommendation={recommendation} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <SpiralCanvas state={spiralState} />
          <RiskMatrixTable />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Resumo da espiral</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Custo acumulado</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{spiralState.cumulativeCost.toFixed(0)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Risco residual</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{spiralState.residualRisk.toFixed(0)}%</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Voltas</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{spiralState.loops.length}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
