import {createRequestWithResponse} from "./ApiService";
import {OverallStatistics} from "../models/Statistics";

async function getOverallStatistics(): Promise<OverallStatistics> {
  const requestOptions = {
    method: 'GET',
  };
  return await createRequestWithResponse(`api/stats`, requestOptions);
}

export { getOverallStatistics };
