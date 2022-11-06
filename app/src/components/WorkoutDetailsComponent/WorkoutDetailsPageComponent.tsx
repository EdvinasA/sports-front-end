import React from 'react';
import {WorkoutDetails} from '../../models/workout';
import {TextField} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import './WorkoutDetailsPageComponent.scss';

export interface WorkoutDetailsProps {
  workout: WorkoutDetails,
}

export interface WorkoutDetailsState {
  workout: WorkoutDetails,
  loading: boolean,
  error: boolean,
}

class WorkoutDetailsPage extends React.Component<WorkoutDetailsProps, WorkoutDetailsState> {
  constructor(props: any) {
    super(props)
    this.state = {
      workout: this.props.workout,
      loading: true,
      error: false
    }
  }

  componentDidUpdate(prevProps: Readonly<WorkoutDetailsProps>, prevState: Readonly<WorkoutDetailsState>, snapshot?: any): void {
    this.setState({workout: this.props.workout});
  }

  getTime(time: string) {
    return new Date(time);
  }

  render() {
    return (
        <div>
          <div className='inputs-first-row'>
            <div className='workout-name-input'>
              <TextField defaultValue={this.state.workout.name || ''} label='Name' variant="outlined"/>
            </div>
            <div className='workout-weight-input'>
              <TextField defaultValue={this.state.workout.bodyWeight || ''} label='BW' variant="outlined"/>
            </div>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
                  label="Date mobile"
                  inputFormat="YYYY-MM-DD"
                  value={this.getTime(this.state.workout.date || '')}
                  onChange={() => console.log("hello")}
                  renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                  ampm={false}
                  value={this.getTime(this.state.workout.startTime || '')}
                  label='Start Time'
                  onChange={() => console.log("hello")}
                  renderInput={(params) => <TextField {...params} />}/>
              <TimePicker
                  ampm={false}
                  value={this.getTime(this.state.workout.endTime || '')}
                  label='End Time'
                  onChange={() => console.log("hello")}
                  renderInput={(params) => <TextField {...params} />}/>
            </LocalizationProvider>
          </div>
          <div>
            <TextField defaultValue={this.state.workout.notes || ''} label='Notes' variant="outlined"/>
          </div>
          <div>{this.props.workout.id || 'Default name'}</div>
        </div>
    )
  }
}

export default WorkoutDetailsPage;
