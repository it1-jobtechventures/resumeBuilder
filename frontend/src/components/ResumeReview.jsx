// import React from "react";
// import { useResume } from "../context/FormContext"; // Correct import

// const ResumePreview = () => {
//   const { resumeData } = useResume();

//   // Ensure each field has a default value to prevent errors
//   const { 
//     generalInfo = {}, 
//     workExperience = [], 
//     education = [], 
//     skills = [], 
//     internships = [], 
//     projects = [] ,
//     reference={},
//     certifications=[],
//     interests=[],
//     languages=[],
//     accomplishments=[],
//     socialLinks={},
//     volunteering=[],
//     softwareInfo=[],
//   } = resumeData || {};

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//       {/* Header Section */}
//       <div className="text-center border-b pb-4">
//         <h1 className="text-3xl font-bold text-gray-900">
//           {generalInfo.firstName} {generalInfo.lastName}
//         </h1>
//         <p className="text-gray-600">
//           {generalInfo.email} | {generalInfo.phone1} | {generalInfo.city}, {generalInfo.country}
//         </p>
//         <p className="text-gray-500">
//           LinkedIn: {generalInfo.linkedin} | Portfolio: {generalInfo.portfolio}
//         </p>
//       </div>

//       {/* Work Experience Section */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
//         {workExperience.length > 0 ? workExperience.map((job, index) => (
//           <div key={index} className="mt-2">
//             <h3 className="text-lg font-medium text-gray-900">{job.company} - {job.location}</h3>
//             {job.roles.map((role, i) => (
//               <div key={i}>
//                 <p className="text-gray-600">{role.title} ({role.startDate} - {role.currentlyWorking ? "Present" : role.endDate})</p>
//                 <p className="text-gray-700 text-sm">{role.description}</p>
//               </div>
//             ))}
//           </div>
//         )) : <p className="text-gray-500 text-sm">No work experience added.</p>}
//       </div>

//       {/* Internship Experience */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold text-gray-800">Internships</h2>
//         {internships.length > 0 ? internships.map((intern, index) => (
//           <div key={index} className="mt-2">
//             <h3 className="text-lg font-medium text-gray-900">{intern.company} - {intern.location}</h3>
//             <p className="text-gray-600">{intern.title} ({intern.startDate} - {intern.currentlyWorking ? "Present" : intern.endDate})</p>
//             <p className="text-gray-700 text-sm">{intern.description}</p>
//           </div>
//         )) : <p className="text-gray-500 text-sm">No internships added.</p>}
//       </div>

//       {/* Education Section */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold text-gray-800">Education</h2>
//         {education.length > 0 ? education.map((edu, index) => (
//           <div key={index} className="mt-2">
//             <h3 className="text-lg font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
//             <p className="text-gray-600">{edu.school} | {edu.graduationDate}</p>
//           </div>
//         )) : <p className="text-gray-500 text-sm">No education details added.</p>}
//       </div>

//       {/* Skills Section */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {skills.length > 0 ? skills.map((skill, index) => (
//             <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-lg">
//               {skill.name} - {skill.level}
//             </span>
//           )) : <p className="text-gray-500 text-sm">No skills added.</p>}
//         </div>
//       </div>

//       {/* Projects Section */}
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
//         {projects.length > 0 ? projects.map((proj, index) => (
//           <div key={index} className="mt-2">
//             <h3 className="text-lg font-medium text-gray-900">{proj.name}</h3>
//             <p className="text-gray-600">{proj.summary}</p>
//             <p className="text-blue-600 text-sm">GitHub: {proj.githubLink} | <a href={proj.deployedLink} className="text-blue-500 underline">Live Demo</a></p>
//           </div>
//         )) : <p className="text-gray-500 text-sm">No projects added.</p>}
//       </div>
//       {/* reference */}
//       <div>
//       <h2 className="text-xl font-semibold text-gray-800">reference</h2>
//         {/* {reference.length > 0 ? reference.map((ref, index) => (
//           <div key={index} className="mt-2">
//             <h3 className="text-lg font-medium text-gray-900">{ref.name}</h3>
//             <p className="text-gray-600">{proj.company}</p>
//             <p className="text-blue-600 text-sm"> {ref.contact}</p>
//           </div>
//         )) : <p className="text-gray-500 text-sm">No projects added.</p>} */}
//         <div >
//         <p>name:{reference.name}</p>
//         <p>company:{reference.company}</p>
//         <p>contact:{reference.contact}</p>
//         </div>

//       </div>

