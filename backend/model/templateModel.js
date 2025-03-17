import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    htmlContent: { type: String },
    cssContent: { type: String },
    jsContent: { type: String },
    previewImage: { type: String }, 
  },
  { timestamps: true }
);

const templateModel = mongoose.models.template ||  mongoose.model('template', templateSchema);
export default templateModel;

