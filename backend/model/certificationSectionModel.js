import mongoose from "mongoose";

const certificationSchema =  mongoose.Schema(  {
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  userId:{type:String , required:true},
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
  name: { type: String, required: true }, // Certification name
  // issuingOrganization: { type: String, required: true }, // Issuing body
  // issueDate: { type: Date, required: true }, // Date issued
  // expirationDate: { type: Date }, // Expiration date (if applicable)
  // credentialId: { type: String }, // ID number of the certification
  // credentialURL: { type: String }, // Link to certificate
},
{ timestamps: true });
  
  const certificationsModel = mongoose.models.certification || mongoose.model("certification", certificationSchema);
export default certificationsModel;