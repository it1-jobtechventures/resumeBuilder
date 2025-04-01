import resumeModel from "../model/resumeModel.js";

// Create or Update Resume
const saveResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeData = req.body;

    if (!resumeData) {
      return res.status(400).json({ message: "Resume data is required" });
    }

    // Upsert (update if exists, otherwise create new)
    const updatedResume = await resumeModel.findOneAndUpdate(
      { userId, _id: resumeData.resumeId },
      { userId, ...resumeData },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Resume saved", resume: updatedResume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Resume by ID
const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const resume = await resumeModel.findOne({ userId, _id: resumeId })
      .populate("generalInfo workExperience education projects internships skills certifications languages socialLinks softwareInfo reference accomplishment interestssection volunteering");

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch All Resumes for a User
const getAllResumes = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumes = await resumeModel.find({ userId });

    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const deletedResume = await resumeModel.findOneAndDelete({ userId, _id: resumeId });

    if (!deletedResume) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Save or Update a Draft Resume
const saveDraftResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const { templateId, generalInfo, workExperience, education, projects } = req.body;

    let draftResume = await resumeModel.findOne({ userId, isDraft: true });

    if (draftResume) {
      // Update existing draft
      draftResume.templateId = templateId;
      draftResume.generalInfo = generalInfo;
      draftResume.workExperience = workExperience;
      draftResume.education = education;
      draftResume.projects = projects;
      await draftResume.save();
    } else {
      // Create new draft
      draftResume = await resumeModel.create({ 
        userId, templateId, generalInfo, workExperience, education, projects, isDraft: true 
      });
    }

    res.status(201).json({ message: "Draft saved successfully", resume: draftResume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Draft Resumes for a User
const getDraftResumes = async (req, res) => {
  try {
    const userId = req.user.id;
    const drafts = await resumeModel.find({ userId, isDraft: true });

    if (!drafts.length) return res.status(404).json({ message: "No draft resumes found" });

    res.status(200).json(drafts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Finalize (Download) a Resume
const finalizeResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const resume = await resumeModel.findOne({ _id: resumeId, userId, isDraft: true });

    if (!resume) return res.status(404).json({ message: "Draft resume not found" });

    resume.isDraft = false; // Mark as finalized
    await resume.save();

    res.status(200).json({ message: "Resume finalized successfully", resume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export { saveResume, getResumeById, getAllResumes, deleteResume ,saveDraftResume, getDraftResumes, finalizeResume };
