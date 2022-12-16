export type OverallStatistics = {
  numberOfWorkouts: number;
  workoutDuration: number[];
  volume: number[];
  totalSets: number[];
  totalReps: number[];
  bodyWeight: number[];
}

export type ExerciseStatistics = {
  weight: number;
  reps: number;
}
