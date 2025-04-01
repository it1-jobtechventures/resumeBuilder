import mongoose from "mongoose";

const skillsSchema =  mongoose.Schema(  {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resumeMeta", required: true }, // Link to Resume
  name: { type: String, required: true },
  level: { type: Number, min: 0, max: 100, required: true }, // Skill proficiency percentage
},
{ timestamps: true });
  
  const skillsModel = mongoose.models.skill || mongoose.model("skill", skillsSchema);
export default skillsModel;