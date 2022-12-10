import React from 'react';
import './WorkoutExerciseReorder.scss';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {WorkoutExercise} from "../../models/workout";
import {ArrowBack, DragHandle} from "@mui/icons-material";
import {Divider, IconButton} from "@mui/material";

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
      <div className="workout-reorder-wrapper">
        <div className="workout-reorder-header">
          <IconButton onClick={props.close}><ArrowBack/></IconButton>
          <h2>Reorder</h2>
        </div>
        <div className="draggable-items-list">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`droppable`}>
              {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {props.workoutExercises.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                          {(provided, snapshot) => (
                              <div>
                                <div className="draggable-item"
                                     ref={provided.innerRef}
                                     snapshot={snapshot}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                >
                                  <div>{`${item.exercise.name}`}</div>
                                  <div><DragHandle/></div>
                                </div>
                              </div>
                          )}
                        </Draggable>
                    ))}
                  </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
  );
}

export default WorkoutExerciseReorder;
