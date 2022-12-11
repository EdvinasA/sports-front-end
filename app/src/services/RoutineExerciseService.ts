import {AddExerciseToRoutineInput, WorkoutRoutineExercise} from "../models/Routine";
import {createRequestWithResponse, createRequestWithoutResponse} from "./ApiService";

async function addExerciseToRoutine(input: AddExerciseToRoutineInput): Promise<WorkoutRoutineExercise> {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(input)
  };
  return await createRequestWithResponse(`api/workout-routine-exercise`, requestOptions);
}

async function deleteRoutineExercise(routineExerciseId: number): Promise<Response> {
  const requestOptions = {
    method: 'DELETE'
  };
  return await createRequestWithoutResponse(`api/workout-routine-exercise/${routineExerciseId}`, requestOptions);
}

export { addExerciseToRoutine, deleteRoutineExercise };
