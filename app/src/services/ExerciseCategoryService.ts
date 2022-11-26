import {ExerciseCategory} from "../models/workout";

async function getExerciseCategories() {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const response = await fetch(`https://localhost:7173/api/exercise-category/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function createExerciseCategories(category: ExerciseCategory) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(category),
  };
  const response = await fetch(`https://localhost:7173/api/exercise-category/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function updateExerciseCategories(category: ExerciseCategory) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(category),
  };
  return await fetch(`https://localhost:7173/api/exercise-category/1`, requestOptions);
}

export { getExerciseCategories, createExerciseCategories, updateExerciseCategories }
