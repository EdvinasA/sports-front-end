import React, {useEffect} from 'react';
import './StatisticsComponent.scss';
import {ArrowForward} from '@mui/icons-material';
import {WorkoutListDrawerComponent} from "../../WorkoutListDrawerComponent/WorkoutListDrawerComponent";
import "typeface-roboto";
import {ExerciseCategory} from "../../../models/workout";
import {getExerciseCategories} from "../../../services/ExerciseCategoryService";
import {OverallStatistics} from "../../../models/Statistics";
import {getOverallStatistics} from "../../../services/StatisticsService";
import StatisticsChartDialog from "../StatisticsChartDialog/StatisticsChartDialog";
import {TransitionProps} from "@mui/material/transitions";
import {Dialog, Divider, Slide} from "@mui/material";
import StatisticsExercise from "../StatisticsExercise/StatisticsExercise";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StatisticsComponent = () => {
  const [categories, setCategories] = React.useState<ExerciseCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number>(0);
  const [chartDialog, setChartDialog] = React.useState<boolean>(false);
  const [exerciseDialog, setExerciseDialog] = React.useState<boolean>(false);
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [chartLabel, setChartLabel] = React.useState<string>("");
  const [chartYAxis, setChartYAxis] = React.useState<string>("");
  const [stats, setStats] = React.useState<OverallStatistics>({
    numberOfWorkouts: 0,
    workoutDuration: [],
    volume: [],
    totalSets: [],
    totalReps: [],
    bodyWeight: []
  });

  useEffect(() => {
    if (categories.length === 0) {
      getExerciseCategories()
      .then((response) => {
        setCategories(response);
      })
    }
    if (stats.numberOfWorkouts === 0) {
      getOverallStatistics()
      .then((response) => {
        setStats(response);
      })
    }
  })

  const handleCloseExerciseDialog = () => {
    setExerciseDialog(false);
  }

  const handleCloseChartDialog = () => {
    setChartDialog(false);
  }

  const handleOpenChartDialog = (data: any[], label: string, YAxis: string) => {
    setChartLabel(label);
    setChartData(data);
    setChartYAxis(YAxis);
    setChartDialog(true);
  }


  return (
      <div>
        <div className='statistics-header'>
          <div className='statistics-header-wrapper'>
            <div className='statistics-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
            <div className='statistics-header-title'>Statistics</div>
          </div>
        </div>
        <div className='statistics-display'>
          <div className='statistics-display-overall'>
            <div className='statistics-display-title'>Overall Statistics</div>
            <div className='statistics-display-values'>
              <div>Number of Workouts</div>
              <div className='statistics-display-values-value'>{stats.numberOfWorkouts}</div>
            </div>
            <div className='statistics-display-values' onClick={() => handleOpenChartDialog(stats.workoutDuration, "Workout Duration", "Minutes")}>
              <div className='statistics-display-values-title'>Workout Duration</div>
              <div><ArrowForward/></div>
            </div>
            <div className='statistics-display-values' onClick={() => handleOpenChartDialog(stats.workoutDuration, "Volume", "Kg")}>
              <div className='statistics-display-values-title'>Volume</div>
              <div><ArrowForward/></div>
            </div>
            <div className='statistics-display-values' onClick={() => handleOpenChartDialog(stats.totalSets, "Total Sets", "Amount")}>
              <div className='statistics-display-values-title'>Total Sets</div>
              <div><ArrowForward/></div>
            </div>
            <div className='statistics-display-values' onClick={() => handleOpenChartDialog(stats.totalReps, "Total Reps", "Amount")}>
              <div className='statistics-display-values-title'>Total Reps</div>
              <div><ArrowForward/></div>
            </div>
            <div className='statistics-display-values' onClick={() => handleOpenChartDialog(stats.bodyWeight, "Body Weight", "Kg")}>
              <div className='statistics-display-values-title'>Body Weight</div>
              <div><ArrowForward/></div>
            </div>
          </div>
          <Divider></Divider>
          <div className='statistics-display-category'>
            <div className='statistics-display-title'>Category Statistics</div>
            {categories && categories.map((category: ExerciseCategory) => (
                <div className='statistics-display-values'>
                  <div className='statistics-display-values-title'>{category.name}</div>
                  {/*<div onCl><ArrowForward/></div>*/}
                </div>
            ))
            }
          </div>
        </div>
        <Dialog
            fullScreen
            open={chartDialog}
            onClose={handleCloseChartDialog}
            TransitionComponent={Transition}
        >
          <StatisticsChartDialog
              label={chartLabel}
              data={chartData}
              YAxis={chartYAxis}
              close={handleCloseChartDialog}></StatisticsChartDialog>
        </Dialog>
        <Dialog
            fullScreen
            open={exerciseDialog}
            onClose={handleCloseExerciseDialog}
            TransitionComponent={Transition}>
              {/*<StatisticsExercise exerciseCategory={exer} close={}*/}
        </Dialog>
      </div>
  );
}

export default StatisticsComponent;
