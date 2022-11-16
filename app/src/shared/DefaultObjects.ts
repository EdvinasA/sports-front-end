import {ExerciseSetCreateInput} from "../models/workout";

const defaultExerciseSetCreate = (exerciseId: number, workoutExerciseId: number): ExerciseSetCreateInput => {
  return {
    weight: 0,
    reps: 0,
    notes: "",
    exerciseType: "NORMAL",
    exerciseId: exerciseId,
    workoutExerciseId: workoutExerciseId
  }
};

export default defaultExerciseSetCreate;
