import {ExerciseSet, ExerciseSetCreateInput} from "../models/workout";

async function addExerciseSet(exerciseSetCreate: ExerciseSetCreateInput) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exerciseSetCreate)
  };
  const response = await fetch("https://localhost:7173/api/exercise-set/1", requestOptions);

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
  return await fetch(`https://localhost:7173/api/exercise-set/1/${exerciseSetId}`, requestOptions);
}

async function updateExerciseSetRequest(exerciseSet: ExerciseSet) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exerciseSet)
  };

  return await fetch("https://localhost:7173/api/exercise-set/1", requestOptions);
}

export { addExerciseSet, deleteExerciseSet, updateExerciseSetRequest }
