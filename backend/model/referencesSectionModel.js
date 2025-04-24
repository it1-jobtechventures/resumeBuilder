import mongoose from "mongoose";

const referenceSchema =  mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  // userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  name: { type: String}, // Reference Name
  company: { type: String }, // Company Name
  contact: { type: String}, // Contact Number or Email
},
{ timestamps: true });
  
  const referenceModel = mongoose.models.reference || mongoose.model("reference", referenceSchema);
export default referenceModel;