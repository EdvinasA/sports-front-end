import React from 'react';
import './WorkoutRoutineListComponent.scss';
import {WorkoutListDrawerComponent} from "../WorkoutListDrawerComponent/WorkoutListDrawerComponent";
import WorkoutRoutineListDrawer from "./WorkoutRoutineListDrawer/WorkoutRoutineListDrawer";
import "typeface-roboto";
import CreateComponent from "../shared/CreateComponent/CreateComponent";
import {Link} from "react-router-dom";
import {WorkoutRoutine} from "../../models/Routine";
import {deleteRoutine, getRoutines} from "../../services/RoutineService";
import produce from "immer";

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
    this.handleDeleteRoutine = this.handleDeleteRoutine.bind(this);
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

  handleDeleteRoutine(routine: WorkoutRoutine) {
    deleteRoutine(routine.id)
      .then(() => {
        this.setState({routines: this.state.routines.filter(o => o.id !== routine.id)});
      })
  }

  render() {
    return (
        <div>
          <div className='routine-header'>
            <div className='routine-header-wrapper'>
              <div className='routine-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
              <div className='routine-header-title'>Routines</div>
            </div>
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
                            routine={routine}
                            deleteRoutine={this.handleDeleteRoutine}
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
