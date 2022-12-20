import {createRequestWithoutResponse, createRequestWithResponse} from "./ApiService";
import {WorkoutRoutine} from "../models/Routine";

async function createRoutine(): Promise<number> {
  const requestOptions = {
    method: 'POST'
  };
  return await createRequestWithResponse(`api/workout-routine`, requestOptions);
}

async function createRoutineFromWorkout(workoutId: number): Promise<number> {
  const requestOptions = {
    method: 'POST'
  };
  return await createRequestWithResponse(`api/workout-routine/${workoutId}`, requestOptions);
}

async function createWorkoutFromRoutine(routineId: number): Promise<number> {
  const requestOptions = {
    method: 'POST'
  };
  return await createRequestWithResponse(`api/workout-routine/workout/${routineId}`, requestOptions);
}

async function copyRoutine(routineId: number): Promise<WorkoutRoutine> {
  const requestOptions = {
    method: 'POST'
  };
  return await createRequestWithResponse(`api/workout-routine/copy/${routineId}`, requestOptions);
}

async function updateRoutine(workoutRoutine: WorkoutRoutine): Promise<Response> {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(workoutRoutine)
  };
  return await createRequestWithoutResponse(`api/workout-routine`, requestOptions);
}

async function getRoutines(): Promise<WorkoutRoutine[]> {
  const requestOptions = {
    method: 'GET'
  };
  return await createRequestWithResponse(`api/workout-routine`, requestOptions);
}

async function getRoutine(routineId: number): Promise<WorkoutRoutine> {
  const requestOptions = {
    method: 'GET'
  };
  return await createRequestWithResponse(`api/workout-routine/${routineId}`, requestOptions);
}

async function deleteRoutine(routineId: number): Promise<Response> {
  const requestOptions = {
    method: 'DELETE'
  };
  return await createRequestWithoutResponse(`api/workout-routine/${routineId}`, requestOptions);
}

export { createRoutine, getRoutines, getRoutine, updateRoutine, deleteRoutine, createWorkoutFromRoutine, copyRoutine, createRoutineFromWorkout };
