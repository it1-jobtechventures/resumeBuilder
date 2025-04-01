import mongoose from "mongoose";

const workExperienceSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resumeMeta", required: true }, // Link to Resume
  company: { type: String, required: true },
  location: { type: String },
  industry: { type: String },
  totalCompanyExperience: { type: String },
  roles: [
    {
      title: { type: String, required: true },
      startDate: { type: String },
      endDate: { type: String },
      currentlyWorking: { type: Boolean, default: false },
      description: { type: String },
      ctc: { type: String },
      noticePeriod: { type: String },
      teamSize: { type: String },
      jobType: { type: String },
      jobMode: { type: String },
    },
  ],
  } ,{ timestamps: true });
  
  const workExperienceModel = mongoose.models.workExperience || mongoose.model("workExperience", workExperienceSchema);
export default workExperienceModel;

