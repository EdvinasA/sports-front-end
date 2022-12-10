import React from 'react';
import './WorkoutExerciseReorder.scss';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {WorkoutExercise} from "../../models/workout";

interface WorkoutExerciseReorderProps {
  workoutExercises: WorkoutExercise[];
  updateWorkoutExercises: (result: any) => void;
  close: () => void;
}

const WorkoutExerciseReorder = (props: WorkoutExerciseReorderProps) => {

  const onDragEnd = (result: any) => {
    props.updateWorkoutExercises(result)
  };

  return (
      <div className="App">
        <div>
          <button onClick={props.close}>Back</button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable`}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {props.workoutExercises.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                        {(provided, snapshot) => (
                            <div className="draggable-item"
                                 ref={provided.innerRef}
                                 snapshot={snapshot}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                >{`${index + 1}.  ${item.exercise.name}`}</div>
                        )}
                      </Draggable>
                  ))}
                </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
  );
}

export default WorkoutExerciseReorder;
