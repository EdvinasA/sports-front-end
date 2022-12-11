import {AddExerciseToRoutineInput, WorkoutRoutineExercise} from "../models/Routine";
import {createRequestWithResponse} from "./ApiService";

async function addExerciseToRoutine(input: AddExerciseToRoutineInput): Promise<WorkoutRoutineExercise> {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(input)
  };
  return await createRequestWithResponse(`api/workout-routine-exercise`, requestOptions);
}

export { addExerciseToRoutine };
