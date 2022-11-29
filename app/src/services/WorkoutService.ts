import {WorkoutDetailsUpdateInput} from "../models/workout";

async function getWorkouts() {
  const response = await fetch("https://icemt63mgy.eu-west-1.awsapprunner.com/api/workout/1");

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function createWorkout(): Promise<number> {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({date: new Date()})
  };
  const response = await fetch("https://icemt63mgy.eu-west-1.awsapprunner.com/api/workout/1", requestOptions);

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
  return await fetch("https://icemt63mgy.eu-west-1.awsapprunner.com/api/workout/1/update", requestOptions);
}

async function deleteWorkoutExercise(workoutExerciseId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  };
  return await fetch(`https://icemt63mgy.eu-west-1.awsapprunner.com/api/workout/1/workout/${workoutExerciseId}`, requestOptions);
}

export {getWorkouts, updateWorkout, deleteWorkoutExercise, createWorkout};
