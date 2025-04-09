import referenceModel from "../model/referencesSectionModel.js";
import resumeModel from "../model/resumeModel.js";


// // Create or Update Reference Info
// const saveReference = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, name, company, contact } = req.body;

//     if (!resumeId || !name || !company || !contact) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Upsert (update if exists, otherwise create new)
//     const updatedReference = await referenceModel.findOneAndUpdate(
//       { userId, resumeId },
//       { userId, resumeId, name, company, contact },
//       { new: true, upsert: true }
//     );

//     res.status(201).json({ message: "Reference saved", reference: updatedReference });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const saveReference = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, name, company, contact } = req.body;

    if (!resumeId || !name || !company || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upsert (update if exists, otherwise create new)
    const updatedReference = await referenceModel.findOneAndUpdate(
      { userId, resumeId },
      { userId, resumeId, name, company, contact },
      { new: true, upsert: true }
    );

    // Save reference ID in resume model
    await resumeModel.findByIdAndUpdate(resumeId, {
      $addToSet: { reference: updatedReference._id }
    });

    res.status(201).json({ message: "Reference saved", reference: updatedReference });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Reference Info for a Resume
const getReference = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const reference = await referenceModel.findOne({ userId, resumeId });

    if (!reference) return res.status(404).json({ message: "No reference found" });

    res.status(200).json(reference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {getReference, saveReference}