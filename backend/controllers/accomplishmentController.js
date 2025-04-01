import accomplishmentModel from "../model/accomplishmentModel.js";

// Create or Update 
const saveAccomplishment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, accomplishment } = req.body; 

    if (!accomplishment || !Array.isArray(accomplishment)) {
      return res.status(400).json({ message: "Invalid accomplishment data" });
    }

    // Delete existing certifications for the user & resumeId
    await accomplishmentModel.deleteMany({ userId, resumeId });

    // Save new certifications
    const newAccomplishment= accomplishment.map((accomplishment) => ({
      userId,
      resumeId,
      ...accomplishment,
    }));

    const savedAccomplishment = await accomplishmentModel.insertMany(newAccomplishment);

    res.status(201).json({ message: "accomplishment saved successfully", accomplishment: savedAccomplishment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch  for a Resume
const getAccomplishment = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const accomplishments = await accomplishmentModel.find({ userId, resumeId });

    if (!accomplishments.length) return res.status(404).json({ message: "No accomplishments found" });

    res.status(200).json(accomplishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getAccomplishment ,saveAccomplishment}
