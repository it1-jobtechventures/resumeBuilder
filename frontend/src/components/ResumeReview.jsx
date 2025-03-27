// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useResume } from '../context/FormContext';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const ResumeReview = ({url}) => {
//   const location = useLocation();
//   const { templateId } = location.state || {};
//   const [templateData, setTemplateData] = useState(null);
//   const { resumeData } = useResume();

//   useEffect(() => {
//     const fetchTemplate = async () => {
//       if (!templateId) return;

//       try {
//         const response = await fetch(`${url}/api/template/singleTemplate/${templateId}`);
//         const data = await response.json();
//         console.log(data)
//         setTemplateData(data);
//       } catch (error) {
//         console.error('Error fetching template:', error);
//       }
//     };

//     fetchTemplate();
//   }, [templateId]);

//   const getValueByPath = (obj, path) => {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
//   };
  
//   const replacePlaceholders = (html, data) => {
//     return html
//       .replace(/{{#(.*?)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
//         let value = getValueByPath(data, key.trim());
  
//         if (Array.isArray(value)) {
//           return value
//             .map(item => {
//               // Handle array of strings (e.g., certifications)
//               if (typeof item === "string") {
//                 return content.replace(/{{\.}}/g, item);
//               }
//               // Handle array of objects (like workExperience)
//               return content.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
//             })
//             .join("");
//         }
  
//         return ""; // If the value is not an array, return empty
//       })
//       .replace(/{{(.*?)}}/g, (match, key) => {
//         let value = getValueByPath(data, key.trim());
//         return value !== undefined ? value : match;
//       });
//   };
//   // const handleDownloadDOCX = () => {
//   //   const element = document.getElementById('resume-content').innerHTML;
//   //   const converted = htmlDocx.asBlob(`<!DOCTYPE html><html><body>${element}</body></html>`);
//   //   saveAs(converted, 'My_Resume.docx');
//   // };

//   const handleDownloadPDF = () => {
//     const element = document.getElementById('resume-content'); // Get resume content
  
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4',
//     });
  
//     pdf.html(element, {
//       callback: function (pdf) {
//         pdf.save('My_Resume.pdf');
//       },
//       x: 10,
//       y: 10,
//       width: 190, // Ensures it fits well on an A4 page
//       windowWidth: element.scrollWidth, // Helps in proper rendering
//     });
//   };
  
//   const handleDownloadPNG = () => {
//     const element = document.getElementById('resume-content');
  
//     html2canvas(element, { scale: 2 }).then(canvas => {
//       canvas.toBlob(blob => {
//         saveAs(blob, 'My_Resume.png');
//       });
//     });
//   };

  
//   if (!templateId) return <h2>No template selected!</h2>;
//   if (!templateData) return <h2>Loading template...</h2>;

//   const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);

//   return (
//     <div>
//       <h1>{templateData.name}</h1>
//       <div id="resume-content" dangerouslySetInnerHTML={{ __html: finalHTML }} />
//       <style>{templateData.cssContent}</style>
//       <button onClick={handleDownloadPDF}>Download as PDF</button>
//       <button onClick={handleDownloadPNG}>Download as PNG</button>
//     </div>
//   );
// };

