import {WorkoutDetails, WorkoutDetailsUpdateInput} from "../models/workout";
import {createRequestWithoutResponse, createRequestWithResponse} from "./ApiService";

async function getWorkouts(): Promise<WorkoutDetails[]> {
  const requestOptions = {
    method: 'GET',
  };
  return await createRequestWithResponse(`api/workout/1`, requestOptions);
}

async function getWorkoutById(id: number): Promise<WorkoutDetails> {
  const requestOptions = {
    method: 'GET',
  };
  return await createRequestWithResponse(`api/workout/1/${id}`, requestOptions);
}

async function createWorkout(): Promise<number> {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({date: new Date()})
  };
  return await createRequestWithResponse(`api/workout/1`, requestOptions);
}

async function updateWorkout(workoutDetails: WorkoutDetailsUpdateInput) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(workoutDetails)
  };
  return await createRequestWithoutResponse(`/api/workout/1/update`, requestOptions);
}

async function deleteWorkout(workoutId: number) {
  const requestOptions = {
    method: 'DELETE'
  };
  return await createRequestWithoutResponse(`api/workout/1/workout/${workoutId}`, requestOptions);
}

async function deleteWorkoutExercise(workoutExerciseId: number) {
  const requestOptions = {
    method: 'DELETE'
  };
  return await createRequestWithoutResponse(`api/workout/1/${workoutExerciseId}`, requestOptions);
}

export {getWorkouts, updateWorkout, deleteWorkoutExercise, createWorkout, getWorkoutById, deleteWorkout};
