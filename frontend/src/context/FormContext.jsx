import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Context
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    return {
      generalInfo: JSON.parse(localStorage.getItem('generalInfo')) || {},
      workExperience: JSON.parse(localStorage.getItem('workExperience')) || [],
      education: JSON.parse(localStorage.getItem('education')) || [],
      skills: JSON.parse(localStorage.getItem('skills')) || [],
      internships: JSON.parse(localStorage.getItem('internshipExperience')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      reference: JSON.parse(localStorage.getItem('reference')) || {},
      certifications:JSON.parse(localStorage.getItem('certifications')) || [],
      interests:JSON.parse(localStorage.getItem('interests')) || [],
      languages:JSON.parse(localStorage.getItem('languages')) || [],
      accomplishments:JSON.parse(localStorage.getItem('accomplishments')) || [],
      socialLinks:JSON.parse(localStorage.getItem('socialLinks')) || {},
      volunteering:JSON.parse(localStorage.getItem('volunteering')) || [],
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    Object.keys(resumeData).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(resumeData[key]));
    });
  }, [resumeData]);

  const updateResumeData = (section, data) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: data
    }));
  };

  return (
    <FormContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the context
export const useResume = () => {
  return useContext(FormContext);
};
