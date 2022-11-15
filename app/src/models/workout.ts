export type WorkoutDetails = {
    id: number;
    name: string;
    bodyWeight: number;
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    exercises: WorkoutExercise[]
}

export type WorkoutExercise = {
    id: number;
    exercise: Exercise;
    exerciseSets: ExerciseSet[];
    rowNumber: number;
}

export type Exercise = {
    id: number;
    name: string;
}

export type ExerciseSet = {
    id: number;
    weight: number;
    reps: number;
    notes: string;
    exerciseType: string;
}
