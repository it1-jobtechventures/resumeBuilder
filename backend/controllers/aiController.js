import { generateSummary, generateWorkExperience } from "../model/aiModel.js";

// Controller function to handle generating summary
const aiGenerate = async (req, res) => {
  const { designation, experience } = req.body;

  if (!designation || !experience) {
    return res.status(400).json({ error: 'Designation and experience are required' });
  }

  try {
    // Call the model to generate the summary
    const summary = await generateSummary(designation, experience);
    return res.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
};

const aiWorkExperience = async (req, res) => {
  const { companyName, companyExperience, jobTitle } = req.body;
  
  if (!companyName || !companyExperience || !jobTitle) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  try {
    // Call the model to generate the summary
    const generatedDescription = await generateWorkExperience(companyName, companyExperience, jobTitle);
    return res.json({ summary :generatedDescription});
  } catch (error) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
}

const aiInternshipExperience = async (req, res) => {
  const { company, title } = req.body;
  
  if (!company || !title ) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  try {
    // Call the model to generate the summary
    const generatedDescription = await generateWorkExperience(company, title);
    return res.json({ summary :generatedDescription});
  } catch (error) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
}

const aiProject = async (req, res) => {
  const {  name, deployedLink ,githubLink } = req.body;
  
  if (!name || !deployedLink ) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  try {
    // Call the model to generate the summary
    const generatedDescription = await generateWorkExperience(name, deployedLink ,githubLink);
    return res.json({ summary :generatedDescription});
  } catch (error) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
}
export {aiGenerate , aiWorkExperience,aiInternshipExperience,aiProject}
