import {ExerciseCategory} from "../models/workout";
import {createRequestWithoutResponse, createRequestWithResponse} from "./ApiService";

async function getExerciseCategories() {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  return await createRequestWithResponse(`api/exercise-category`, requestOptions);
}

async function createExerciseCategories(category: ExerciseCategory) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(category),
  };
  return await createRequestWithResponse(`api/exercise-category`, requestOptions);
}

async function updateExerciseCategories(category: ExerciseCategory) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(category),
  };
  return await createRequestWithoutResponse(`api/exercise-category`, requestOptions);
}

async function deleteExerciseCategory(exerciseCategoryId: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  };
  return await createRequestWithoutResponse(`api/exercise-category/${exerciseCategoryId}`, requestOptions);
}

export { getExerciseCategories, createExerciseCategories, updateExerciseCategories, deleteExerciseCategory }
