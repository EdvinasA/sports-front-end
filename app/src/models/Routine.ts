import {Exercise} from "./workout";

export type WorkoutRoutine = {
  id: number;
  name: string;
  targets: string;
  notes: string;
  workoutRoutineExercises: WorkoutRoutineExercise[]
}

export type WorkoutRoutineExercise = {
  id: number;
  exercise: Exercise;
  notes: string;
  numberOfSets: number;
}

export type AddExerciseToRoutineInput = {
  exerciseId: number;
  rowNumber: number;
  routineId: number;
}
