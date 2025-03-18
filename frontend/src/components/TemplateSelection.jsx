import React from 'react';
import TemplateCard from './TemplateCard';

const TemplateSelection = ({ templates }) => {
  return (
    <div className="template-selection">
      {templates.map((template) => (
        <TemplateCard key={template._id} template={template} />
      ))}
    </div>
  );
};

export default TemplateSelection;