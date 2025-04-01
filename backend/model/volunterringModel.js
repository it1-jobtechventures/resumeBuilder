import mongoose from "mongoose";

const volunteeringSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resumeMeta", required: true }, // Link to Resume
  name: { type: String, required: true },
},{ timestamps: true });
  

  const volunteeringModel = mongoose.models.volunteering || mongoose.model("volunteering", volunteeringSchema);
export default volunteeringModel;