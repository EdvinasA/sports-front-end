import React from 'react';
import './RegisterComponent.scss';
import {useNavigate} from "react-router-dom";
import {UserRegisterRequest} from "../../models/User";
import {register} from "../../services/UserService";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface RegisterComponentProps {
}

const RegisterComponent = () => {
  let navigation = useNavigate();
  const [terms, setTerms] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [registerForm, setRegisterForm] = React.useState<UserRegisterRequest>(
      {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
  )

  const handleDisplayOfPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleRequestChange = (event: { target: { name: string, value: any } }) => {
    setRegisterForm({...registerForm, [event.target.name]: event.target.value})
  }

  const handleSubmitLoginRequest = () => {
    register(registerForm)
    .then((response) => {
      if (response.email !== null) {
        navigation("/login");
      }
    })
  }

  return (
      <div>
        <div className="login-title">
          Register
        </div>
        <div className="login-form">
          <div className="login-input">
            <TextField
                value={registerForm.firstName}
                name="firstName"
                label="First Name"
                variant="outlined"
                onChange={handleRequestChange}
            ></TextField>
          </div>
          <div className="login-input">
            <TextField
                value={registerForm.lastName}
                name="lastName"
                label="Last Name"
                variant="outlined"
                onChange={handleRequestChange}
            ></TextField>
          </div>
          <div className="login-input">
            <TextField
                value={registerForm.email}
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleRequestChange}
            ></TextField>
          </div>
          <div className="login-input">
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                  value={registerForm.password}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  label="Password"
                  onChange={handleRequestChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleDisplayOfPassword}
                          onMouseDown={handleDisplayOfPassword}
                          edge="end"
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  }
              ></OutlinedInput>
            </FormControl>
          </div>
          <div>
            <FormGroup>
              <FormControlLabel control={
                <Checkbox
                    checked={terms}
                    onChange={() => setTerms(!terms)}
                    inputProps={{'aria-label': 'controlled'}}
                />} label="I accept the term & conditions"/>
            </FormGroup>
          </div>
          <div className="login-button">
            <Button onClick={handleSubmitLoginRequest} disabled={registerForm.email === "" && registerForm.password === ""} variant="contained">Register</Button>
          </div>
          <div className="register-question">
            Already have an Account?
          </div>
          <div className="register-button">
            <Button variant="outlined">Login</Button>
          </div>
        </div>
      </div>
  )
};

export default RegisterComponent;
