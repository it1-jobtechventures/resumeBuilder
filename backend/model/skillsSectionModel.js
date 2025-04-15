import mongoose from "mongoose";

const skillsSchema =  mongoose.Schema(  {
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  name: { type: String},
  level: { type: Number, min: 0}, // Skill proficiency percentage
},
{ timestamps: true });
  
  const skillsModel = mongoose.models.skill || mongoose.model("skill", skillsSchema);
export default skillsModel;