import type { ProjectParams, SdlcModel, SdlcRecommendation, SdlcScore } from '../types/sdlc'

const IDEAL_PROFILES: Record<SdlcModel, Partial<ProjectParams>> = {
  cascata: { requirementsStability: 5, businessRiskLevel: 1, needsPrototyping: false },
  prototipacao: { requirementsStability: 2, needsPrototyping: true },
  espiral: { businessRiskLevel: 5, domainComplexity: 5 },
  incremental: { requirementsStability: 3, deadlinePressure: 3 },
  'modelo-v': { businessRiskLevel: 4, requirementsStability: 4 },
  rad: { deadlinePressure: 5, teamSize: 3 },
}

const TIE_BREAK_PRIORITY: Record<SdlcModel, number> = {
  espiral: 0,
  'modelo-v': 1,
  incremental: 2,
  rad: 3,
  prototipacao: 4,
  cascata: 5,
}

function clampedScore(value: number): number {
  return Math.max(0, Math.min(100, value))
}

function normalizeNumberValue(value: number): number {
  return Math.max(0, Math.min(1, (value - 1) / 4))
}

function computeSimilarity(
  params: ProjectParams,
  profile: Partial<ProjectParams>,
): number {
  const entries = Object.entries(profile) as Array<[keyof ProjectParams, ProjectParams[keyof ProjectParams]]>

  if (entries.length === 0) {
    return 100
  }

  const distances = entries.map(([key, idealValue]) => {
    const currentValue = params[key]

    if (typeof idealValue === 'boolean') {
      return currentValue === idealValue ? 0 : 1
    }

    if (typeof idealValue === 'number') {
      const currentNormalized = normalizeNumberValue(Number(currentValue))
      const idealNormalized = normalizeNumberValue(Number(idealValue))
      return Math.abs(currentNormalized - idealNormalized)
    }

    return 0
  })

  const averageDistance = distances.reduce((total, value) => total + value, 0) / distances.length
  return clampedScore(100 - averageDistance * 100)
}

function buildJustification(model: SdlcModel, params: ProjectParams, score: number): string {
  const riskText = `risco de negócio ${params.businessRiskLevel}/5`
  const requirementText = `estabilidade de requisitos ${params.requirementsStability}/5`
  const deadlineText = `pressão de prazo ${params.deadlinePressure}/5`
  const prototypeText = params.needsPrototyping ? 'prototipagem ativa' : 'sem prototipagem prioritária'

  const base = {
    cascata: `Score ${score.toFixed(0)}/100: requisitos muito estáveis (${requirementText}) e baixo ${riskText} favorecem a cascata, que preserva previsibilidade linear quando o escopo é estável e o negócio não exige mudanças frequentes.`,
    prototipacao: `Score ${score.toFixed(0)}/100: com ${prototypeText} e requisitos instáveis (${requirementText}), prototipação reduz ambiguidade e acelera validação de hipóteses antes do compromisso do projeto.`,
    espiral: `Score ${score.toFixed(0)}/100: alto ${riskText} e complexidade de domínio ${params.domainComplexity}/5 favorecem o Modelo Espiral, que dedica ciclos explícitos à análise e redução de riscos antes de cada avanço.`,
    incremental: `Score ${score.toFixed(0)}/100: a combinação de requisitos moderadamente estáveis (${requirementText}) e prazo ${deadlineText} torna a entrega incremental adequada para evoluir em pedaços com ajuste contínuo de escopo.`,
    'modelo-v': `Score ${score.toFixed(0)}/100: ${riskText} e estabilidade de requisitos ${requirementText} indicam necessidade de validação rigorosa em cada etapa, característica típica do Modelo V em contextos críticos e regulatórios.`,
    rad: `Score ${score.toFixed(0)}/100: equipe pequena (${params.teamSize} pessoas) com prazo crítico (${deadlineText}) sugere RAD, priorizando velocidade, prototipação e entrega em ciclos curtos.`,
  } as const

  return base[model]
}

export function evaluateSdlc(params: ProjectParams): SdlcRecommendation {
  const scores: SdlcScore[] = (Object.keys(IDEAL_PROFILES) as SdlcModel[]).map((model) => {
    const score = computeSimilarity(params, IDEAL_PROFILES[model])
    return {
      model,
      score,
      justification: buildJustification(model, params, score),
    }
  })

  scores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }

    return TIE_BREAK_PRIORITY[a.model] - TIE_BREAK_PRIORITY[b.model]
  })

  return {
    scores,
    recommended: scores[0].model,
  }
}

export { IDEAL_PROFILES, TIE_BREAK_PRIORITY, computeSimilarity }
