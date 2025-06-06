import mongoose from "mongoose";

const languageSchema =  mongoose.Schema(  {
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  // userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  language: { type: String,}, // Language name
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"] , default:''}, // Proficiency level
  customLanguage: { type: String }, // If a user wants to add a custom language
},
{ timestamps: true });
  

  const languagesModel = mongoose.models.language || mongoose.model("language", languageSchema);
export default languagesModel;