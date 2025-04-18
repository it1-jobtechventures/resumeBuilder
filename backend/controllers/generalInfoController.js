import generalInfoModel from '../model/generalInfoModel.js'
import resumeModel from '../model/resumeModel.js';
import cloudinary from "../config/cloudinary.js";
// const saveGeneralInfo = async (req, res) => {
//   try {
//     const userId = req.body.userId; // ✅ Fixed
//     const { resumeId, ...generalInfoData } = req.body;

//     console.log("📥 Incoming data:", { userId, resumeId, ...generalInfoData });

//     let generalInfo = await generalInfoModel.findOne({ userId, resumeId });

//     if (generalInfo) {
//       console.log("🔄 Updating existing generalInfo:", generalInfo._id);

//       generalInfo = await generalInfoModel.findOneAndUpdate(
//         { userId, resumeId },
//         generalInfoData,
//         { new: true }
//       );

//       await resumeModel.findByIdAndUpdate(resumeId, {
//         generalInfo: generalInfo._id
//       });

//       console.log("✅ Updated generalInfo:", generalInfo);

//       return res.status(200).json({ message: "General Info updated", generalInfo });
//     }

//     console.log("➕ Creating new generalInfo");
//     const newGeneralInfo = new generalInfoModel({ userId, resumeId, ...generalInfoData });
//     await newGeneralInfo.save();

//     await resumeModel.findByIdAndUpdate(resumeId, {
//       generalInfo: newGeneralInfo._id
//     });

//     console.log("✅ Saved new generalInfo:", newGeneralInfo);

//     res.status(201).json({ message: "General Info saved", generalInfo: newGeneralInfo });
//   } catch (error) {
//     console.error("❌ Server error in saveGeneralInfo:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

const saveGeneralInfo = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { resumeId, ...generalInfoData } = req.body;

    console.log("📥 Incoming data:", { userId, resumeId, ...generalInfoData });

    // Sanitize photo field in case it's incorrectly sent as an object
if (typeof generalInfoData.photo !== "string") {
  delete generalInfoData.photo;
}

    // 📸 Handle image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "photo",//cloudinary folder name 
      });
      generalInfoData.photo = result.secure_url; // 👈 Save the Cloudinary image URL
    }

    let generalInfo = await generalInfoModel.findOne({ userId, resumeId });

    if (generalInfo) {
      console.log("🔄 Updating existing generalInfo:", generalInfo._id);

      generalInfo = await generalInfoModel.findOneAndUpdate(
        { userId, resumeId },
        generalInfoData,
        { new: true }
      );

      await resumeModel.findByIdAndUpdate(resumeId, {
        generalInfo: generalInfo._id,
      });

      console.log("✅ Updated generalInfo:", generalInfo);

      return res.status(200).json({ message: "General Info updated", generalInfo });
    }

    console.log("➕ Creating new generalInfo");

    const newGeneralInfo = new generalInfoModel({ userId, resumeId, ...generalInfoData });
    await newGeneralInfo.save();

    await resumeModel.findByIdAndUpdate(resumeId, {
      generalInfo: newGeneralInfo._id,
    });

    console.log("✅ Saved new generalInfo:", newGeneralInfo);

    res.status(201).json({ message: "General Info saved", generalInfo: newGeneralInfo });
  } catch (error) {
    console.error("❌ Server error in saveGeneralInfo:", error);
    res.status(500).json({ error: error.message });
  }
};

// Fetch General Info for a Resume
const getGeneralInfo = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const generalInfo = await generalInfoModel.findOne({ userId, resumeId });

    if (!generalInfo) return res.status(404).json({ message: "General Info not found" });

    res.status(200).json(generalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {saveGeneralInfo  , getGeneralInfo}
