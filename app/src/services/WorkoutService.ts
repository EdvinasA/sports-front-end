import {WorkoutDetails, WorkoutDetailsUpdateInput, WorkoutExercise} from "../models/workout";
import {createRequestWithoutResponse, createRequestWithResponse} from "./ApiService";

async function getWorkouts(): Promise<WorkoutDetails[]> {
  const requestOptions = {
    method: 'GET',
  };
  return await createRequestWithResponse(`api/workout`, requestOptions);
}

async function getWorkoutById(id: number): Promise<WorkoutDetails> {
  const requestOptions = {
    method: 'GET',
  };
  return await createRequestWithResponse(`api/workout/${id}`, requestOptions);
}

async function createWorkout(): Promise<number> {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({date: new Date()})
  };
  return await createRequestWithResponse(`api/workout`, requestOptions);
}

async function repeatWorkout(workoutId: number): Promise<number> {
  const requestOptions = {
    method: 'POST'
  };
  return await createRequestWithResponse(`api/workout/repeat/${workoutId}`, requestOptions);
}

async function updateWorkout(workoutDetails: WorkoutDetailsUpdateInput) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(workoutDetails)
  };
  return await createRequestWithoutResponse(`api/workout/update`, requestOptions);
}

async function updateExercises(workoutExercises: WorkoutExercise[]) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(workoutExercises)
  };
  return await createRequestWithoutResponse(`api/workout/update-exercise`, requestOptions);
}

async function deleteWorkout(workoutId: number) {
  const requestOptions = {
    method: 'DELETE'
  };
  return await createRequestWithoutResponse(`api/workout/workout/${workoutId}`, requestOptions);
}

async function deleteWorkoutExercise(workoutExerciseId: number) {
  const requestOptions = {
    method: 'DELETE'
  };
  return await createRequestWithoutResponse(`api/workout/${workoutExerciseId}`, requestOptions);
}

export {getWorkouts, updateWorkout, repeatWorkout, updateExercises, deleteWorkoutExercise, createWorkout, getWorkoutById, deleteWorkout};
