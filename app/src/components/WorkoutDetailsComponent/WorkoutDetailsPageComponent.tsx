import React from 'react';
import {WorkoutDetails} from '../../models/workout';
import {Divider, TextField} from '@mui/material';
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
              <div className='workout-time-pickers'>
                <div className='workout-picker padding-for-picker'>
                  <MobileDatePicker
                      label="Date mobile"
                      inputFormat="YYYY-MM-DD"
                      value={this.getTime(this.state.workout.date || '')}
                      onChange={() => console.log("hello")}
                      renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className='workout-picker padding-for-picker'>
                  <TimePicker
                      ampm={false}
                      value={this.getTime(this.state.workout.startTime || '')}
                      label='Start Time'
                      onChange={() => console.log("hello")}
                      renderInput={(params) => <TextField {...params} />}/>
                </div>
                <div className='workout-picker furthest-padding'>
                  <TimePicker
                      ampm={false}
                      value={this.getTime(this.state.workout.endTime || '')}
                      label='End Time'
                      onChange={() => console.log("hello")}
                      renderInput={(params) => <TextField {...params} />}/>
                </div>
              </div>
            </LocalizationProvider>
          </div>
          <div className='workout-notes'>
            <TextField defaultValue={this.state.workout.notes || ''} label='Notes' variant="outlined"/>
          </div>
          <Divider/>
        </div>
    )
  }
}

export default WorkoutDetailsPage;
