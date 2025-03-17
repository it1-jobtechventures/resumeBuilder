// import React from 'react'
// import templatesData from '../assets/templateData'
// import TemplateCard from './TemplateCard'
// import { useNavigate, useLocation } from "react-router-dom";

// const TemplateSelection = ({onSelectTemplate}) => {
//     const navigate =  useNavigate();
//     const location = useLocation();
//     const formData= location.state?.formData || {} ;

//     const handleTemplateSelect = (template) => {
//         navigate('/resume-review' , {state: {selectedTemplate : template ,formData}});
//     }
//   return (
//     <>
//         <main>
//             <div className="p-6">
//                 <h2 className="text-2xl font-bold text-center mb-6">Select a Resume Template</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {
//                         templatesData.map((template) => (
//                             <TemplateCard key={template.id} template={template} onSelect={() => handleTemplateSelect(template)} />
//                         ))
//                     }
//                 </div>
//             </div>
//         </main>
//     </>
//   )
// }

// export default TemplateSelection

import React, { useEffect, useState } from 'react'

import TemplateCard from './TemplateCard'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'

const TemplateSelection = ({onSelectTemplate}) => {
    const [templates, setTemplates] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state?.formData || {};

      // Fetch templates from backend
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/template/allTemplate');
        console.log(response.data)
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = (template) => {
    navigate('/resume-review', { state: { selectedTemplate: template, formData } });
 console.log('formdata' , formData)  
};

  return (
    <>
      <main>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Select a Resume Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template._id} template={template} onSelect={() => handleTemplateSelect(template)} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default TemplateSelection