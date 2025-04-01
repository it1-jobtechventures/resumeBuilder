import volunterringModel from "../model/volunterringModel.js";


// Create or Update 
const saveVolunteering = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, volunteerings } = req.body; 

    if (!volunteerings || !Array.isArray(volunteerings)) {
      return res.status(400).json({ message: "Invalid volunterringModel data" });
    }

    // Delete existing certifications for the user & resumeId
    await volunterringModel.deleteMany({ userId, resumeId });

    // Save new certifications
    const newVolunteerings = volunteerings.map((volunteerings) => ({
      userId,
      resumeId,
      ...volunteerings,
    }));

    const savedVolunteerings = await volunterringModel.insertMany(newVolunteerings);

    res.status(201).json({ message: "volunterringModel saved successfully", volunteerings: savedVolunteerings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch  for a Resume
const getVolunteerings = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const volunteerings = await volunterringModel.find({ userId, resumeId });

    if (!volunteerings.length) return res.status(404).json({ message: "No volunteerings found" });

    res.status(200).json(volunteerings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getVolunteerings ,saveVolunteering}
