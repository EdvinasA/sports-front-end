import {ExerciseSet, ExerciseSetCreateInput} from "../models/workout";
import {createRequestWithoutResponse, createRequestWithResponse} from "./ApiService";

async function addExerciseSet(exerciseSetCreate: ExerciseSetCreateInput) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exerciseSetCreate)
  };

  return await createRequestWithResponse(`api/exercise-set`, requestOptions);
}

async function getHistoryExerciseSets(workoutExerciseId: number, exerciseId: number) {
  const requestOptions = {
    method: 'GET'
  };

  return await createRequestWithResponse(`api/exercise-set/${workoutExerciseId}/${exerciseId}`, requestOptions);
}

async function copyExerciseSet(exerciseSetId: number): Promise<ExerciseSet> {
  const requestOptions = {
    method: 'POST'
  };

  return await createRequestWithResponse(`api/exercise-set/${exerciseSetId}`, requestOptions);
}

async function deleteExerciseSet(exerciseSetId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  };
  return await createRequestWithoutResponse(`api/exercise-set/${exerciseSetId}`, requestOptions);
}

async function updateExerciseSetRequest(exerciseSet: ExerciseSet) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exerciseSet)
  };

  return await createRequestWithoutResponse(`api/exercise-set`, requestOptions);
}

export { addExerciseSet, getHistoryExerciseSets, copyExerciseSet, deleteExerciseSet, updateExerciseSetRequest }
