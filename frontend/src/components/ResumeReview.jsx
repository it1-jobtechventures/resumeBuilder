import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useResume } from '../context/FormContext';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const ResumeReview = () => {
  const location = useLocation();
  const { templateId } = location.state || {};
  const [templateData, setTemplateData] = useState(null);
  const { resumeData } = useResume();

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/template/singleTemplate/${templateId}`);
        const data = await response.json();
        setTemplateData(data);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };
  
  const replacePlaceholders = (html, data) => {
    return html.replace(/{{(.*?)}}/g, (match, key) => {
      const value = getValueByPath(data, key.trim());
      return value !== undefined ? value : match;
    });
  };
  

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-content');
    const opt = {
      margin: 0.5,
      filename: 'My_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  // const handleDownloadDOCX = () => {
  //   const element = document.getElementById('resume-content').innerHTML;
  //   const converted = htmlDocx.asBlob(`<!DOCTYPE html><html><body>${element}</body></html>`);
  //   saveAs(converted, 'My_Resume.docx');
  // };

  const handleDownloadPNG = () => {
    const element = document.getElementById('resume-content');
  
    html2canvas(element, { scale: 2 }).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, 'My_Resume.png');
      });
    });
  };
  
  if (!templateId) return <h2>No template selected!</h2>;
  if (!templateData) return <h2>Loading template...</h2>;

  const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);

  return (
    <div>
      <h1>{templateData.name}</h1>
      <div id="resume-content" dangerouslySetInnerHTML={{ __html: finalHTML }} />
      <style>{templateData.cssContent}</style>
      <button onClick={handleDownloadPDF}>Download as PDF</button>
      <button onClick={handleDownloadPNG}>Download as PNG</button>
      {/* <button onClick={handleDownloadDOCX}>Download as DOCX</button> */}
    </div>
  );
};

export default ResumeReview;
