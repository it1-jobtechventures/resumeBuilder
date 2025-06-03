import educationModel from "../model/educationModel.js";
import resumeModel from "../model/resumeModel.js";




// Create or Update Education
// const saveEducation = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, ...educationData } = req.body;

//     let education = await educationModel.findOne({ userId, resumeId, school: educationData.school });

//     if (education) {
//       education = await educationModel.findOneAndUpdate(
//         { userId, resumeId, school: educationData.school },
//         educationData,
//         { new: true }
//       );
//       return res.status(200).json({ message: "Education updated", education });
//     }

//     const newEducation = new educationModel({ userId, resumeId, ...educationData });
//     await newEducation.save();

//     res.status(201).json({ message: "Education saved", education: newEducation });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const saveEducation = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const { resumeId, ...educationData } = req.body;

    let education = await educationModel.findOne({  resumeId, school: educationData.school });

    if (education) {
      education = await educationModel.findOneAndUpdate(
        {  resumeId, school: educationData.school },
        educationData,
        { new: true }
      );

      // Update resume's education list (ensure no duplicate IDs)
      await resumeModel.findByIdAndUpdate(resumeId, {
        $addToSet: { education: education._id }
      });

      return res.status(200).json({ message: "Education updated", education });
    }

    const newEducation = new educationModel({  resumeId, ...educationData });
    await newEducation.save();

    // Add education ID to resume
    await resumeModel.findByIdAndUpdate(resumeId, {
      $addToSet: { education: newEducation._id }
    });

    res.status(201).json({ message: "Education saved", education: newEducation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Fetch Education for a Resume
const getEducation = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const education = await educationModel.find({ userId, resumeId });

    if (!education.length) return res.status(404).json({ message: "No education records found" });

    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {getEducation ,saveEducation}
