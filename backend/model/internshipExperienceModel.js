import mongoose from "mongoose";

const internshipExperienceSchema =  mongoose.Schema(
  {
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
    userId:{type:String , required:true},
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
    company: { type: String},
    location: { type: String},
    title: { type: String,},
    startDate: { type: Date },
    endDate: { type: Date },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String },
    stipend: { type: String },
    noticePeriod: { type: String },
    internshipType: { type: String, enum: [ "Full Time","Part Time","On Assignment","On Call","Freelancing","Specific Hours ","Work from Home / WFH" ,"Others" ,""] },
    internshipMode: { type: String, enum: ["WFH", "Hybrid", "WFO",""]},
  },
  { timestamps: true }
);
  

const internshipExperienceModel = mongoose.models.internshipExperience || mongoose.model("internshipExperience", internshipExperienceSchema);
export default internshipExperienceModel;