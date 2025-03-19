// import React, { createContext, useContext, useEffect, useState } from 'react';

// // Create Context
// const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [resumeData, setResumeData] = useState(() => {
//     return {
//       generalInfo: JSON.parse(localStorage.getItem('generalInfo')) || {},
//       workExperience: JSON.parse(localStorage.getItem('workExperience')) || [],
//       education: JSON.parse(localStorage.getItem('education')) || [],
//       skills: JSON.parse(localStorage.getItem('skills')) || [],
//       internshipExperience: JSON.parse(localStorage.getItem('internshipExperience')) || [],
//       projects: JSON.parse(localStorage.getItem('projects')) || [],
//       reference: JSON.parse(localStorage.getItem('reference')) || {},
//       certifications:JSON.parse(localStorage.getItem('certifications')) || [],
//       interests:JSON.parse(localStorage.getItem('interests')) || [],
//       languages:JSON.parse(localStorage.getItem('languages')) || [],
//       accomplishments:JSON.parse(localStorage.getItem('accomplishments')) || [],
//       socialLinks:JSON.parse(localStorage.getItem('socialLinks')) || [],
//       volunteering:JSON.parse(localStorage.getItem('volunteering')) || [],
//       softwareInfo:JSON.parse(localStorage.getItem('softwareInfo')) || []
//     };
//   });

//   // Save to localStorage whenever data changes
//   useEffect(() => {
//     Object.keys(resumeData).forEach((key) => {
//       localStorage.setItem(key, JSON.stringify(resumeData[key]));
//     });
//   }, [resumeData]);

//   const updateResumeData = (section, data) => {
//     setResumeData((prevData) => ({
//       ...prevData,
//       [section]: data
//     }));
//   };

//   return (
//     <FormContext.Provider value={{ resumeData, updateResumeData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useResume = () => {
//   return useContext(FormContext);
// };


import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Context
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const savedTimestamp = localStorage.getItem('resumeTimestamp');
    const now = Date.now();

    if (savedTimestamp && now - savedTimestamp >= 3600000) {
      // Clear local storage if 1 hour has passed
      localStorage.clear();
      return initializeEmptyState();
    }

    return {
      generalInfo: JSON.parse(localStorage.getItem('generalInfo')) || {},
      workExperience: JSON.parse(localStorage.getItem('workExperience')) || [],
      education: JSON.parse(localStorage.getItem('education')) || [],
      skills: JSON.parse(localStorage.getItem('skills')) || [],
      internshipExperience: JSON.parse(localStorage.getItem('internshipExperience')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      reference: JSON.parse(localStorage.getItem('reference')) || {},
      certifications: JSON.parse(localStorage.getItem('certifications')) || [],
      interests: JSON.parse(localStorage.getItem('interests')) || [],
      languages: JSON.parse(localStorage.getItem('languages')) || [],
      accomplishments: JSON.parse(localStorage.getItem('accomplishments')) || [],
      socialLinks: JSON.parse(localStorage.getItem('socialLinks')) || [],
      volunteering: JSON.parse(localStorage.getItem('volunteering')) || [],
      softwareInfo: JSON.parse(localStorage.getItem('softwareInfo')) || []
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    Object.keys(resumeData).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(resumeData[key]));
    });
    localStorage.setItem('resumeTimestamp', Date.now().toString());
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

// Helper function to return an empty state
const initializeEmptyState = () => ({
  generalInfo: {},
  workExperience: [],
  education: [],
  skills: [],
  internshipExperience: [],
  projects: [],
  reference: {},
  certifications: [],
  interests: [],
  languages: [],
  accomplishments: [],
  socialLinks: [],
  volunteering: [],
  softwareInfo: []
});

// Custom hook to use the context
export const useResume = () => {
  return useContext(FormContext);
};
