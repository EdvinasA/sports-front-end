import React, {useEffect} from 'react';
import './StatisticsExercise.scss';
import {Exercise, ExerciseCategory} from "../../../models/workout";
import {getExercisesByCategory} from "../../../services/ExerciseService";
import {ArrowBack} from "@mui/icons-material";
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
            {payload[0].payload.name &&
                <p>{payload[0].payload.name}: {payload[0].payload.value}</p>
            }
          </div>
        </div>
    );
  }

  return null;
};

const StatisticsExercise = (props: StatisticsExerciseProps) => {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [exercise, setExercise] = React.useState<ExerciseStatistics[]>([]);
  const [steps, setSteps] = React.useState<number>(0);

  useEffect(() => {
    getExercisesByCategory(props.exerciseCategory.id)
    .then((response) => {
      setExercises(response);
    })
  });

  const handleCloseDialog = () => {
    setExercises([]);
    setSteps(0);
    props.close();
  }

  const handleShowExerciseStats = (exercise: Exercise) => {
    setSteps(1);
    getExerciseStatistics(exercise.id)
      .then((response) => {
        setExercise(response);
      })
  }

  return (
      <div className="statistics-exercises">
        <div>
          <IconButton onClick={handleCloseDialog}><ArrowBack/></IconButton>
        </div>
        {steps === 0 &&
            <div>
              {exercises &&
                  exercises.map((exercise: Exercise) => (
                      <div onClick={() => handleShowExerciseStats(exercise)}>{exercise.name}</div>
                  ))}
            </div>
        }
        {steps === 1 &&
            <ResponsiveContainer>
              <LineChart data={exercise} margin={{
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
                <Tooltip content={<CustomTooltip payload={exercise}/>}/>
                <Line type="monotone" dataKey="value" stroke="#0095FF"/>
              </LineChart>
            </ResponsiveContainer>
        }
      </div>
  );
}

export default StatisticsExercise;
