import mongoose from "mongoose";

const volunteeringSchema =  mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  // userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  name: { type: String, required: true },
},{ timestamps: true });
  

  const volunteeringModel = mongoose.models.volunteering || mongoose.model("volunteering", volunteeringSchema);
export default volunteeringModel;