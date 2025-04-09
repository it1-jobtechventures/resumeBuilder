import resumeMetaModel from "../model/resumeMeta.js";


// // ✅ Create a new resume entry (draft)
// const createResume = async (req, res) => {
//   try {
//     const { userId, templateId } = req.body;
//     const newResume = new resumeMetaModel({ userId, templateId });
//     await newResume.save();
//     res.status(201).json(newResume);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Fetch all resumes for a user
// const getUserResumes = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const resumes = await resumeMetaModel.find({ userId });
//     res.status(200).json(resumes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Update resume status (e.g., from draft → downloaded)
// const updateResumeStatus = async (req, res) => {
//   try {
//     const { resumeId } = req.params;
//     const { status } = req.body;
//     const updatedResume = await resumeMetaModel.findByIdAndUpdate(
//       resumeId,
//       { status },
//       { new: true }
//     );
//     res.status(200).json(updatedResume);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export {updateResumeStatus ,getUserResumes, createResume}


// import resumeMetaModel from "../model/resumeMetaModel.js";
import userModel from "../model/userModel.js";

const createResumeMeta = async (req, res) => {
  try {
    const { userId, resumeId, templateId } = req.body;

    if (!userId || !resumeId || !templateId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMeta = new resumeMetaModel({
      userId,
      resumeId,
      templateId,
      isDownloaded: false, // initially draft
    });

    const savedMeta = await newMeta.save();

    // Optional: Push resumeMeta ID to user's profile if needed
    await userModel.findByIdAndUpdate(userId, {
      $push: { resumeMetas: savedMeta._id },
    });

    res.status(201).json({ message: "Resume meta created", meta: savedMeta });
  } catch (err) {
    res.status(500).json({ message: "Error creating resume meta", error: err.message });
  }
};

const getAllResumeMetas = async (req, res) => {
  try {
    const { userId } = req.params;

    const metas = await resumeMetaModel.find({ userId })
      .populate("resumeId")
      .populate("templateId");

    res.status(200).json(metas);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resume metas", error: err.message });
  }
};

const getResumeMetaById = async (req, res) => {
  try {
    const { resumeMetaId } = req.params;

    const meta = await resumeMetaModel.findById(resumeMetaId)
      .populate("resumeId")
      .populate("templateId");

    if (!meta) return res.status(404).json({ message: "Resume meta not found" });

    res.status(200).json(meta);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resume meta", error: err.message });
  }
};

const markResumeAsDownloaded = async (req, res) => {
  try {
    const { resumeMetaId } = req.params;

    const updatedMeta = await resumeMetaModel.findByIdAndUpdate(
      resumeMetaId,
      { isDownloaded: true },
      { new: true }
    );

    res.status(200).json({ message: "Marked as downloaded", meta: updatedMeta });
  } catch (err) {
    res.status(500).json({ message: "Failed to update meta", error: err.message });
  }
};

export {
  createResumeMeta,
  getAllResumeMetas,
  getResumeMetaById,
  markResumeAsDownloaded
};
