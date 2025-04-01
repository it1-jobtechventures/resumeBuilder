import resumeMetaModel from "../model/resumeMeta.js";


// ✅ Create a new resume entry (draft)
const createResume = async (req, res) => {
  try {
    const { userId, templateId } = req.body;
    const newResume = new resumeMetaModel({ userId, templateId });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch all resumes for a user
const getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = await resumeMetaModel.find({ userId });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update resume status (e.g., from draft → downloaded)
const updateResumeStatus = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { status } = req.body;
    const updatedResume = await resumeMetaModel.findByIdAndUpdate(
      resumeId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {updateResumeStatus ,getUserResumes, createResume}