import mongoose from "mongoose";

const accomplishmentSchema =  mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Link to User
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "resumeMeta", required: true },
  name: { type: String, required: true },
},{ timestamps: true });

  const accomplishmentModel = mongoose.models.accomplishment|| mongoose.model("accomplishment", accomplishmentSchema);
  export default accomplishmentModel;