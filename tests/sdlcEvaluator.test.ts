import { describe, expect, it } from 'vitest'

import { evaluateSdlc } from '../src/engine/sdlcEvaluator'
import { computeSpiralState } from '../src/engine/spiralCalculator'

const highRiskParams = {
  teamSize: 8,
  requirementsStability: 2,
  businessRiskLevel: 5,
  deadlinePressure: 3,
  needsPrototyping: true,
  domainComplexity: 5,
}

const stableProjectParams = {
  teamSize: 12,
  requirementsStability: 5,
  businessRiskLevel: 1,
  deadlinePressure: 2,
  needsPrototyping: false,
  domainComplexity: 2,
}

describe('evaluateSdlc', () => {
  it('recommends espiral for high-risk, high-complexity projects', () => {
    const result = evaluateSdlc(highRiskParams)
    expect(result.recommended).toBe('espiral')
  })

  it('recommends cascata for very stable and low-risk projects', () => {
    const result = evaluateSdlc(stableProjectParams)
    expect(result.recommended).toBe('cascata')
  })
})

describe('computeSpiralState', () => {
  it('returns empty loops and zero cost for zero loops', () => {
    const state = computeSpiralState(0, [])
    expect(state).toEqual({ loops: [], cumulativeCost: 0, residualRisk: 100 })
  })

  it('never increases residual risk across loops', () => {
    const state = computeSpiralState(5, [0.2, 0.3, 0.35, 0.4, 0.5])
    const risks = state.loops.map((loop) => loop.riskLevel)
    expect(risks.every((risk, index) => index === 0 || risk <= risks[index - 1])).toBe(true)
  })
})
