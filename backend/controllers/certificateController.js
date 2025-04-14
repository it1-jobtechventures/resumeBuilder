import certificationsModel from "../model/certificationSectionModel.js";

import resumeModel from '../model/resumeModel.js';
// Create or Update Certifications
// const saveCertifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { resumeId, certifications } = req.body; // certifications = [{ name: "", issuingOrganization: "", ...}, {...}]

//     if (!certifications || !Array.isArray(certifications)) {
//       return res.status(400).json({ message: "Invalid certifications data" });
//     }

//     // Delete existing certifications for the user & resumeId
//     await certificationsModel.deleteMany({ userId, resumeId });

//     // Save new certifications
//     const newCertifications = certifications.map((certification) => ({
//       userId,
//       resumeId,
//       ...certification,
//     }));

//     const savedCertifications = await certificationsModel.insertMany(newCertifications);

//     res.status(201).json({ message: "Certifications saved successfully", certifications: savedCertifications });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




const saveCertifications = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = req.body.userId; // ✅ Fixed
    const { resumeId, certifications } = req.body;

    if (!certifications || !Array.isArray(certifications)) {
      return res.status(400).json({ message: "Invalid certifications data" });
    }

    // Delete existing certifications for the user & resumeId
    await certificationsModel.deleteMany({ userId, resumeId });

    // Save new certifications
    const newCertifications = certifications.map((certification) => ({
      userId,
      resumeId,
      ...certification,
    }));

    const savedCertifications = await certificationsModel.insertMany(newCertifications);

    // Save certification IDs to resume model
    const certificationIds = savedCertifications.map(cert => cert._id);

    await resumeModel.findByIdAndUpdate(resumeId, {
      certification: certificationIds
    });

    res.status(201).json({ message: "Certifications saved successfully", certifications: savedCertifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Fetch Certifications for a Resume
const getCertifications = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const certifications = await certificationsModel.find({ userId, resumeId });

    if (!certifications.length) return res.status(404).json({ message: "No certifications found" });

    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getCertifications ,saveCertifications}
