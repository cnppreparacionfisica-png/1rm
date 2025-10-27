
export interface CalculationInput {
  exercise: string;
  weight: number;
  reps: number;
}

export interface Calculation extends CalculationInput {
  id: string;
  oneRepMax: number;
  timestamp: number;
}

export interface PercentageResult {
  percentage: number;
  weight: number;
  reps: number;
}
