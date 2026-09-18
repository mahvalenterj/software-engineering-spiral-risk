import type { SpiralLoop, SpiralState } from '../types/sdlc'

function baseCostForLoop(loopIndex: number): number {
  return 25 + loopIndex * 18
}

function deliverableForLoop(loopIndex: number): string {
  const deliverables = [
    'Conceito/Protótipo de baixa fidelidade',
    'Protótipo funcional',
    'Sistema em versão beta',
    'Versão de pré-lançamento',
    'Release candidat a',
    'Versão estabilizada',
  ]

  return deliverables[Math.min(loopIndex, deliverables.length - 1)]
}

export function computeSpiralState(
  loopCount: number,
  riskReductionPerLoop: number[],
): SpiralState {
  if (loopCount <= 0) {
    return {
      loops: [],
      cumulativeCost: 0,
      residualRisk: 100,
    }
  }

  let cumulativeCost = 0
  let currentRisk = 100
  const loops: SpiralLoop[] = []

  for (let i = 0; i < loopCount; i += 1) {
    const reduction = Math.max(0, Math.min(1, riskReductionPerLoop[i] ?? 0.3))
    const incrementalCost = baseCostForLoop(i) * (1 + currentRisk / 100)

    cumulativeCost += incrementalCost
    currentRisk = Math.max(0, Math.min(100, currentRisk * (1 - reduction)))

    loops.push({
      loopNumber: i + 1,
      cost: incrementalCost,
      riskLevel: currentRisk,
      deliverable: deliverableForLoop(i),
    })
  }

  return {
    loops,
    cumulativeCost,
    residualRisk: currentRisk,
  }
}

export { baseCostForLoop, deliverableForLoop }
