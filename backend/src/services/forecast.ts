import { ForecastResultModel } from "../models/Forecast";

async function getForecastData() {
  return ForecastResultModel.findOne().exec();
}

export { getForecastData };
