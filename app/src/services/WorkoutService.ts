import {ExerciseBodyPart, WorkoutDetails, WorkoutDetailsUpdateInput} from "../models/workout";

async function getWorkouts() {
  const response = await fetch("https://localhost:7173/api/workout/1");

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function updateWorkout(workoutDetails: WorkoutDetailsUpdateInput) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(workoutDetails)
  };
  return await fetch("https://localhost:7173/api/workout/1/update", requestOptions);
}

async function deleteWorkoutExercise(workoutExerciseId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  };
  return await fetch(`https://localhost:7173/api/workout/1/${workoutExerciseId}`, requestOptions);
}

export {getWorkouts, updateWorkout, deleteWorkoutExercise};
