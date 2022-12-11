import {createRequestWithResponse} from "./ApiService";

async function createRoutine(): Promise<number> {
  const requestOptions = {
    method: 'POST'
  };
  return await createRequestWithResponse(`api/workout-routine`, requestOptions);
}

export { createRoutine };
