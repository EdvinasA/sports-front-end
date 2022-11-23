import {Exercise, ExerciseBodyPart} from "../models/workout";

async function addExercise(exerciseToAdd: Exercise, rowNumber: number, workoutId: number) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ exercise: exerciseToAdd, rowNumber: rowNumber, workoutId: workoutId } ),
  };
  const response = await fetch(`https://localhost:7173/api/workout/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

async function getExercisesByBodyPart(input: ExerciseBodyPart) {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const response = await fetch(`https://localhost:7173/api/exercise/1/body-part/${input.value}`, requestOptions);

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
  const response = await fetch(`https://localhost:7173/api/exercise/1`, requestOptions);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export { addExercise, getExercisesByBodyPart, getAllExercises }
