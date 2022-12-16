import {createRequestWithResponse} from "./ApiService";
import {ExerciseStatistics, OverallStatistics} from "../models/Statistics";

async function getOverallStatistics(): Promise<OverallStatistics> {
  const requestOptions = {
    method: 'GET',
  };
  return await createRequestWithResponse(`api/stats`, requestOptions);
}

async function getExerciseStatistics(exerciseId: number): Promise<ExerciseStatistics[]> {
  const requestOptions = {
    method: 'GET',
  };
  return await createRequestWithResponse(`api/stats/${exerciseId}`, requestOptions);
}

export { getOverallStatistics, getExerciseStatistics };
