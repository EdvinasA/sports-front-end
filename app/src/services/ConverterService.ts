import {WorkoutDetails, WorkoutDetailsUpdateInput} from "../models/workout";

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
