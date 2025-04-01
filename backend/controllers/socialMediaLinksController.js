import socialLinksModel from "../model/socialMediaLinkModel.js";


// Create or Update Social Media Links
const saveSocialMedia = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, socialLinks } = req.body; // socialLinks = { instagram, facebook, twitter, etc. }

    if (!resumeId || !socialLinks) {
      return res.status(400).json({ message: "Resume ID and social links are required" });
    }

    // Upsert (update if exists, otherwise create new)
    const updatedSocialMedia = await socialLinksModel.findOneAndUpdate(
      { userId, resumeId },
      { userId, resumeId, ...socialLinks },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Social media links saved", socialLinks: updatedSocialMedia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Social Media Links for a Resume
const getSocialMedia = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const socialMedia = await socialLinksModel.findOne({ userId, resumeId });

    if (!socialMedia) return res.status(404).json({ message: "No social media links found" });

    res.status(200).json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {getSocialMedia ,saveSocialMedia}
