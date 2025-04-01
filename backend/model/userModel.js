import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String,required: [true, "Name is required"],},
    email: {type: String,required: [true, "Email is required"],unique: true},
    password: {type: String,required: [true, "Password is required"],},
    resetOtp: {type: String,default: ''},
    resetOtpExpireAt: {type: Number,default: 0 },
    resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "resume" }],
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;