import React, { useState } from 'react'
import TemplateSelection from '../components/TemplateSelection';

const TemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template); 
    console.log("Selected Template:", template);
  };
  return (
    <>
      <main>
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">Choose Your Resume Template</h1>
          <TemplateSelection onSelectTemplate={handleTemplateSelect} />
        </div>
      </main>
    </>
  )
}

export default TemplatePage