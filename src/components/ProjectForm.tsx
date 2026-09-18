import type { ProjectParams } from '../types/sdlc'

interface ProjectFormProps {
  params: ProjectParams
  onChange: (next: ProjectParams) => void
}

const numericFields: Array<{
  key: keyof Pick<ProjectParams, 'teamSize' | 'requirementsStability' | 'businessRiskLevel' | 'deadlinePressure' | 'domainComplexity'>
  label: string
  min: number
  max: number
}> = [
  { key: 'teamSize', label: 'Tamanho da equipe', min: 1, max: 15 },
  { key: 'requirementsStability', label: 'Estabilidade dos requisitos', min: 1, max: 5 },
  { key: 'businessRiskLevel', label: 'Risco de negócio', min: 1, max: 5 },
  { key: 'deadlinePressure', label: 'Pressão de prazo', min: 1, max: 5 },
  { key: 'domainComplexity', label: 'Complexidade do domínio', min: 1, max: 5 },
]

function ProjectForm({ params, onChange }: ProjectFormProps) {
  const updateNumeric = (field: keyof ProjectParams, value: number) => {
    onChange({
      ...params,
      [field]: value,
    })
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Parâmetros do projeto</h2>

      <div className="space-y-5">
        {numericFields.map(({ key, label, min, max }) => (
          <div key={key}>
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <label htmlFor={key}>{label}</label>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                {params[key]}
              </span>
            </div>
            <input
              id={key}
              type="range"
              min={min}
              max={max}
              value={params[key]}
              onChange={(event) => updateNumeric(key, Number(event.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-600"
            />
          </div>
        ))}

        <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
          <span>Necessita prototipagem</span>
          <input
            type="checkbox"
            checked={params.needsPrototyping}
            onChange={(event) => onChange({ ...params, needsPrototyping: event.target.checked })}
            className="h-4 w-4 accent-indigo-600"
          />
        </label>

        <div>
          <label htmlFor="teamSizeInput" className="mb-2 block text-sm font-medium text-slate-700">
            Quantidade de desenvolvedores
          </label>
          <input
            id="teamSizeInput"
            type="number"
            min={1}
            max={15}
            value={params.teamSize}
            onChange={(event) => updateNumeric('teamSize', Number(event.target.value) || 1)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none ring-0 transition focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectForm
