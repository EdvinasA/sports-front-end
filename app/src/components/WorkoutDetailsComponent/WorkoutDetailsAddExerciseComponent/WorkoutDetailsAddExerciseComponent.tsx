import React from 'react';
import './WorkoutDetailsAddExerciseComponent.scss';
import {Add, ArrowBack, Search, Close} from "@mui/icons-material";
import {Exercise, ExerciseCategory, UpdateObject} from "../../../models/workout";
import {Button, Dialog, Divider, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {getExercisesByCategory} from "../../../services/ExerciseService";
import ExerciseFormComponent from "../../shared/ExerciseFormComponent/ExerciseFormComponent";

interface WorkoutDetailsAddExerciseComponentProps {
  openDialog: boolean;
  handleClose: () => void
  exerciseCategories: ExerciseCategory[];
  handleAddExercise: (event: any, exercise: Exercise) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  handleCreateExercise: (event: any, exercise: Exercise) => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkoutDetailsAddExerciseComponent = (props: WorkoutDetailsAddExerciseComponentProps) => {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [previousStep, setPreviousStep] = React.useState<number>(1);
  const [category, setCategory] = React.useState<string>("");
  const [defaultExercise, setDefaultExercise] = React.useState<Exercise>({
    id: 0,
    name: "",
    note: "",
    exerciseCategoryId: 1,
    exerciseType: "STRENGTH_WEIGHT_REPS",
    isSingleBodyPartExercise: false,
  });

  const handleDefaultExerciseChanges = (updateObject: UpdateObject) => {
    setDefaultExercise({...defaultExercise, [updateObject.name]: updateObject.value});
  }

  const handleGetExercisesByBodyType = (event: any, input: ExerciseCategory) => {
    event.preventDefault();
    setCategory(input.name)
    getExercisesByCategory(input.id)
    .then((response) => {
          setExercises(response);
          props.setActiveStep(1);
        }
    );
  };

  const handleChangeStepToCreate = () => {
    setPreviousStep(props.activeStep);
    props.setActiveStep(2);
  }

  return (
      <Dialog
          fullScreen
          open={props.openDialog}
          onClose={props.handleClose}
          TransitionComponent={Transition}
      >
        <div className='exercise-add-wrapper'>
          <div className='exercise-add-header'>
            <div className='exercise-back-and-title'>
              <div>
                {props.activeStep === 0 &&
                    <Close onClick={props.handleClose}/>
                }
                {props.activeStep === 1 &&
                    <ArrowBack onClick={() => props.setActiveStep(0)}/>
                }
                {props.activeStep === 2 &&
                    <ArrowBack onClick={() => props.setActiveStep(previousStep)}/>
                }
              </div>
              {props.activeStep === 0 &&
                  <div className='add-exercise-title'>Select Exercise</div>
              }
              {props.activeStep === 1 &&
                  <div className='add-exercise-title'>{category}</div>
              }
              {props.activeStep === 2 &&
                  <div className='add-exercise-title'>Add Exercise</div>
              }
            </div>
            {props.activeStep !== 2 &&
                <div className='exercise-search-and-add'>
                  <div><Search/></div>
                  <div><Add onClick={handleChangeStepToCreate}/></div>
                </div>
            }
            {props.activeStep === 2 &&
                <div className='exercise-search-and-add'>
                  <div onClick={(event: any) => props.handleCreateExercise(event, defaultExercise)}>SAVE</div>
                </div>
            }
          </div>
          <div>
            {props.activeStep === 0 &&
                <div>
                  {props.exerciseCategories &&
                      props.exerciseCategories.map((category: ExerciseCategory) => (
                          <div>
                            <div key={category.id} className='body-part'>
                              <div>
                                <div onClick={(event) => handleGetExercisesByBodyType(event, category)}>{category.name}</div>
                              </div>
                            </div>
                            <Divider></Divider>
                          </div>
                      ))}
                </div>
            }
            {props.activeStep === 1 &&
                <div>
                  {exercises &&
                      exercises.map((exercise: Exercise) => (
                          <div>
                            <div className='exercise-select-wrapper' key={exercise.id}>
                              <div onClick={(event: any) => props.handleAddExercise(event, exercise)}>{exercise.name}</div>
                              <div>Edit</div>
                            </div>
                            <Divider></Divider>
                          </div>
                      ))}
                </div>
            }
            {props.activeStep === 2 &&
                <div>
                  <ExerciseFormComponent categories={props.exerciseCategories} exerciseUpdate={handleDefaultExerciseChanges} exercise={defaultExercise}/>
                </div>
            }
          </div>
        </div>
      </Dialog>
  )
};

export default WorkoutDetailsAddExerciseComponent;
