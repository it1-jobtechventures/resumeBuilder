import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useResume } from '../context/FormContext';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    return html
      .replace(/{{#(.*?)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
        let value = getValueByPath(data, key.trim());
  
        if (Array.isArray(value)) {
          return value
            .map(item => {
              // Handle array of strings (e.g., certifications)
              if (typeof item === "string") {
                return content.replace(/{{\.}}/g, item);
              }
              // Handle array of objects (like workExperience)
              return content.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
            })
            .join("");
        }
  
        return ""; // If the value is not an array, return empty
      })
      .replace(/{{(.*?)}}/g, (match, key) => {
        let value = getValueByPath(data, key.trim());
        return value !== undefined ? value : match;
      });
  };
  // const handleDownloadDOCX = () => {
  //   const element = document.getElementById('resume-content').innerHTML;
  //   const converted = htmlDocx.asBlob(`<!DOCTYPE html><html><body>${element}</body></html>`);
  //   saveAs(converted, 'My_Resume.docx');
  // };

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-content'); // Get resume content
  
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  
    pdf.html(element, {
      callback: function (pdf) {
        pdf.save('My_Resume.pdf');
      },
      x: 10,
      y: 10,
      width: 190, // Ensures it fits well on an A4 page
      windowWidth: element.scrollWidth, // Helps in proper rendering
    });
  };
  
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
    </div>
  );
};

export default ResumeReview;
