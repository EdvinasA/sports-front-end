import {Exercise, ExerciseCreateInput, WorkoutDetails, WorkoutDetailsUpdateInput} from "../models/workout";

export const convertToWorkoutDetails = (workout: WorkoutDetails) => {
  const convertedValue: WorkoutDetailsUpdateInput =
      {
        id: workout.id,
        name: workout.name,
        bodyWeight: workout.bodyWeight,
        date: workout.date,
        startTime: workout.startTime,
        endTime: workout.endTime,
        notes: workout.notes,
      }

      return convertedValue;
}

export const convertToExerciseCreateInput = (exercise: Exercise) => {
  const convertedValue: ExerciseCreateInput =
      {
        id: exercise.id,
        name: exercise.name,
        note: exercise.note,
        exerciseCategoryId: exercise.exerciseCategoryId,
        exerciseType: exercise.exerciseType,
        isSingleBodyPartExercise: exercise.isSingleBodyPartExercise
      }

  return convertedValue;
}
