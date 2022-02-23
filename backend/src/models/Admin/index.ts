import mongoose from "mongoose";

interface AdminInterface {
  name: string;
  password: string;
  level: string;
}

const adminSchema = new mongoose.Schema<AdminInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", adminSchema);

export { AdminModel, AdminInterface };
