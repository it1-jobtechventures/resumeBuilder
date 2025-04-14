import mongoose from "mongoose";

const generalInfoSchema =  mongoose.Schema({
  
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
    userId:{type:String, required: true,},
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resume", required: true }, // Link to Resume
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String },
    countryCode1: { type: String },
    phone1: { type: String },
    countryCode2: { type: String },
    phone2: { type: String },
    country: { type: String },
    city: { type: String },
    pincode: { type: String },
    address: { type: String },
    experience: { type: String },
    designation: {type : String},
    summary : {type : String}
  },
  { timestamps: true }
  );

const generalInfoModel = mongoose.models.generalInfo || mongoose.model("generalInfo", generalInfoSchema);
export default generalInfoModel;