import {ExerciseSet, ExerciseSetCreateInput} from "../models/workout";

const ROOT_URL = process.env.REACT_APP_API_URL;

async function addExerciseSet(exerciseSetCreate: ExerciseSetCreateInput) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exerciseSetCreate)
  };
  const response = await fetch(`${ROOT_URL}/api/exercise-set/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function deleteExerciseSet(exerciseSetId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  };
  return await fetch(`${ROOT_URL}/api/exercise-set/1/${exerciseSetId}`, requestOptions);
}

async function updateExerciseSetRequest(exerciseSet: ExerciseSet) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exerciseSet)
  };

  return await fetch(`${ROOT_URL}/api/exercise-set/1`, requestOptions);
}

export { addExerciseSet, deleteExerciseSet, updateExerciseSetRequest }
