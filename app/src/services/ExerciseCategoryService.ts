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

export { getExerciseCategories }
