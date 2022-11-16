const defaultExerciseSetCreate = (exerciseId: number, workoutExerciseId: number) => {
  return {
    id: 0,
    weight: 0,
    reps: 0,
    notes: "",
    exerciseType: "NORMAL",
    exerciseId: exerciseId,
    workoutExerciseId: workoutExerciseId,
    userId: 1
  }
};

export default defaultExerciseSetCreate;
