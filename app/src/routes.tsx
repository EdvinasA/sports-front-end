import WorkoutRoutineListComponent from "./components/WorkoutRoutineListComponent/WorkoutRoutineListComponent";
import ExerciseCategoryListComponent from "./components/ExerciseCategoryListComponent/ExerciseCategoryListComponent";
import WorkoutDetailsPageComponent from "./components/WorkoutDetailsComponent/WorkoutDetailsPageComponent";
import ExerciseListComponent from "./components/ExerciseListComponent/ExerciseListComponent";
import WorkoutListComponent from "./components/WorkoutListComponent/WorkoutListComponent";
import {
  createBrowserRouter,
} from "react-router-dom";
import BottomMenuComponent from "./components/BottomMenuComponent/BottomMenuComponent";
import StatisticsComponent from "./components/StatisticsComponent/StatisticsComponent";

export type Route = {
  route: string;
  component: any;
  displayBottomMenu: boolean;
}

export const routes = createBrowserRouter(
    [
      {
        path: "/workout/:workoutId",
        element: <WorkoutDetailsPageComponent/>,
      },
      {
        path: "/categories",
        element: <ExerciseCategoryListComponent/>,
      },
      {
        path: "/exercises",
        element: <ExerciseListComponent/>,
      },
      {
        path: "/",
        element: <BottomMenuComponent/>,
        children: [
          {
            path: "",
            element: <WorkoutListComponent/>,
          },
          {
            path: "/routines",
            element: <WorkoutRoutineListComponent/>,
          },
          {
            path: "/statistics",
            element: <StatisticsComponent/>,
          },
        ]
      }
    ]
)
