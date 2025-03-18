import React from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/resume-review', { state: { templateId: template._id } });
  };

  return (
    <div className="template-card" onClick={handleClick}>
      <img src={template.previewImage} alt={template.name} />
      <h3>{template.name}</h3>
    </div>
  );
};

export default TemplateCard;