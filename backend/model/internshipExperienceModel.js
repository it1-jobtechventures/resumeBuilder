import mongoose from "mongoose";

const internshipExperienceSchema =  mongoose.Schema(
  {
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
    userId:{type:String , required:true},
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
    company: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String },
    stipend: { type: String },
    noticePeriod: { type: String },
    internshipType: { type: String, enum: [ "Full Time","Part Time","On Assignment","On Call","Freelancing","Specific Hours ","Work from Home / WFH"], required: true },
    internshipMode: { type: String, enum: ["WFH", "Hybrid", "WFO"], required: true },
  },
  { timestamps: true }
);
  

const internshipExperienceModel = mongoose.models.internshipExperience || mongoose.model("internshipExperience", internshipExperienceSchema);
export default internshipExperienceModel;