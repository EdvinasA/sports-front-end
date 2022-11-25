export type WorkoutDetails = {
    id: number;
    name: string;
    bodyWeight: number;
    date: Date;
    startTime: Date;
    endTime: Date;
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
    note: string;
    exerciseType: string;
    isSingleBodyPartExercise: boolean;
}

export type ExerciseCreateInput = {
    id: number;
    name: string;
    note: string;
    exerciseCategoryId: number;
    exerciseType: string;
    IsSingleBodyPartExercise: boolean;
}

export type ExerciseSet = {
    id: number;
    weight: number;
    reps: number;
    notes: string;
    exerciseType: string;
}

export type ExerciseSetCreateInput = {
    weight: number;
    reps: number;
    notes: string;
    exerciseType: string;
    exerciseId: number;
    workoutExerciseId: number;
}

export type ExerciseBodyPart = {
    value: string;
    displayValue: string;
}

export type WorkoutDetailsUpdateInput = {
    id: number;
    name: string;
    bodyWeight: number;
    date: Date;
    startTime: Date;
    endTime: Date;
    notes: string;
}

export type UpdateObject = {
    name: any;
    value: any;
}