// export default ResumeReview;


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useResume } from '../context/FormContext';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const ResumeReview = () => {
//   const location = useLocation();
//   const { templateId } = location.state || {};
//   const [templateData, setTemplateData] = useState(null);
//   const { resumeData } = useResume();

//   // Customization State
//   const [fontSize, setFontSize] = useState('16px');
//   const [fontFamily, setFontFamily] = useState('Arial');
//   const [textColor, setTextColor] = useState('#000000');
//   const [bgColor, setBgColor] = useState('#ffffff');

//   useEffect(() => {
//     const fetchTemplate = async () => {
//       if (!templateId) return;

//       try {
//         const response = await fetch(`http://localhost:5000/api/template/singleTemplate/${templateId}`);
//         const data = await response.json();
//         setTemplateData(data);
//       } catch (error) {
//         console.error('Error fetching template:', error);
//       }
//     };

//     fetchTemplate();
//   }, [templateId]);

//   const getValueByPath = (obj, path) => {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
//   };

//   const replacePlaceholders = (html, data) => {
//     return html
//       .replace(/{{#(.*?)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
//         let value = getValueByPath(data, key.trim());

//         if (Array.isArray(value)) {
//           return value
//             .map(item => {
//               if (typeof item === "string") {
//                 return content.replace(/{{\.}}/g, item);
//               }
//               return content.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
//             })
//             .join("");
//         }

//         return "";
//       })
//       .replace(/{{(.*?)}}/g, (match, key) => {
//         let value = getValueByPath(data, key.trim());
//         return value !== undefined ? value : match;
//       });
//   };

//   const applyStyleToSelectedText = (styleProperty, value) => {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return;

//     const range = selection.getRangeAt(0);
//     const span = document.createElement('span');

//     span.style[styleProperty] = value;
//     range.surroundContents(span);
//   };

//   const handleDownloadPDF = () => {
//     const element = document.getElementById('resume-content');
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4',
//     });

//     pdf.html(element, {
//       callback: function (pdf) {
//         pdf.save('My_Resume.pdf');
//       },
//       x: 10,
//       y: 10,
//       width: 190,
//       windowWidth: element.scrollWidth,
//     });
//   };

//   const handleDownloadPNG = () => {
//     const element = document.getElementById('resume-content');

//     html2canvas(element, { scale: 2 }).then(canvas => {
//       canvas.toBlob(blob => {
//         saveAs(blob, 'My_Resume.png');
//       });
//     });
//   };

//   if (!templateId) return <h2>No template selected!</h2>;
//   if (!templateData) return <h2>Loading template...</h2>;

//   const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);

//   return (
//     <div>
//       <h1>{templateData.name}</h1>
//       {/* Customization Panel */}
//       <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//         <label>
//           Font Size:
//           <select value={fontSize} onChange={(e) => applyStyleToSelectedText('fontSize', e.target.value)}>
//             <option value="12px">12px</option>
//             <option value="14px">14px</option>
//             <option value="16px">16px</option>
//             <option value="18px">18px</option>
//             <option value="20px">20px</option>
//             <option value="22px">22px</option>
//             <option value="24px">24px</option>
//             <option value="26px">26px</option>
//             <option value="28px">28px</option>
//             <option value="30px">30px</option>
//           </select>
//         </label>
//         <label>
//           Font Family:
//           <select value={fontFamily}  onChange={(e) => applyStyleToSelectedText('fontFamily', e.target.value)}>
//             <option value="Arial">Arial</option>
//             <option value="Times New Roman">Times New Roman</option>
//             <option value="Verdana">Verdana</option>
//             <option value="Georgia">Georgia</option>
//             <option value="Courier New">Courier New</option>
//             <option value="Roboto">Roboto</option>
//             <option value="Helvetica">Helvetica</option>
//             <option value="Tahoma">Tahoma</option>
//             <option value="Impact">Impact</option>
//             <option value="Comic Sans MS">Comic Sans MS</option>
//             <option value="Lobster">Lobster</option>
//             <option value="Open Sans">Open Sans</option>
//             <option value="Montserrat">Montserrat</option>
//           </select>
//         </label>
//         <label>
//           Text Color:
//           <input type="color" value={textColor} onChange={(e) => applyStyleToSelectedText('color',e.target.value)} />
//         </label>
//         <label>
//           Background Color:
//           <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
//         </label>
//       </div>
//       {/* Resume Preview */}
//       <div id="resume-content"style={{fontSize: fontSize,fontFamily: fontFamily,color: textColor,backgroundColor: bgColor,padding: '20px',}}dangerouslySetInnerHTML={{ __html: finalHTML }}/>
//       <style>{templateData.cssContent}</style>
//       <button onClick={handleDownloadPDF}>Download as PDF</button>
//       <button onClick={handleDownloadPNG}>Download as PNG</button>
//     </div>
//   );
// };

// export default ResumeReview;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResume } from '../context/FormContext';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AppContext } from '../context/AppContext';

const ResumeReview = ({url}) => {
  const location = useLocation();
  const { templateId } = location.state || {};
  const [templateData, setTemplateData] = useState(null);
  const { resumeData } = useResume();
  const {isLoggedIn} = useContext(AppContext)

  // Customization State
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '16px');
  const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'Arial');
  const [textColor, setTextColor] = useState(localStorage.getItem('textColor') || '#000000');
  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '#ffffff');

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) return;

      try {
        const response = await fetch(`${url}/api/template/singleTemplate/${templateId}`);
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
              if (typeof item === "string") {
                return content.replace(/{{\.}}/g, item);
              }
              return content.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
            })
            .join("");
        }

        return "";
      })
      .replace(/{{(.*?)}}/g, (match, key) => {
        let value = getValueByPath(data, key.trim());
        return value !== undefined ? value : match;
      });
  };

  const applyStyleToSelectedText = (styleProperty, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');

    span.style[styleProperty] = value;
    range.surroundContents(span);

    localStorage.setItem(styleProperty, value);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-content');
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
      width: 190,
      windowWidth: element.scrollWidth,
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

  const resetStyles = () => {
    setFontSize('16px');
    setFontFamily('Arial');
    setTextColor('#000000');
    setBgColor('#ffffff');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('fontFamily');
    localStorage.removeItem('textColor');
    localStorage.removeItem('bgColor');
    document.getElementById('resume-content').innerHTML = finalHTML;
  };

  if (!templateId) return <h2>No template selected!</h2>;
  if (!templateData) return <h2>Loading template...</h2>;

  const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);

  return (
    <div>
      <h1>{templateData.name}</h1>
      {/* Customization Panel */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <label>
          Font Size:
          <select value={fontSize} onChange={(e) => applyStyleToSelectedText('fontSize', e.target.value)}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="22px">22px</option>
          </select>
        </label>
        <label>
          Font Family:
          <select value={fontFamily}  onChange={(e) => applyStyleToSelectedText('fontFamily', e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>
        </label>
        <label>
          Text Color:
          <input type="color" value={textColor} onChange={(e) => applyStyleToSelectedText('color', e.target.value)} />
        </label>
        <label>
          Background Color:
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </label>
        <button onClick={resetStyles}>Reset Styles</button>
      </div>
      {/* Resume Preview */}
      <div id="resume-content" contentEditable={true} style={{fontSize: fontSize,fontFamily: fontFamily,color: textColor,backgroundColor: bgColor,padding: '20px',}}dangerouslySetInnerHTML={{ __html: finalHTML }}/>
      <style>{templateData.cssContent}</style>
      {
        !isLoggedIn ? (
          <p>Login to download <Link to={'/login'}><button>Login</button></Link></p>
        ) : (
          <>          
            <button onClick={handleDownloadPDF}>Download as PDF</button>
            <button onClick={handleDownloadPNG}>Download as PNG</button>
          </>
        )
      }
    </div>
  );
};

export default ResumeReview;
