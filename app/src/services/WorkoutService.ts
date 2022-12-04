import {WorkoutDetails, WorkoutDetailsUpdateInput} from "../models/workout";

const ROOT_URL = process.env.REACT_APP_API_URL;

async function getWorkouts() {
  const response = await fetch(`${ROOT_URL}/api/workout/1`);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function getWorkoutById(id: number): Promise<WorkoutDetails> {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  };
  const response = await fetch(`${ROOT_URL}/api/workout/1/${id}`, requestOptions);

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
  const response = await fetch(`${ROOT_URL}/api/workout/1`, requestOptions);

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
  return await fetch(`${ROOT_URL}/api/workout/1/update`, requestOptions);
}

async function deleteWorkout(workoutId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  };
  return await fetch(`${ROOT_URL}/api/workout/1/workout/${workoutId}`, requestOptions);
}

async function deleteWorkoutExercise(workoutExerciseId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  };
  return await fetch(`${ROOT_URL}/api/workout/1/${workoutExerciseId}`, requestOptions);
}

export {getWorkouts, updateWorkout, deleteWorkoutExercise, createWorkout, getWorkoutById, deleteWorkout};
