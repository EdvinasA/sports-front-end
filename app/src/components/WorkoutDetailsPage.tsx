import React from 'react';
import { WorkoutDetails } from '../models/workout';
import './WorkoutDetailsPage.scss';

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
                <div>{this.props.workout.id || 'Default name'}</div>
            </div>
        )
    }
}

export default WorkoutDetailsPage;