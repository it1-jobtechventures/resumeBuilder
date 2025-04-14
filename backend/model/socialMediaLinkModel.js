import mongoose from "mongoose";

const socialLinksSchema =  mongoose.Schema(  {
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  instagram: { type: String, default: "" },
  facebook: { type: String, default: "" },
  whatsapp: { type: String, default: "" },
  twitter: { type: String, default: "" },
  pinterest: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  portfolio: { type: String, default: "" }, // Personal website/portfolio
},
{ timestamps: true });

  const socialLinksModel = mongoose.models.socialLinks || mongoose.model("socialLinks", socialLinksSchema);
export default socialLinksModel;