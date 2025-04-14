import generalInfoModel from '../model/generalInfoModel.js'
import resumeModel from '../model/resumeModel.js';

// // Create or Update General Info
// const saveGeneralInfo = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, ...generalInfoData } = req.body;

//     let generalInfo = await generalInfoModel.findOne({ userId, resumeId });

//     if (generalInfo) {
//       generalInfo = await generalInfoModel.findOneAndUpdate(
//         { userId, resumeId },
//         generalInfoData,
//         { new: true }
//       );
//       return res.status(200).json({ message: "General Info updated", generalInfo });
//     }

//     const newGeneralInfo = new generalInfoModel ({ userId, resumeId, ...generalInfoData });
//     await newGeneralInfo.save();

//     res.status(201).json({ message: "General Info saved", generalInfo: newGeneralInfo });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// // Create or Update General Info
// const saveGeneralInfo = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, ...generalInfoData } = req.body;

//     let generalInfo = await generalInfoModel.findOne({ userId, resumeId });

//     if (generalInfo) {
//       generalInfo = await generalInfoModel.findOneAndUpdate(
//         { userId, resumeId },
//         generalInfoData,
//         { new: true }
//       );

//       // Make sure resume gets updated if it's not linked yet
//       await resumeModel.findByIdAndUpdate(resumeId, {
//         generalInfo: generalInfo._id
//       });

//       return res.status(200).json({ message: "General Info updated", generalInfo });
//     }

//     const newGeneralInfo = new generalInfoModel({ userId, resumeId, ...generalInfoData });
//     await newGeneralInfo.save();

//     // 🧠 Update resume with generalInfo ID
//     await resumeModel.findByIdAndUpdate(resumeId, {
//       generalInfo: newGeneralInfo._id
//     });

//     res.status(201).json({ message: "General Info saved", generalInfo: newGeneralInfo });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const saveGeneralInfo = async (req, res) => {
//   try {
//     const userId = req.user.id;
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
    const userId = req.body.userId; // ✅ Fixed
    const { resumeId, ...generalInfoData } = req.body;

    console.log("📥 Incoming data:", { userId, resumeId, ...generalInfoData });

    let generalInfo = await generalInfoModel.findOne({ userId, resumeId });

    if (generalInfo) {
      console.log("🔄 Updating existing generalInfo:", generalInfo._id);

      generalInfo = await generalInfoModel.findOneAndUpdate(
        { userId, resumeId },
        generalInfoData,
        { new: true }
      );

      await resumeModel.findByIdAndUpdate(resumeId, {
        generalInfo: generalInfo._id
      });

      console.log("✅ Updated generalInfo:", generalInfo);

      return res.status(200).json({ message: "General Info updated", generalInfo });
    }

    console.log("➕ Creating new generalInfo");
    const newGeneralInfo = new generalInfoModel({ userId, resumeId, ...generalInfoData });
    await newGeneralInfo.save();

    await resumeModel.findByIdAndUpdate(resumeId, {
      generalInfo: newGeneralInfo._id
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
