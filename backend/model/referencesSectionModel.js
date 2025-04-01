import mongoose from "mongoose";

const referenceSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resumeMeta", required: true }, // Link to Resume
  name: { type: String, required: true }, // Reference Name
  company: { type: String, required: true }, // Company Name
  contact: { type: String, required: true }, // Contact Number or Email
},
{ timestamps: true });
  
  const referenceModel = mongoose.models.reference || mongoose.model("reference", referenceSchema);
export default referenceModel;