import {Exercise, ExerciseCreateInput} from "../models/workout";

const ROOT_URL = process.env.REACT_APP_API_URL;

async function createExercise(exercise: ExerciseCreateInput): Promise<Exercise> {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exercise),
  };
  const response = await fetch(`${ROOT_URL}/api/exercise/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function updateExercise(exercise: Exercise): Promise<Response> {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exercise),
  };
  return await fetch(`${ROOT_URL}/api/exercise/1`, requestOptions);
}

async function deleteExercise(exerciseId: number): Promise<Response> {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  };
  return await fetch(`${ROOT_URL}/api/exercise/1/${exerciseId}`, requestOptions);
}

async function addExercise(exerciseToAdd: Exercise, rowNumber: number, workoutId: number) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ exercise: exerciseToAdd, rowNumber: rowNumber, workoutId: workoutId } ),
  };
  const response = await fetch(`${ROOT_URL}/api/workout/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function getExercisesByCategory(input: number) {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const response = await fetch(`${ROOT_URL}/api/exercise/1/category/${input}`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function getAllExercises() {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const response = await fetch(`${ROOT_URL}/api/exercise/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export { addExercise, getExercisesByCategory, getAllExercises, createExercise, deleteExercise, updateExercise }
