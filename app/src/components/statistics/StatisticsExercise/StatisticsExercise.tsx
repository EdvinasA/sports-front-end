import React, {useEffect} from 'react';
import './StatisticsExercise.scss';
import {Exercise, ExerciseCategory} from "../../../models/workout";
import {getExercisesByCategory} from "../../../services/ExerciseService";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getExerciseStatistics} from "../../../services/StatisticsService";
import {ExerciseStatistics} from "../../../models/Statistics";

interface StatisticsExerciseProps {
  exerciseCategory: ExerciseCategory;
  close: () => void;
}

const CustomTooltip = ({active, payload}: any) => {
  if (active && payload && payload.length) {
    return (
        <div>
          <div>
            {payload[0].name &&
                <p>{payload[0].name}: {payload[0].value}</p>
            }
          </div>
        </div>
    );
  }

  return null;
};

const StatisticsExercise = (props: StatisticsExerciseProps) => {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = React.useState<string>("");
  const [exercise, setExercise] = React.useState<ExerciseStatistics[]>([]);
  const [exerciseLabel, setExerciseLabel] = React.useState<string>("");
  const [steps, setSteps] = React.useState<number>(0);

  useEffect(() => {
    if (exercises.length === 0) {
      getExercisesByCategory(props.exerciseCategory.id)
      .then((response) => {
        setExercises(response);
      })
    }
  });

  const handleCloseDialog = () => {
    setExercises([]);
    setSteps(0);
    props.close();
  }

  const handleShowExerciseStats = (exercise: Exercise) => {
    setSelectedExercise(exercise.name);
    getExerciseStatistics(exercise.id)
    .then((response) => {
      setExercise(response);
      setSteps(1);
      setExerciseLabel(exercise.name);
    })
  }

  const mapData = () => {
    return exercise.map((data) => {
      return {value: data.weight, name: exerciseLabel};
    })
  };

  return (
      <div className='statistics-exercises'>
        {steps === 0 &&
            <div className='statistics-exercises-list'>
              <div className='statistics-exercises-list-header'>
                <div>
                  <IconButton onClick={handleCloseDialog}><ArrowBack/></IconButton>
                </div>
                <div className='statistics-exercises-list-header-title'><span>{props.exerciseCategory.name}</span> Category</div>
              </div>
              <div className='statistics-exercises-list-body'>
                {exercises &&
                    exercises.map((exercise: Exercise) => (
                        <div className='statistics-exercise-category-list' onClick={() => handleShowExerciseStats(exercise)}>
                          <div>{exercise.name}</div>
                          <div><ArrowForward/></div>
                        </div>
                    ))}
              </div>
            </div>
        }
        {steps === 1 &&
            <div className='statistics-exercises-list'>
              <div className='statistics-exercises-list-header'>
                <div>
                  <IconButton onClick={handleCloseDialog}><ArrowBack/></IconButton>
                </div>
                <div className='statistics-exercises-list-header-title'><span>{selectedExercise}</span></div>
              </div>
              <div className='statistics-charts-wrapper'>
                <ResponsiveContainer>
                  <LineChart data={mapData()} margin={{
                    top: 0,
                    right: 0,
                    left: 15,
                    bottom: 15
                  }}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis/>
                    <YAxis>
                      {/*<Label*/}
                      {/*    value={props.YAxis}*/}
                      {/*    angle={-90}*/}
                      {/*    position="left"*/}
                      {/*/>*/}
                    </YAxis>
                    <Tooltip content={<CustomTooltip payload={mapData()}/>}/>
                    <Line type="monotone" dataKey="value" stroke="#0095FF"/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
        }
      </div>
  );
}

export default StatisticsExercise;
