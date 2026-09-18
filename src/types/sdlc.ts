export type SdlcModel =
  | 'cascata'
  | 'prototipacao'
  | 'espiral'
  | 'incremental'
  | 'modelo-v'
  | 'rad';

export interface ProjectParams {
  teamSize: number;
  requirementsStability: 1 | 2 | 3 | 4 | 5;
  businessRiskLevel: 1 | 2 | 3 | 4 | 5;
  deadlinePressure: 1 | 2 | 3 | 4 | 5;
  needsPrototyping: boolean;
  domainComplexity: 1 | 2 | 3 | 4 | 5;
}

export interface SdlcScore {
  model: SdlcModel;
  score: number;
  justification: string;
}

export interface SdlcRecommendation {
  scores: SdlcScore[];
  recommended: SdlcModel;
}

export type SpiralQuadrant =
  | 'determinar-objetivos'
  | 'analise-reducao-riscos'
  | 'engenharia-desenvolvimento'
  | 'avaliacao-cliente';

export interface SpiralLoop {
  loopNumber: number;
  cost: number;
  riskLevel: number;
  deliverable: string;
}

export interface SpiralState {
  loops: SpiralLoop[];
  cumulativeCost: number;
  residualRisk: number;
}
