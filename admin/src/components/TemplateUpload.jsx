import React, { useState } from 'react'

const TemplateUpload = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'html') {
        setHtmlContent(e.target.result);
      } else if (type === 'css') {
        setCssContent(e.target.result);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="pt-20">
        <h2 className="text-2xl font-bold mb-4">Upload Template</h2>
        <input type="file" accept=".html" onChange={(e) => handleFileUpload(e, 'html')} className="block mb-2" />
        <input type="file" accept=".css" onChange={(e) => handleFileUpload(e, 'css')} className="block mb-2" />
        <div className="border p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <div className="border p-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          <style>{cssContent}</style>
        </div>
      </div>
    </>
  )
}

export default TemplateUpload