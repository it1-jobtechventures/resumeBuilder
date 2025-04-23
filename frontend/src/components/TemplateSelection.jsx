import React from 'react';
import TemplateCard from './TemplateCard';

const TemplateSelection = ({ templates }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Choose Your Resume Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template._id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
