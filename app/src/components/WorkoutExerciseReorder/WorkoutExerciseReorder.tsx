import React from 'react';
import './WorkoutExerciseReorder.scss';
import {WorkoutExercise} from "../../models/workout";
import {ArrowBack} from "@mui/icons-material";

interface WorkoutExerciseReorderProps {
  workoutExercises: WorkoutExercise[];
  updateWorkoutExercise: (exercises: WorkoutExercise[]) => void;
  close: () => void;
}

const WorkoutExerciseReorder = (props: WorkoutExerciseReorderProps) => {
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  const handleSort = () => {
    //duplicate items
    let items = [...props.workoutExercises];

    //remove and save the dragged item content
    const draggedItemContent = items.splice(dragItem.current, 1)[0];

    //switch the position
    items.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    props.updateWorkoutExercise(items);
  }

  return (
      <div className="list-container">
        <div onClick={props.close}><ArrowBack/> Reorder</div>
        {props.workoutExercises.map((item, index) => (
            <div
                key={index}
                className="list-item"
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => (dragOverItem.current = index)}>
              <i className="fa-solid fa-bars"></i>
              <h3>{item.exercise.name}</h3>
            </div>
        ))}
      </div>
  );
}

export default WorkoutExerciseReorder;
