import {createRequestWithResponse} from "./ApiService";
import {UserLoginRequest, UserRegisterRequest} from "../models/User";

async function login(loginRequest: UserLoginRequest) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(loginRequest)
  }

  return await createRequestWithResponse("api/user/login", requestOptions);
}

async function register(registerRequest: UserRegisterRequest) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(registerRequest)
  }

  return await createRequestWithResponse("api/user/register", requestOptions);
}

export { login, register };
