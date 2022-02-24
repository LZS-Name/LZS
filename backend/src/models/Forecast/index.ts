import mongoose from "mongoose";

interface ForecastResultInterface {
  receiverTotalNumber: number;
  notReceivingZakatInFuture: number;
}

const forecastResultSchema = new mongoose.Schema<ForecastResultInterface>(
  {
    receiverTotalNumber: {
      type: Number,
      required: true,
    },
    notReceivingZakatInFuture: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ForecastResultModel = mongoose.model(
  "ForecastResult",
  forecastResultSchema
);

export { ForecastResultModel, ForecastResultInterface };
