import React from 'react';
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
  reorderDialog: boolean;
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
      },
      reorderDialog: false
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

  handleOpenReorder() {
    this.setState({reorderDialog: true})
  }

  render() {
    return (
        <div>
          <div className='routine-header'>
            <div className='routine-header-wrapper'>
              <div className='routine-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
              <div className='routine-header-title'>Routines</div>
            </div>
            <div className='routine-drawer-menu'><WorkoutRoutineListDrawer
                routine={this.state.emptyRoutine}
                openReorder={this.handleOpenReorder}
                isDetails={false}
                isMain={true}
                children={undefined}/></div>
          </div>
          <div className='routine-list-wrapper'>
            {this.state.routines &&
                this.state.routines.map((routine: WorkoutRoutine) => (
                    <>
                      <div className='routine' key={routine.id}>
                        <div>
                          <Link to={`/routines/${routine.id}`}>
                            <div className='routine-title'>{routine.name || 'Routine'}</div>
                          </Link>
                        </div>
                        <div><WorkoutRoutineListDrawer
                            openReorder={this.handleOpenReorder}
                            routine={routine}
                            isDetails={false}
                            isMain={false}
                            children={undefined}/></div>
                      </div>
                    </>
                ))}
          </div>
          <div className='create-routine-button'>
            <CreateComponent></CreateComponent>
          </div>
        </div>
    );
  };
}

export default WorkoutRoutineListComponent;
