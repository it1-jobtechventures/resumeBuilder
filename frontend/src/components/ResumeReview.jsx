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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useResume } from '../context/FormContext';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AppContext } from '../context/AppContext';

const ResumeReview = ({url}) => {
  const location = useLocation();
  // const { templateId } = location.state || {};
  const [templateData, setTemplateData] = useState(null);
  const { resumeData } = useResume();
  const {isLoggedIn} = useContext(AppContext)
  const navigate = useNavigate()
  const [templateId, setTemplateId] = useState(location.state?.templateId || localStorage.getItem("selectedTemplateId"));


    //to render the same pageif user login from resume review page 
    const hangleLoginRedirect = () => {
      if (templateId) {
        localStorage.setItem("selectedTemplateId" , templateId)// Store templateId
      }
      navigate('/login' , {state:{from :location.pathname}})
    }
    


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

 

  

// };
const replacePlaceholders = (html, data) => {
  return html
      .replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
          let value = getValueByPath(data, key.trim());

          if (Array.isArray(value) && value.length > 0) {
              return value
                  .map(item => {
                      if (typeof item === "string") {
                          return content.replace(/{{.}}/g, item); // Handle arrays of strings
                      }

                      let updatedContent = content;

                      // Replace nested placeholders for objects
                      updatedContent = updatedContent.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (subMatch, subKey, subContent) => {
                          let nestedValue = item[subKey.trim()];
                          if (Array.isArray(nestedValue) && nestedValue.length > 0) {
                              return nestedValue.map(nestedItem =>
                                  subContent.replace(/{{(.*?)}}/g, (m, k) => nestedItem[k.trim()] || "")
                              ).join("");
                          }
                          return "";
                      });

                      // Replace object placeholders
                      return updatedContent.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
                  })
                  .join(""); 
          }

          return ""; // Remove empty placeholders
      })
      .replace(/{{(.*?)}}/g, (match, key) => getValueByPath(data, key.trim()) || "");
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

  useEffect(() => {
    let storedTemplateId =  localStorage.getItem("selectedTemplateId")
    if (!templateId && storedTemplateId) {
      setTemplateId(storedTemplateId);
    }
  }, [templateId])

  if (!templateId) return <h2>No template selected!</h2>;
  if (!templateData) return <h2>Loading template...</h2>;

  const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);

  return (
    <div>
      <h1 className='text-center text-2xl font-bold' style={{textTransform:'capitalize'}}>{templateData.name}</h1>
      {/* Customization Panel */}
      <div className='flex flex-col md:flex-row gap-5'>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }} className='flex flex-col gap-24 mb-5 bg-[#f4f4f4] 2 w-72'>
        <label>
          Font Size:
          <select value={fontSize} onChange={(e) => applyStyleToSelectedText('fontSize', e.target.value)} className='p-2 text-sm  pl-1'>
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
            <option value="Tahoma">Tahoma</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
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
        <button onClick={resetStyles} className='bg-green-400 text-black mt-10 w-30 text-center rounded-md p-1'>Reset Styles</button>
      </div>
            {/* Resume Preview */}
            <div className='flex-1' id="resume-content" contentEditable={true} style={{fontSize: fontSize,fontFamily: fontFamily,color: textColor,backgroundColor: bgColor,padding: '20px',}}dangerouslySetInnerHTML={{ __html: finalHTML }}/>
      <style>{templateData.cssContent}</style>
      
      </div>

      {
        !isLoggedIn ? (
          <button  onClick={hangleLoginRedirect} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]"'> Login to download </button>
        ) : (
          <div className='flex justify-between'>
            <div className='flex gap-5  '>
              <button onClick={handleDownloadPDF} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white p-2 rounded-md'>Download as PDF</button>
              <button onClick={handleDownloadPNG} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white p-2 rounded-md'>Download as PNG</button>
            </div>
            <div>
              <Link to={'/createResume'}><button  className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] p-2 text-white rounded-md'>Edit Form</button></Link>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ResumeReview;




//////main

//   const replacePlaceholders = (html, data) => {
//     return html
//         .replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
//             let value = getValueByPath(data, key.trim());

//             if (Array.isArray(value) && value.length > 0) {
//                 return value
//                     .map(item => {
//                         let updatedContent = content;

//                         // Replace nested placeholders within this section
//                         updatedContent = updatedContent.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (subMatch, subKey, subContent) => {
//                             let nestedValue = item[subKey.trim()];
//                             if (Array.isArray(nestedValue) && nestedValue.length > 0) {
//                                 return nestedValue.map(nestedItem =>
//                                     subContent.replace(/{{(.*?)}}/g, (m, k) => nestedItem[k.trim()] || "")
//                                 ).join("");
//                             }
//                             return "";
//                         });

//                         // Replace simple placeholders
//                         return updatedContent.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
//                     })
//                     .join(""); 
//             }

//             return ""; // Remove empty placeholders
//         })
//         .replace(/{{(.*?)}}/g, (match, key) => getValueByPath(data, key.trim()) || "");








//  const replacePlaceholders = (html, data) => {
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

  // const replacePlaceholders = (html, data) => {
  //   return html
  //     .replace(/{{#(.*?)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
  //       let value = getValueByPath(data, key.trim());
  
  //       if (Array.isArray(value) && value.length > 0) {
  //         return value
  //           .map(item => {
  //             if (typeof item === "string") {
  //               return content.replace(/{{\.}}/g, item);
  //             }
  //             return content.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
  //           })
  //           .join("");
  //       }
  
  //       return ""; // Remove the entire block if data is empty
  //     })
  //     .replace(/{{(.*?)}}/g, (match, key) => {
  //       let value = getValueByPath(data, key.trim());
  //       return value !== undefined && value !== "" ? value : ""; // Remove empty placeholders
  //     })
  //     .replace(/\s*<[^\/>]+>\s*<\/[^>]+>\s*/g, ''); // Remove empty HTML tags after replacing placeholders
  // };

    // //to render the same pageif user login from resume review page 
  // const hangleLoginRedirect = () => {
  //   navigate('/login' , {state:{from :location.pathname}})
  // }
