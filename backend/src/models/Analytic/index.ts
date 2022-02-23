import mongoose from "mongoose";

interface AnalyticInterface {
  total_distributed_amount: number;
  total_collected_amount: number;
  total_transaction: number;
  total_asnaf: number;
  location: any;
  gender: any;
  month: number;
  year: number;
}

const analyticSchema = new mongoose.Schema<AnalyticInterface>(
  {
    total_distributed_amount: {
      type: Number,
    },
    total_collected_amount: {
      type: Number,
    },
    total_transaction: {
      type: Number,
    },
    total_asnaf: {
      type: Number,
    },
    location: {
      type: Array,
    },
    gender: {
      type: Array,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Analytic = mongoose.model("Analytic", analyticSchema);

export { Analytic, AnalyticInterface };
