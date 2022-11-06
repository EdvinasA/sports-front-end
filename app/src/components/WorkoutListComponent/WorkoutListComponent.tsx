import React from 'react';
import { WorkoutDetails } from '../../models/workout';
import { getDayOfTheWeekForDate, getDayOfTheMonth, getMonth } from '../../services/formatter-service';
import { Dialog, Slide, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimerIcon from '@mui/icons-material/Timer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TransitionProps } from '@mui/material/transitions';
import WorkoutDetailsPageComponent from '../WorkoutDetailsComponent/WorkoutDetailsPageComponent';
import './WorkoutListComponent.scss';

export interface WorkoutState {
    workout: WorkoutDetails[],
    activeWorkout: WorkoutDetails,
    loading: boolean,
    error: boolean,
    isActiveWorkout: boolean,
    isEditingDisplayed: boolean,
}

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class WorkoutListComponent extends React.Component<{}, WorkoutState>  {
    constructor(props: any) {
        super(props)
        this.state = {
            workout: [],
            activeWorkout: {
                id: 0,
                name: '',
                bodyWeight: 0,
                date: '',
                startTime: '',
                endTime: '',
                notes: '',
                exercises: [],
            },
            loading: true,
            error: false,
            isActiveWorkout: false,
            isEditingDisplayed: false,
        }
    }

    componentDidMount() {
        fetch("https://localhost:7173/api/workout/1")
            .then((response) => response.json())
            .then((response) =>
                this.setState({
                    workout: response,
                    isActiveWorkout: this.checkIfThereIsActiveWorkout(response),
                })
            )
            .catch((error) =>
                this.setState({
                    loading: false,
                    error: true,
                })
            );
    }

    checkIfThereIsActiveWorkout(response: WorkoutDetails[]) {
        response.forEach((workout) => {
            if (workout.endTime === null) {
                if (workout.id !== 0) {
                    this.setState({
                        activeWorkout: workout
                    });
                }
                return false;
            }
            return true;
        })
        return true;
    }

    createWorkout() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: new Date() })
        };
        fetch("https://localhost:7173/api/workout/1", requestOptions);
    }

    openWorkout() {
        this.setState({
            isEditingDisplayed: !this.state.isEditingDisplayed
        });
    }

    render() {
        return (
            <div>
                {this.state.workout &&
                    this.state.workout.map((workout: WorkoutDetails) => (
                        <div className="workout-list-wrapper" key={workout.id}>
                            <div className="workout-item">
                                <div className="workout-item-column1">
                                    <div>{getDayOfTheWeekForDate(workout.date)}</div>
                                    <div>{getDayOfTheMonth(workout.date)}</div>
                                    <div>{getMonth(workout.date)}</div>
                                </div>
                                <div className="workout-item-column2">{workout.name || 'Workout'}</div>
                            </div>
                        </div>
                    ))}
                <div>
                    {!this.state.isActiveWorkout &&
                        <button onClick={this.createWorkout}>Create workout</button>
                    }
                    {this.state.isActiveWorkout &&
                        <button onClick={() => this.openWorkout()}>Resume workout</button>
                    }
                    {this.state.isEditingDisplayed &&
                        <Dialog
                            fullScreen
                            open={this.state.isEditingDisplayed}
                            onClose={this.openWorkout}
                            TransitionComponent={Transition}>
                            <div className='dialog-workout-header'>
                                <div className='dialog-workout-header-grid'>
                                    <div className='dialog-workout-back-action'>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={() => this.openWorkout()}
                                            aria-label="close"
                                        >
                                            <ArrowBackIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        {getMonth(this.state.activeWorkout.date)}
                                        5
                                    </div>
                                    <div className='dialog-workout-info'>
                                        <div>
                                            <IconButton>
                                                <TimerIcon />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <IconButton>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                                <div className='workout-details-display'>
                                    <WorkoutDetailsPageComponent workout={this.state.activeWorkout}></WorkoutDetailsPageComponent>
                                </div>
                            </div>
                        </Dialog>
                    }
                </div>
            </div>
        )
    }
}

export default WorkoutListComponent;
