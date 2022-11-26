import React, {FC} from 'react';
import './ExerciseCategoryDialogComponent.scss';
import {ExerciseCategory} from "../../../models/workout";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

interface ExerciseCategoryDialogComponentProps {
  handleDialogClose: () => void;
  handleUpdateCategoryName: (event) => void;
  dialogOpen: boolean;
  category: ExerciseCategory;
  isAdd: boolean;
  handleApiCall: () => void;
}

const ExerciseCategoryDialogComponent = (props: ExerciseCategoryDialogComponentProps) => {

      return (
          <div className="ExerciseCategoryDialogComponent">
            <Dialog
                open={props.dialogOpen}
                onClose={props.handleDialogClose}>
              <DialogTitle>{props.isAdd ? 'Add' : 'Edit'} Category</DialogTitle>
              <DialogContent>
                <TextField
                    value={props.category.name}
                    label='Name'
                    name='name'
                    variant="standard"
                    onChange={props.handleUpdateCategoryName}
                />
              </DialogContent>
              <DialogActions>
                <div className='dialog-action' onClick={props.handleDialogClose}>Cancel</div>
                <div className='dialog-action' onClick={props.handleApiCall}>Save</div>
              </DialogActions>
            </Dialog>
          </div>
      )
    };

export default ExerciseCategoryDialogComponent;
