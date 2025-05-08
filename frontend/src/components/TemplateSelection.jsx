import React from 'react';
import TemplateCard from './TemplateCard';
import { useNavigate } from 'react-router-dom';

const TemplateSelection = ({ templates ,onTemplateSelect}) => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Choose Your Resume Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template._id} template={template} onTemplateSelect={onTemplateSelect}/>
        ))}
      </div>
      <div>
        <button onClick={() => navigate('/createResume')} className="mt-4 cursor-pointer bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]">Choose later</button>
      </div>
    </div>
  );
};

export default TemplateSelection;
