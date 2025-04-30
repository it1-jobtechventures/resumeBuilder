import {OpenAI} from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({apikey: process.env.OPENAI_API_KEY});

// Model function to interact with OpenAI API and generate the summary
export const generateSummary = async (designation, experience) => {
  try {
    const prompt = `Create a professional summary for a user with the following details:
    Designation: ${designation}
    Total Experience: ${experience} years`;

    // Call OpenAI API to generate the summary
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano', // You can adjust the model version as needed
      messages: [{ role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }],
      max_tokens: 100, // Adjust based on how long you want the summary to be
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate summary');
  }
};

// Model function to interact with OpenAI API and generate the summary
export const generateWorkExperience= async (companyName, companyExperience, jobTitle) => {
  try {
    const prompt = `Create Job description of 5 to 8 lines for resume with only given data:
    companyName: ${companyName}
    Total Experience: ${companyExperience} years
    job title:${jobTitle}`
    

    // Call OpenAI API to generate the summary
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano', // You can adjust the model version as needed
      messages: [{ role: 'system', content: 'You are a helpful assistant.' },
                 { role: 'user', content: prompt }],
      max_tokens: 100, // Adjust based on how long you want the summary to be
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate summary');
  }
};

// Model function to interact with OpenAI API and generate the summary
export const generateInternshipExperience= async ( company, title) => {
  try {
    const prompt = `Create internship description of 5 to 8 lines for resume with only given data:
    companyName: ${company}
    job title:${title}`
    

    // Call OpenAI API to generate the summary
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano', // You can adjust the model version as needed
      messages: [{ role: 'system', content: 'You are a helpful assistant.' },
                 { role: 'user', content: prompt }],
      max_tokens: 100, // Adjust based on how long you want the summary to be
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate summary');
  }
};
