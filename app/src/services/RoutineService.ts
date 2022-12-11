import {createRequestWithResponse} from "./ApiService";
import {WorkoutRoutine} from "../models/Routine";

async function createRoutine(): Promise<number> {
  const requestOptions = {
    method: 'POST'
  };
  return await createRequestWithResponse(`api/workout-routine`, requestOptions);
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

export { createRoutine, getRoutines, getRoutine };
