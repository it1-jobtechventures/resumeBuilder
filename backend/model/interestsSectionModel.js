import mongoose from "mongoose";

const interestsSchema =  mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  // userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  name: { type: String, required: true },
},{ timestamps: true });

const interestsSectionModel = mongoose.models.interestsSection || mongoose.model("interestsSection", interestsSchema);
export default interestsSectionModel;