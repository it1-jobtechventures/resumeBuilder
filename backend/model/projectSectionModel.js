import mongoose from "mongoose";

const projectSchema =  mongoose.Schema(  {
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  // userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  name: { type: String},
  deployedLink: { type: String },
  githubLink: { type: String },
  summary: { type: String },
},
{ timestamps: true });
  
  const projectsModel = mongoose.models.projects || mongoose.model("projects", projectSchema);
export default projectsModel;