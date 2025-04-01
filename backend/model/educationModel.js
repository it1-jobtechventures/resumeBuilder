import mongoose from "mongoose";

const educationSchema =  mongoose.Schema(  {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resumeMeta", required: true }, // Link to Resume
  school: { type: String, required: true },
  location: { type: String },
  degree: { type: String, required: true },
  field: { type: String },
  graduationDate: { type: Date },
  cgpa: { type: String },
  educationMode: { type: String, enum: ["Online", "Offline", "Hybrid"], default: "Offline" },
},
{ timestamps: true })
  const educationModel = mongoose.models.education || mongoose.model("education", educationSchema);
export default educationModel;
