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

interface WorkoutDetailsExerciseHistoryState {
    sets: ExerciseSet[];
    isFirstRequest: boolean;
}

const WorkoutDetailsExerciseHistory = (props: WorkoutDetailsExerciseHistoryProps) => {
  const [history, setHistory] = React.useState<WorkoutDetailsExerciseHistoryState>({
    sets: [],
    isFirstRequest: false
  });

  useEffect(() => {
    if (!history.isFirstRequest) {
      getHistoryExerciseSets(props.workoutExerciseId, props.exerciseId)
      .then((response) => {
        setHistory({
          sets: response,
          isFirstRequest: true
        });
      })
    }
  });

  const handleClose = () => {
    setHistory({...history, isFirstRequest: false});
    props.close();
  }

  return (
      <div>
        <div className='exercise-history-header'>
          <div className='exercise-history-back-button' onClick={handleClose}><ArrowBack/></div>
          <div>History of {props.exerciseName}</div>
        </div>
        {history.sets.length === 0 && <div className=''>No history for this exercise.</div>}
        {history.sets.length !== 0 &&
            history.sets.map((set) => (
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
