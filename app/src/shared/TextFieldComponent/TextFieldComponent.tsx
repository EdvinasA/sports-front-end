import './TextFieldComponent.scss';
import React from "react";
import {TextField} from "@mui/material";

export interface TextFieldState {
  value: string,
  label: string,
}

export interface TextFieldProps {
  value: string,
  label: string,
}

class TextFieldComponent extends React.Component<TextFieldProps, TextFieldState> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: '',
      label: '',
    }
  }

  render() {
    return (
        <div>
          <TextField value={this.props.value} label={this.props.label} InputLabelProps={{shrink: true}}></TextField>
        </div>
    )
  }
}

export default TextFieldComponent;
