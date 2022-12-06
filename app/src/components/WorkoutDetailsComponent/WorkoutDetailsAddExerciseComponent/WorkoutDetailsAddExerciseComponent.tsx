import React from 'react';
import './WorkoutDetailsAddExerciseComponent.scss';
import {Add, ArrowBack, Search, Close} from "@mui/icons-material";
import {Exercise, ExerciseCategory, UpdateObject} from "../../../models/workout";
import {Button, Dialog, Divider, Slide, TextField} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import {getAllExercises, getExercisesByCategory} from "../../../services/ExerciseService";
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
  const [input, setInput] = React.useState<string>("");
  const [allExercises, setAllExercises] = React.useState<Exercise[]>([]);
  const [filteredAllExercises, setFilteredAllExercises] = React.useState<Exercise[]>([]);
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

  const handleGetAllExercises = () => {
    getAllExercises()
    .then((response) => {
      setPreviousStep(props.activeStep);
      props.setActiveStep(3);
      setAllExercises(response);
      setFilteredAllExercises(response);
    })
  }

  const handleFilteringExercises = (event: { target: { value: any } }) => {
    setInput(event.target.value);
    setDefaultExercise({...defaultExercise, name: event.target.value})
    setFilteredAllExercises(allExercises.filter(o => o.name.includes(event.target.value)));
  }

  return (
      <Dialog
          fullScreen
          open={props.openDialog}
          onClose={props.handleClose}
          TransitionComponent={Transition}
      >
        <div className='exercise-add-wrapper'>
          <div>
            {props.activeStep === 0 &&
                <div>
                  <div className='exercise-add-header'>
                    <div className='exercise-back-and-title'>
                      <div>
                        <Close onClick={props.handleClose}/>
                      </div>
                      <div>
                        <div className='add-exercise-title'>Select Exercise</div>
                      </div>
                    </div>
                    <div className='exercise-search-and-add'>
                      <div><Search onClick={handleGetAllExercises}/></div>
                      <div><Add onClick={handleChangeStepToCreate}/></div>
                    </div>
                  </div>
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
                  <div className='exercise-add-header'>
                    <div className='exercise-back-and-title'>
                      <div>
                        <ArrowBack onClick={() => props.setActiveStep(0)}/>
                      </div>
                      <div>
                        <div className='add-exercise-title'>{category}</div>
                      </div>
                    </div>
                    <div className='exercise-search-and-add'>
                      <div><Search onClick={handleGetAllExercises}/></div>
                      <div><Add onClick={handleChangeStepToCreate}/></div>
                    </div>
                  </div>
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
                  <div className='exercise-add-header'>
                    <div className='exercise-back-and-title'>
                      <div>
                        <ArrowBack onClick={() => props.setActiveStep(previousStep)}/>
                      </div>
                      <div>
                        <div className='add-exercise-title'>Add Exercise</div>
                      </div>
                    </div>
                    <div className='exercise-search-and-add'>
                      <div onClick={(event: any) => props.handleCreateExercise(event, defaultExercise)}>SAVE</div>
                    </div>
                  </div>
                  <ExerciseFormComponent categories={props.exerciseCategories} exerciseUpdate={handleDefaultExerciseChanges} exercise={defaultExercise}/>
                </div>
            }
            {props.activeStep === 3 &&
                <div>
                  <div className='exercise-add-header3'>
                    <div className='exercise-back-and-title3'>
                      <div>
                        <ArrowBack onClick={() => props.setActiveStep(1)}/>
                      </div>
                      <div className='filter-exercises-input'>
                        <TextField value={input}
                                   size="small"
                                   variant="standard"
                                   placeholder="Search"
                                   onChange={handleFilteringExercises}
                        ></TextField>
                      </div>
                    </div>
                  </div>
                  {filteredAllExercises &&
                      filteredAllExercises.map((exercise: Exercise) => (
                          <div>
                            <div className='exercise-select-wrapper' key={exercise.id}>
                              <div onClick={(event: any) => props.handleAddExercise(event, exercise)}>{exercise.name}</div>
                            </div>
                            <Divider></Divider>
                          </div>
                      ))}
                  <div className='exercise-select-wrapper aligned'>
                    <div onClick={handleChangeStepToCreate}>
                      <div>
                        <Add/>
                      </div>
                      <div>
                        Add {input}
                      </div>
                    </div>
                  </div>
                  <Divider></Divider>
                </div>
            }
          </div>
        </div>
      </Dialog>
  )
};

export default WorkoutDetailsAddExerciseComponent;
