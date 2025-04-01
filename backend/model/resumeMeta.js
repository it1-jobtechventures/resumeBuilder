import mongoose from "mongoose";

const resumeMetaSchema =  mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template", required: true },
    status: { type: String, enum: ["draft", "downloaded"], default: "draft" },
  },
  { timestamps: true }
);

  const resumeMetaModel = mongoose.models.resumeMeta || mongoose.model("resumeMeta", resumeMetaSchema);
export default resumeMetaModel
