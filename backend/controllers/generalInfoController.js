import generalInfoModel from '../model/generalInfoModel.js'

// Create or Update General Info
const saveGeneralInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, ...generalInfoData } = req.body;

    let generalInfo = await generalInfoModel.findOne({ userId, resumeId });

    if (generalInfo) {
      generalInfo = await generalInfoModel.findOneAndUpdate(
        { userId, resumeId },
        generalInfoData,
        { new: true }
      );
      return res.status(200).json({ message: "General Info updated", generalInfo });
    }

    const newGeneralInfo = new generalInfoModel ({ userId, resumeId, ...generalInfoData });
    await newGeneralInfo.save();

    res.status(201).json({ message: "General Info saved", generalInfo: newGeneralInfo });
  } catch (error) {
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
