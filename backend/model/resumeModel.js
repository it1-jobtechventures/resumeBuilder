import mongoose from "mongoose";
import interestsSectionModel from "./interestsSectionModel";

const resumeSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: "template" },  // Selected template

  generalInfo: { type: mongoose.Schema.Types.ObjectId, ref: "generalinfo" },
  workExperience: [{ type: mongoose.Schema.Types.ObjectId, ref: "workexperience" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "education" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "project" }],
  internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internshipexperience" }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "skill" }],
  certifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "certification" }],
  languages: [{ type: mongoose.Schema.Types.ObjectId, ref: "language" }],
  socialLinks: { type: mongoose.Schema.Types.ObjectId, ref: "sociallink" },
  softwareInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "softwareinfo" }],
  reference: { type: mongoose.Schema.Types.ObjectId, ref: "reference" },
  accomplishment: { type: mongoose.Schema.Types.ObjectId, ref: "accomplishment" },
  interestssection: { type: mongoose.Schema.Types.ObjectId, ref: "interestssection" },
  volunteering: { type: mongoose.Schema.Types.ObjectId, ref: "volunteering" },


  isDraft: { type: Boolean, default: true },  // True for drafts, false for downloaded resumes
  createdAt: { type: Date, default: Date.now }
});

  const resumeModel = mongoose.models.resume || mongoose.model("resume", resumeSchema);
export default resumeModel;
