import React, {useEffect} from 'react';
import './WorkoutDetailsExerciseHistory.scss';
import {ExerciseSet} from "../../../models/workout";
import {getHistoryExerciseSets} from "../../../services/ExerciseSetService";
import {ArrowBack} from "@mui/icons-material";
import 'typeface-roboto';

interface WorkoutDetailsExerciseHistoryProps {
  workoutExerciseId: number;
  exerciseId: number;
  exerciseName: string;
  close: () => void;
}

const WorkoutDetailsExerciseHistory = (props: WorkoutDetailsExerciseHistoryProps) => {
  const [history, setHistory] = React.useState<ExerciseSet[]>([]);

  useEffect(() => {
    if (history.length === 0) {
      getHistoryExerciseSets(props.workoutExerciseId, props.exerciseId)
      .then((response) => {
        setHistory(response);
      })
    }
  })
  return (
      <div>
        <div className='exercise-history-header'>
          <div className='exercise-history-back-button' onClick={props.close}><ArrowBack/></div>
          <div>History of {props.exerciseName}</div>
        </div>
        {history &&
            history.map((set) => (
                <div className='exercise-history-wrapper' key={set.id}>
                  <div className='exercise-history-list'>
                    <div className='exercise-history-column-wrapper'>
                      <div className='exercise-history-label'>Weight</div>
                      <div className='exercise-history-value'>
                        {set.weight}
                      </div>
                    </div>
                    <div className='exercise-history-column-wrapper'>
                      <div className='exercise-history-label'>Reps</div>
                      <div className='exercise-history-value'>
                        {set.reps}
                      </div>
                    </div>
                    <div className='exercise-history-column-wrapper'>
                      <div className='exercise-history-label'>Notes</div>
                      <div className='exercise-history-value'>{set.notes || 'No notes'}</div>
                    </div>
                  </div>
                </div>
            ))
        }
      </div>
  );
}

export default WorkoutDetailsExerciseHistory;
