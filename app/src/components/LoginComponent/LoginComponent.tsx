import React from 'react';
import './LoginComponent.scss';
import {UserLoginRequest} from "../../models/User";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {login} from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface LoginComponentProps {
}

const LoginComponent = (props: LoginComponentProps) => {
  let navigation = useNavigate();
  const [terms, setTerms] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loginRequest, setLoginRequest] = React.useState<UserLoginRequest>(
      {
        email: "",
        password: ""
      }
  )

  const handleDisplayOfPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleRequestChange = (event: { target: { name: string, value: any } }) => {
    setLoginRequest({...loginRequest, [event.target.name]: event.target.value})
  }

  const handleSubmitLoginRequest = () => {
    login(loginRequest)
    .then((response) => {
      localStorage.setItem("token", response.token);
      navigation("/");
    })
  }

  return (
      <div>
        <div className="login-title">
          Login
        </div>
        <div className="login-form">
          <div className="login-input">
            <TextField
                value={loginRequest.email}
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
                  value={loginRequest.password}
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
          <div className="login-forgot-password">Forgot Password?</div>
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
            <Button onClick={handleSubmitLoginRequest} disabled={loginRequest.email === "" && loginRequest.password === ""} variant="contained">Login</Button>
          </div>
          <div className="register-question">
            Don't have an Account?
          </div>
          <div className="register-button">
            <Button variant="outlined">Register</Button>
          </div>
        </div>
      </div>
  )
};

export default LoginComponent;
