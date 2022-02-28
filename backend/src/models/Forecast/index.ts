import mongoose from "mongoose";

interface ForecastResultInterface {
  receiverTotalNumber: number;
  notReceivingZakatInFuture: number;
  totalCollectedMoney: number;
  datetime: string;
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
    totalCollectedMoney: {
      type: Number,
      required: true,
    },
    datetime: {
      type: String,
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
