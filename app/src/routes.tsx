import WorkoutRoutineListComponent from "./components/WorkoutRoutineListComponent/WorkoutRoutineListComponent";
import ExerciseCategoryListComponent from "./components/ExerciseCategoryListComponent/ExerciseCategoryListComponent";
import WorkoutDetailsPageComponent from "./components/WorkoutDetailsComponent/WorkoutDetailsPageComponent";
import ExerciseListComponent from "./components/ExerciseListComponent/ExerciseListComponent";
import WorkoutListComponent from "./components/WorkoutListComponent/WorkoutListComponent";
import {
  createBrowserRouter,
} from "react-router-dom";
import BottomMenuComponent from "./components/BottomMenuComponent/BottomMenuComponent";
import StatisticsComponent from "./components/statistics/StatisticsComponent/StatisticsComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import React from "react";
import WorkoutRoutineDetailsComponent from "./components/WorkoutRoutineDetailsComponent/WorkoutRoutineDetailsComponent";

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
        path: "/login",
        element: <LoginComponent/>,
      },
      {
        path: "/register",
        element: <RegisterComponent/>,
      },
      {
        path: "/routines/:routineId",
        element: <WorkoutRoutineDetailsComponent/>,
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
