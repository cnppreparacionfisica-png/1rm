
/**
 * Calculates the estimated one-rep max (1RM) using the Brzycki formula.
 * This formula is generally most accurate for reps between 2 and 10.
 * @param weight - The weight lifted.
 * @param reps - The number of repetitions performed to failure.
 * @returns The estimated 1RM.
 */
export const calculate1RM = (weight: number, reps: number): number => {
  if (reps === 1) {
    return weight;
  }
  if (reps <= 0 || weight <=0) {
    return 0;
  }
  // Brzycki formula
  return weight / (1.0278 - 0.0278 * reps);
};

/**
 * Estimates the number of reps possible at a given percentage of 1RM.
 * This is an inverse of the Epley formula.
 * @param percentage - The percentage of 1RM (e.g., 85 for 85%).
 * @returns The estimated number of reps.
 */
export const estimateRepsForPercentage = (percentage: number): number => {
    if (percentage >= 100) return 1;
    if (percentage < 35) return 20; // Cap at a reasonable number
    return Math.round((100 - percentage) / 2.5);
}
