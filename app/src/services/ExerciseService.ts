import {Exercise, ExerciseCreateInput} from "../models/workout";
import {createRequestWithoutResponse, createRequestWithResponse} from "./ApiService";

async function createExercise(exercise: ExerciseCreateInput): Promise<Exercise> {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exercise),
  };
  return await createRequestWithResponse(`api/exercise`, requestOptions);
}

async function updateExercise(exercise: Exercise): Promise<Response> {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(exercise),
  };
  return await createRequestWithoutResponse(`api/exercise`, requestOptions);
}

async function deleteExercise(exerciseId: number): Promise<Response> {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  };
  return await createRequestWithoutResponse(`api/exercise/${exerciseId}`, requestOptions);
}

async function addExercise(exerciseToAdd: Exercise, rowNumber: number, workoutId: number) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ exercise: exerciseToAdd, rowNumber: rowNumber, workoutId: workoutId } ),
  };
  return await createRequestWithResponse(`api/workout`, requestOptions);
}

async function getExercisesByCategory(input: number) {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  return await createRequestWithResponse(`api/exercise/category/${input}`, requestOptions);
}

async function getAllExercises() {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  return await createRequestWithResponse(`api/exercise`, requestOptions);
}

export { addExercise, getExercisesByCategory, getAllExercises, createExercise, deleteExercise, updateExercise }
