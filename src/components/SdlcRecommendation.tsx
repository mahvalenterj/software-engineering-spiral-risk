import type { SdlcRecommendation as RecommendationType } from '../types/sdlc'

interface SdlcRecommendationProps {
  recommendation: RecommendationType
}

function SdlcRecommendation({ recommendation }: SdlcRecommendationProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Recomendação de SDLC</h2>

      <div className="space-y-4">
        {recommendation.scores.map((item) => {
          const isRecommended = item.model === recommendation.recommended

          return (
            <div
              key={item.model}
              className={`rounded-xl border p-3 ${
                isRecommended
                  ? 'border-indigo-200 bg-indigo-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                    {item.model}
                  </span>
                  {isRecommended && (
                    <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      recomendado
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-slate-800">{item.score.toFixed(0)} / 100</span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    isRecommended ? 'bg-indigo-600' : 'bg-slate-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-700">{item.justification}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SdlcRecommendation
