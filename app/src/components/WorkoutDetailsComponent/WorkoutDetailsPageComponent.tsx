import React from 'react';
import { WorkoutDetails } from '../../models/workout';
import { TextField } from '@mui/material';
import './WorkoutDetailsPageComponent.scss';

export interface WorkoutDetailsProps {
    workout: WorkoutDetails,
}

export interface WorkoutDetailsState {
    workout: WorkoutDetails,
    loading: boolean,
    error: boolean,
}

class WorkoutDetailsPage extends React.Component<WorkoutDetailsProps, WorkoutDetailsState>  {
    constructor(props: any) {
        super(props)
        this.state = {
            workout: this.props.workout,
            loading: true,
            error: false
        }
    }

    componentDidUpdate(prevProps: Readonly<WorkoutDetailsProps>, prevState: Readonly<WorkoutDetailsState>, snapshot?: any): void {
        this.setState({ workout: this.props.workout });
    }

    render() {
        return (
            <div>
                <div>Workout Details</div>
                <div>
                    <TextField defaultValue={this.props.workout.name || ''} label='Name' variant="outlined" />
                    <TextField defaultValue={this.props.workout.bodyWeight || ''} label='BW' variant="outlined" />
                </div>
                <div>
                    <TextField
                        type='date'
                        defaultValue={this.props.workout.name || ''}
                        label='Date'
                        InputLabelProps={{ shrink: true }}
                        variant="outlined" />
                    <TextField
                        type='time'
                        defaultValue={this.props.workout.startTime || ''}
                        label='Start Time'
                        InputLabelProps={{ shrink: true }}
                        variant="outlined" />
                    <TextField
                        type='time'
                        defaultValue={this.props.workout.endTime || ''}
                        label='End Time'
                        InputLabelProps={{ shrink: true }}
                        variant="outlined" />
                </div>
                <div>
                    <TextField defaultValue={this.props.workout.notes || ''} label='Notes' variant="outlined" />
                </div>
                <div>{this.props.workout.id || 'Default name'}</div>
            </div>
        )
    }
}

export default WorkoutDetailsPage;