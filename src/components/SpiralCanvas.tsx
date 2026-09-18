import type { SpiralState } from '../types/sdlc'

const quadrantPalette = {
  'determinar-objetivos': '#dbeafe',
  'analise-reducao-riscos': '#dcfce7',
  'engenharia-desenvolvimento': '#fef3c7',
  'avaliacao-cliente': '#fce7f3',
}

interface SpiralCanvasProps {
  state: SpiralState
}

function SpiralCanvas({ state }: SpiralCanvasProps) {
  const centerX = 250
  const centerY = 250

  const path = Array.from({ length: 400 }, (_, index) => {
    const t = (index / 399) * Math.PI * 2 * 1.8
    const r = 25 + index * 0.45 + state.loops.length * 6
    const x = centerX + r * Math.cos(t)
    const y = centerY + r * Math.sin(t)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  const pointMarkers = state.loops.map((loop, index) => {
    const angle = ((index + 1) / Math.max(state.loops.length, 1)) * Math.PI * 2 * 1.8
    const radius = 25 + (index + 1) * 34 + state.loops.length * 4
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    return {
      ...loop,
      x,
      y,
    }
  })

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Visualização da espiral</h2>

      <svg viewBox="0 0 500 500" className="mx-auto block h-auto w-full max-w-[500px] overflow-visible">
        <rect x="0" y="0" width="500" height="500" fill="#f8fafc" rx="18" />

        {[0, 1, 2, 3].map((quadrant) => {
          const start = (quadrant / 4) * Math.PI * 2
          const end = ((quadrant + 1) / 4) * Math.PI * 2
          const outer = 220

          return (
            <path
              key={quadrant}
              d={`M 250 250 L ${250 + outer * Math.cos(start)} ${250 + outer * Math.sin(start)} A ${outer} ${outer} 0 0 1 ${250 + outer * Math.cos(end)} ${250 + outer * Math.sin(end)} Z`}
              fill={Object.values(quadrantPalette)[quadrant]}
              opacity={0.28}
            />
          )
        })}

        <path d={path} fill="none" stroke="#312e81" strokeWidth="4" strokeLinecap="round" />

        {pointMarkers.map((point) => (
          <g key={point.loopNumber}>
            <circle cx={point.x} cy={point.y} r="5" fill="#0f172a" />
            <title>{`${point.loopNumber} • Custo acumulado: ${point.cost.toFixed(0)} • Risco residual: ${point.riskLevel.toFixed(0)}% • ${point.deliverable}`}</title>
          </g>
        ))}

        <circle cx={centerX} cy={centerY} r="10" fill="#111827" />
      </svg>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {Object.entries(quadrantPalette).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2 text-xs font-medium text-slate-700">
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
            {label.replace(/-/g, ' ')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SpiralCanvas
