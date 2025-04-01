import mongoose from "mongoose";

const internshipExperienceSchema =  mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resumeMeta", required: true }, // Link to Resume
    company: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String },
    stipend: { type: String },
    noticePeriod: { type: String },
    internshipType: { type: String, enum: ["Permanent", "Contract", "Internship"], required: true },
    internshipMode: { type: String, enum: ["WFH", "Hybrid", "WFO"], required: true },
  },
  { timestamps: true }
);
  

const internshipExperienceModel = mongoose.models.internshipExperience || mongoose.model("internshipExperience", internshipExperienceSchema);
export default internshipExperienceModel;