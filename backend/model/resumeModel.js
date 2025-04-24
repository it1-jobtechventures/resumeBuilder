import mongoose from "mongoose";


const resumeSchema =  mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
 userId:{ type: String, required: true },
  // templateId: { type: mongoose.Schema.Types.ObjectId, ref: "template" },  // Selected template

  generalInfo: { type: mongoose.Schema.Types.ObjectId, ref: "generalInfo" },
  workExperience: [{ type: mongoose.Schema.Types.ObjectId, ref: "workExperience" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "education" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
  internshipExperience: [{ type: mongoose.Schema.Types.ObjectId, ref: "internshipExperience" }],
  skill: [{ type: mongoose.Schema.Types.ObjectId, ref: "skill" }],
  certification: [{ type: mongoose.Schema.Types.ObjectId, ref: "certification" }],
  language: [{ type: mongoose.Schema.Types.ObjectId, ref: "language" }],
  socialLinks: { type: mongoose.Schema.Types.ObjectId, ref: "socialLink" },
  softwareInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "softwareInfo" }],
  reference: { type: mongoose.Schema.Types.ObjectId, ref: "reference" },
  accomplishment: { type: mongoose.Schema.Types.ObjectId, ref: "accomplishment" },
  interestsSection: { type: mongoose.Schema.Types.ObjectId, ref: "interestsSection" },
  volunteering: [{type: mongoose.Schema.Types.ObjectId,ref: 'volunteering'}], 
  isDraft: { type: Boolean, default: true },  // True for drafts, false for downloaded resumes
  createdAt: { type: Date, default: Date.now }
});

  const resumeModel = mongoose.models.resume || mongoose.model("resume", resumeSchema);
export default resumeModel;
