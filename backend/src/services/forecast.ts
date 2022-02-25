import {
  ForecastResultModel,
  ForecastResultInterface,
} from "../models/Forecast";

async function getForecastData() {
  return ForecastResultModel.find().exec();
}

async function createForecastResult(forecastResult: ForecastResultInterface) {
  const result = new ForecastResultModel({ ...forecastResult });
  try {
    return await result.save();
  } catch (err) {
    console.log("Error [CREATE FORECAST RESULT]: ", err);
    throw err;
  }
}

export { getForecastData, createForecastResult };
