import React from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/resume-review', { state: { templateId: template._id } });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={template.previewImage} alt={template.name} className="w-full h-60 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700 text-center">{template.name}</h3>
      </div>
    </div>
  );
};

export default TemplateCard;