//       {/* certificate  */}
//       <div>
//       <h2 className="text-xl font-semibold text-gray-800">certificate</h2>
//         {certifications.length > 0 ? certifications.map((certificate, index) => (
//           <div key={index} className="mt-2">
//             <h3 className="text-lg font-medium text-gray-900">{certificate} </h3>
            
//           </div>
//         )) : <p className="text-gray-500 text-sm">No certificate details added.</p>}
//       </div>

//       {/* interests  */}
//       <div className="mt-6">
//         <h2>Interest</h2>
//         {interests.length > 0 ? interests.map((interest ,index) => (
//             <div key={index}>
//               <h3>{interest}</h3>
//             </div>
//           )) : <p>no interest</p>
//         }
//       </div>


//         {/* languages  */}
//       <div className="mt-6">
//         <h2>languages</h2>
//         {languages.length > 0 ? languages.map((language ,index) => (
//             <div key={index} className="flex">
//               <h3>{language.language}</h3> - <h3>{language.level}</h3>
//             </div>
//           )) : <p>no interest</p>
//         }
//       </div>

//       {/* accomplishments  */}
//       <div className="mt-7">
//         <h1 className="font-bold">accomplishments</h1>
//         {accomplishments.length > 0 ?  accomplishments.map((accomplishment , index) => (
//           <div key={index}>
//             <h2>{accomplishment}</h2>
//           </div>
//         )):<p>no accomplishments</p>}
//       </div>

//       {/* socialLinks  */}
//       <div className="mt-7">
//         <h1 className="font-bold">socialLinks</h1>
//         {/* {socialLinks.length > 0 ?  socialLinks.map((socialLink , index) => (
//           <div key={index}>
//             <h2>instagram{socialLink.instagram}</h2>
//             <h2>whats{socialLink.whatsapp}</h2>
//             <h2>X{socialLink.twitter}</h2>
//             <h2>pinterest{socialLink.pinterest}</h2>
//             <h2>facebook{socialLink.facebook}</h2>
//           </div>
//         )):<p>no socialLink</p>} */}
//                 {socialLinks.instagram && <h2>Instagram: {socialLinks.instagram}</h2>}
//         {socialLinks.facebook && <h2>Facebook: {socialLinks.facebook}</h2>}
//         {socialLinks.whatsapp && <h2>WhatsApp: {socialLinks.whatsapp}</h2>}
//         {socialLinks.twitter && <h2>Twitter: {socialLinks.twitter}</h2>}
//         {socialLinks.pinterest && <h2>Pinterest: {socialLinks.pinterest}</h2>}
//         {!socialLinks.instagram && !socialLinks.facebook && !socialLinks.whatsapp && !socialLinks.twitter && !socialLinks.pinterest && (
//           <p>No social links added.</p>
//         )}
//       </div>

//       {/* volunteering  */}
//       <div className="mt-7">
//         <h1 className="font-bold">volunteering</h1>
//         {volunteering.length > 0 ?  volunteering.map((volunteerings , index) => (
//           <div key={index}>
//             <h2>{volunteerings}</h2>
//           </div>
//         )):<p>no volunteering</p>}
//       </div>

//       {/* softwareInfo  */}
//       <div className="mt-7">
//         <h1 className="font-bold">softwareInfo</h1>
//         {softwareInfo.length > 0 ?  softwareInfo.map((software , index) => (
//           <div key={index} className="flex">
//             <h2>{software.name}</h2>-<h2>{software.rating}</h2>
//           </div>
//         )):<p>no software</p>}
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;





import React from 'react';
import { useLocation } from 'react-router-dom';
import { useResume } from '../context/FormContext';

const ResumePreview = () => {
  const location = useLocation();
  const { selectedTemplate } = location.state || {};
  const { resumeData } = useResume();

  if (!selectedTemplate) {
    return <p>No template selected!</p>;
  }

  console.log('Form Data:', resumeData); 
  console.log('Selected Template:', selectedTemplate);

  return (
    <div>
      <h1>Resume Preview</h1>
      <h2>Template Name: {selectedTemplate.name}</h2>
      <img src={selectedTemplate.image} alt={selectedTemplate.name} />

      <h2>General Info:</h2>
      <p>{resumeData.generalInfo.name}</p>
      <p>{resumeData.generalInfo.email}</p>

      <h2>Work Experience:</h2>
      {resumeData.workExperience.map((exp, index) => (
        <p key={index}>{exp.position} at {exp.company}</p>
      ))}
    </div>
  );
};

export default ResumePreview;
