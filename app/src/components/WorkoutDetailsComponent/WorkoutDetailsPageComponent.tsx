import React from 'react';
import {WorkoutDetails} from '../../models/workout';
import {Divider, IconButton, TextField} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import './WorkoutDetailsPageComponent.scss';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';

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
                      label="Date"
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
                      value={this.getTime(this.state.workout.startTime || '')}
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
          <div>
            <div>
              <div className='exercise'>
                <div className='exercise-title'>Bench Press</div>
                <div className='exercise-menu'>
                  <IconButton>
                    <MoreVertIcon/>
                  </IconButton>
                </div>
              </div>
              <div className='sets'>
                <div>
                  <div className='set-number'>1</div>
                </div>
                <div className='workout-weight-input'>
                  <TextField defaultValue={this.state.workout.bodyWeight || ''} label='Weight' variant="outlined"/>
                </div>
                <div className='workout-weight-input'>
                  <TextField defaultValue={this.state.workout.bodyWeight || ''} label='Reps' variant="outlined"/>
                </div>
                <div className='workout-weight-input'>
                  <TextField defaultValue={this.state.workout.bodyWeight || ''} label='Notes' variant="outlined"/>
                </div>
                <div className='set-menu-icon'>
                  <IconButton>
                    <MoreVertIcon/>
                  </IconButton>
                </div>
              </div>
              <div className='actions'>
                <div className='action-add-set'>
                  <button>ADD SET</button>
                </div>
                <div>
                  <IconButton>
                    <HistoryIcon/>
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <BarChartIcon/>
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <StarIcon/>
                  </IconButton>
                </div>
              </div>
              <Divider/>
            </div>
            <div className='add-exercise-action'>
              <button>+ ADD EXERCISE</button>
            </div>
          </div>
        </div>
    )
  }
}

export default WorkoutDetailsPage;
