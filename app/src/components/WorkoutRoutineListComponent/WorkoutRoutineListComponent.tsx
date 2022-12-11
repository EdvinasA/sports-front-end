import React, {FC} from 'react';
import './WorkoutRoutineListComponent.scss';
import {WorkoutListDrawerComponent} from "../WorkoutListDrawerComponent/WorkoutListDrawerComponent";
import WorkoutRoutineListDrawer from "./WorkoutRoutineListDrawer/WorkoutRoutineListDrawer";
import "typeface-roboto";
import CreateComponent from "../shared/CreateComponent/CreateComponent";
import {Link} from "react-router-dom";
import {WorkoutRoutine} from "../../models/Routine";
import {getRoutines} from "../../services/RoutineService";

interface WorkoutRoutineListComponentProps {
}

interface WorkoutRoutineListComponentState {
  routines: WorkoutRoutine[];
  emptyRoutine: WorkoutRoutine;
}

class WorkoutRoutineListComponent extends React.Component<WorkoutRoutineListComponentProps, WorkoutRoutineListComponentState> {
  constructor(props: any) {
    super(props)
    this.state = {
      routines: [],
      emptyRoutine: {
        id: 0,
        name: "",
        targets: "",
        notes: "",
        workoutRoutineExercises: []
      }
    }

    this.token = localStorage.getItem("token");
  }

  private readonly token: string | null;

  componentDidMount() {
    if (this.token != null) {
      getRoutines()
      .then((response) => {
        this.setState({
          routines: response
        });
      });
    }
  }

  render() {
    return (
        <div>
          <div className='routine-header'>
            <div className='routine-header-wrapper'>
              <div className='routine-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
              <div className='routine-header-title'>Routines</div>
            </div>
            <div className='routine-drawer-menu'><WorkoutRoutineListDrawer routine={this.state.emptyRoutine} isDetails={false} isMain={true} children={undefined}/></div>
          </div>
          <div className='routine-list-wrapper'>
            <div className='routine'>
              {this.state.routines &&
                  this.state.routines.map((routine: WorkoutRoutine) => (
                      <>
                        <div>
                          <Link to={`/routines/${routine.id}`}>
                            <div className='routine-title'>{routine.name || 'Routine'}</div>
                          </Link>
                        </div>
                        <div><WorkoutRoutineListDrawer routine={routine} isDetails={false} isMain={false} children={undefined}/></div>
                      </>
                ))}
            </div>
          </div>
          <div className='create-routine-button'>
            <CreateComponent></CreateComponent>
          </div>
        </div>
    );
  };
}

export default WorkoutRoutineListComponent;
