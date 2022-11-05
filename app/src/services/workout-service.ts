import { WorkoutDetails } from "../models/workout";

export class WorkoutService {

    getAllWorkouts(): WorkoutDetails[] {
        let workoutDetails: WorkoutDetails[] = [];

        fetch("https://localhost:7173/api/workout/1")
            .then((response) => response.json())
            .then((response) =>
                workoutDetails = response,
            );

        return workoutDetails;
    }
}