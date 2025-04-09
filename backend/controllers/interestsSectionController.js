import interestsSectionModel from "../model/interestsSectionModel.js";
import resumeModel from "../model/resumeModel.js";



// // Create or Update 
// const saveInterests = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, interests } = req.body; 

//     if (!interests || !Array.isArray(interests)) {
//       return res.status(400).json({ message: "Invalid interests data" });
//     }

//     // Delete existing certifications for the user & resumeId
//     await interestsSectionModel.deleteMany({ userId, resumeId });

//     // Save new certifications
//     const newInterests = interests.map((interests) => ({
//       userId,
//       resumeId,
//       ...interests,
//     }));

//     const savedInterests = await interestsSectionModel.insertMany(newInterests);

//     res.status(201).json({ message: "interests saved successfully", interests: savedInterests });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const saveInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, interests } = req.body;

    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ message: "Invalid interests data" });
    }

    // Delete existing interests for the user & resumeId
    await interestsSectionModel.deleteMany({ userId, resumeId });

    // Save new interests
    const newInterests = interests.map((item) => ({
      userId,
      resumeId,
      ...item,
    }));

    const savedInterests = await interestsSectionModel.insertMany(newInterests);

    // Save the first interest's ID to resume model
    if (savedInterests.length > 0) {
      await resumeModel.findByIdAndUpdate(resumeId, {
        interestsSection: savedInterests[0]._id,
      });
    }

    res.status(201).json({ message: "Interests saved successfully", interests: savedInterests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Fetch  for a Resume
const getInterests = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const interests = await interestsSectionModel.find({ userId, resumeId });

    if (!interests.length) return res.status(404).json({ message: "No interests found" });

    res.status(200).json(interests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getInterests ,saveInterests}
