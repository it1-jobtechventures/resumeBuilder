import mongoose from "mongoose";

const softwareInfoSchema =  mongoose.Schema(  {
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  softwareSkills: [
    {
      name: { type: String, required: true }, // Software name (e.g., Photoshop, Linux)
      rating: { type: Number, required: true, min: 1, max: 5 }, // Proficiency rating (1-5)
    },
  ],
},
{ timestamps: true });
  

  const softwareInfoModel = mongoose.models.softwareInfo || mongoose.model("softwareInfo", softwareInfoSchema);
export default softwareInfoModel;