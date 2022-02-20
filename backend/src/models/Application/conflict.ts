import mongoose from "mongoose";

interface ConflictFamilyMember {
  name: string;
  job_position: string;
  office: string;
  relationship: string;
}
interface ConflictApplicationInterface {
  applicant_name: string;
  IC: string;
  family_is_from_MAIS: string;
  family_list_from_MAIS: ConflictFamilyMember[];
  date: string;
}
const defaultConflictApplication = {
  applicant_name: "",
  IC: "",
  family_is_from_MAIS: "",
  family_list_from_MAIS: [],
  date: "",
};
const conflictApplicationSchema =
  new mongoose.Schema<ConflictApplicationInterface>(
    {
      applicant_name: {
        type: String,
        required: true,
      },
      IC: {
        type: String,
        required: true,
      },
      family_is_from_MAIS: {
        type: String,
        required: true,
      },
      family_list_from_MAIS: {
        type: [
          {
            name: String,
            job_position: String,
            office: String,
            relationship: String,
          },
        ],
      },
      date: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

const ConflictApplication = mongoose.model(
  "ConflictApplication",
  conflictApplicationSchema
);

export {
  ConflictApplication,
  ConflictApplicationInterface,
  defaultConflictApplication,
};
