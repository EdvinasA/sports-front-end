export type WorkoutDetails = {
    id: number;
    name: string;
    bodyWeight: number;
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    exercises: Exercise[]
}

export type Exercise = {
    name: string;
}