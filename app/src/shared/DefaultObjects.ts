import {ExerciseSetCreateInput} from "../models/workout";

const defaultExerciseSetCreate = (exerciseId: number, workoutExerciseId: number, lastSetIndex: number): ExerciseSetCreateInput => {
  return {
    weight: 0,
    reps: 0,
    notes: "",
    exerciseType: "NORMAL",
    exerciseId: exerciseId,
    workoutExerciseId: workoutExerciseId,
    indexOfSet: lastSetIndex,
  }
};

export default defaultExerciseSetCreate;
