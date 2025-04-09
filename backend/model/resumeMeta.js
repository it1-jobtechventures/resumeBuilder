import mongoose from "mongoose";

const resumeMetaSchema =  mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'resume', required: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'template', required: true },
    isDownloaded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

  const resumeMetaModel = mongoose.models.resumeMeta || mongoose.model("resumeMeta", resumeMetaSchema);
export default resumeMetaModel
