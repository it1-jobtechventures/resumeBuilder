// import resumeModel from "../model/resumeModel.js";

// // Create or Update Resume
// const saveResume = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const resumeData = req.body;

//     if (!resumeData) {
//       return res.status(400).json({ message: "Resume data is required" });
//     }

//     // Upsert (update if exists, otherwise create new)
//     const updatedResume = await resumeModel.findOneAndUpdate(
//       { userId, _id: resumeData.resumeId },
//       { userId, ...resumeData },
//       { new: true, upsert: true }
//     );

//     res.status(201).json({ message: "Resume saved", resume: updatedResume });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Fetch Resume by ID
// const getResumeById = async (req, res) => {
//   try {
//     const { resumeId } = req.params;
//     const userId = req.user.id;

//     const resume = await resumeModel.findOne({ userId, _id: resumeId })
//       .populate("generalInfo workExperience education projects internships skills certifications languages socialLinks softwareInfo reference accomplishment interestssection volunteering");

//     if (!resume) return res.status(404).json({ message: "Resume not found" });

//     res.status(200).json(resume);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Fetch All Resumes for a User
// const getAllResumes = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const resumes = await resumeModel.find({ userId });

//     res.status(200).json(resumes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete Resume
// const deleteResume = async (req, res) => {
//   try {
//     const { resumeId } = req.params;
//     const userId = req.user.id;

//     const deletedResume = await resumeModel.findOneAndDelete({ userId, _id: resumeId });

//     if (!deletedResume) return res.status(404).json({ message: "Resume not found" });

//     res.status(200).json({ message: "Resume deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// // Save or Update a Draft Resume
// const saveDraftResume = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { templateId, generalInfo, workExperience, education, projects } = req.body;

//     let draftResume = await resumeModel.findOne({ userId, isDraft: true });

//     if (draftResume) {
//       // Update existing draft
//       draftResume.templateId = templateId;
//       draftResume.generalInfo = generalInfo;
//       draftResume.workExperience = workExperience;
//       draftResume.education = education;
//       draftResume.projects = projects;
//       await draftResume.save();
//     } else {
//       // Create new draft
//       draftResume = await resumeModel.create({ 
//         userId, templateId, generalInfo, workExperience, education, projects, isDraft: true 
//       });
//     }

//     res.status(201).json({ message: "Draft saved successfully", resume: draftResume });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all Draft Resumes for a User
// const getDraftResumes = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const drafts = await resumeModel.find({ userId, isDraft: true });

//     if (!drafts.length) return res.status(404).json({ message: "No draft resumes found" });

//     res.status(200).json(drafts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Finalize (Download) a Resume
// const finalizeResume = async (req, res) => {
//   try {
//     const { resumeId } = req.params;
//     const userId = req.user.id;

//     const resume = await resumeModel.findOne({ _id: resumeId, userId, isDraft: true });

//     if (!resume) return res.status(404).json({ message: "Draft resume not found" });

//     resume.isDraft = false; // Mark as finalized
//     await resume.save();

//     res.status(200).json({ message: "Resume finalized successfully", resume });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// export { saveResume, getResumeById, getAllResumes, deleteResume ,saveDraftResume, getDraftResumes, finalizeResume };


import resumeModel from '../model/resumeModel.js'
import userModel from '../model/userModel.js'
import mongoose from 'mongoose';

// Create new resume (Draft or Downloaded)
const createResume = async (req, res) => {
  try {
    const { userId, templateId, isDraft } = req.body;

    const newResume = new resumeModel({
      userId,
      templateId,
      isDraft: isDraft !== false, // default is draft
    });

    const savedResume = await newResume.save();

    // // Push resume to user
    // await userModel.findByIdAndUpdate(userId, {
    //   $push: { resumes: savedResume._id },
    // });

        // ✅ Only push to user if userId is a valid ObjectId (i.e., real user)
        if (mongoose.Types.ObjectId.isValid(userId)) {
          await userModel.findByIdAndUpdate(userId, {
            $push: { resumes: savedResume._id },
          });
        }

    res.status(201).json(savedResume);
  } catch (err) {
    res.status(500).json({ error: "Failed to create resume", details: err });
  }
};

// Get all resumes for a user
const getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;

    const resumes = await resumeModel.find({ userId })
      // .populate("templateId")
      .populate("generalInfo")
      .populate("workExperience")
      .populate("projects")
      .populate("internshipExperience")
      .populate("skill")
      .populate("certification")
      .populate("language")
      .populate("socialLinks")
      .populate("softwareInfo")
      .populate("reference")
      .populate("accomplishment")
      .populate("interestsSection")
      .populate("volunteering")
      .populate("education")

    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resumes", details: err });
  }
};

// Get a single resume by resumeId
const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await resumeModel.findById(resumeId)
      // .populate("templateId")
      .populate("generalInfo")
      .populate("workExperience")
      .populate("projects")
      .populate("internshipExperience")
      .populate("skill")
      .populate("certification")
      .populate("language")
      .populate("socialLinks")
      .populate("softwareInfo")
      .populate("reference")
      .populate("accomplishment")
      .populate("interestsSection")
      .populate("volunteering")
      .populate("education")

    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resume", details: err });
  }
};

// Update an existing resume (when edited)
const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const updatedData = req.body;

    const updatedResume = await resumeModel.findByIdAndUpdate(
      resumeId,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedResume);
  } catch (err) {
    res.status(500).json({ error: "Failed to update resume", details: err });
  }
};

// Replace temporary userId with real userId
const transferTempResumesToUser = async (req, res) => {
  try {
    const { temporaryUserId, realUserId } = req.body;

    if (!temporaryUserId || !realUserId) {
      return res.status(400).json({ success: false, message: "Both IDs are required." });
    }

    // Update all resumes with the temp userId
    const updatedResumes = await resumeModel.updateMany(
      { userId: temporaryUserId },
      { userId: realUserId }
    );

    // Push all those resume IDs to the user model
    const transferredResumes = await resumeModel.find({ userId: realUserId });

    const resumeIds = transferredResumes.map(r => r._id);

    await userModel.findByIdAndUpdate(realUserId, {
      $addToSet: { resumes: { $each: resumeIds } }
    });

    res.status(200).json({ success: true, message: "Resumes transferred", updatedResumes });
  } catch (error) {
    res.status(500).json({ error: "Failed to transfer resumes", details: error.message });
  }
};

export {updateResume ,getResumeById ,getUserResumes ,createResume,transferTempResumesToUser}