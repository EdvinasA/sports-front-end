import React from 'react';
import './WorkoutRoutineExerciseReorder.scss';
import {WorkoutRoutineExercise} from "../../../models/Routine";
import WorkoutExerciseReorder from "../../WorkoutExerciseReorder/WorkoutExerciseReorder";

interface WorkoutRoutineExerciseReorderProps {
  reorderDialog: boolean;
  routineExercises: WorkoutRoutineExercise[];
  updateRoutineExercises: (result: any) => void;
  close: () => void;
}

const WorkoutRoutineExerciseReorder = (props: WorkoutRoutineExerciseReorderProps) => {
  return (
        <WorkoutExerciseReorder items={props.routineExercises} updateItems={props.updateRoutineExercises} close={props.close}/>
  );
}

export default WorkoutRoutineExerciseReorder;
