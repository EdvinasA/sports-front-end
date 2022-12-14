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
import {Dialog, Slide} from "@mui/material";

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
  const [chartDialog, setChartDialog] = React.useState<boolean>(false);
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [chartLabel, setChartLabel] = React.useState<string>("");
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

  const handleCloseChartDialog = () => {
    setChartDialog(false);
  }

  const handleOpenChartDialog = (data: any[], label: string) => {
    setChartLabel(label);
    setChartData(data);
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
              <div>{stats.numberOfWorkouts}</div>
            </div>
            <div className='statistics-display-values'>
              <div>Workout Duration</div>
              <div onClick={() => handleOpenChartDialog(stats.workoutDuration, "Workout Duration")}><ArrowForward/></div>
            </div>
            <div className='statistics-display-values'>
              <div>Volume</div>
              <div onClick={() => handleOpenChartDialog(stats.volume, "Volume")}><ArrowForward/></div>
            </div>
            <div className='statistics-display-values'>
              <div>Total Sets</div>
              <div onClick={() => handleOpenChartDialog(stats.totalSets, "Total Sets")}><ArrowForward/></div>
            </div>
            <div className='statistics-display-values'>
              <div>Total Reps</div>
              <div onClick={() => handleOpenChartDialog(stats.totalReps, "Total Reps")}><ArrowForward/></div>
            </div>
            <div className='statistics-display-values'>
              <div>Body Weight</div>
              <div onClick={() => handleOpenChartDialog(stats.bodyWeight, "Body Weight")}><ArrowForward/></div>
            </div>
          </div>
          <div className='statistics-display-category'>
            <div className='statistics-display-title'>Category Statistics</div>
            {categories && categories.map((category: ExerciseCategory) => (
                <div className='statistics-display-values'>
                  <div>{category.name}</div>
                  <div><ArrowForward/></div>
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
            close={handleCloseChartDialog}></StatisticsChartDialog>
        </Dialog>
      </div>
  );
}

export default StatisticsComponent;
