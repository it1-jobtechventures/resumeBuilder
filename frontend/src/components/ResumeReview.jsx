// // // import React, { useEffect, useState } from 'react';
// // // import { useLocation } from 'react-router-dom';
// // // import { useResume } from '../context/FormContext';
// // // import { saveAs } from 'file-saver';
// // // import html2canvas from 'html2canvas';
// // // import jsPDF from 'jspdf';

// // // const ResumeReview = ({url}) => {
// // //   const location = useLocation();
// // //   const { templateId } = location.state || {};
// // //   const [templateData, setTemplateData] = useState(null);
// // //   const { resumeData } = useResume();

// // //   useEffect(() => {
// // //     const fetchTemplate = async () => {
// // //       if (!templateId) return;

// // //       try {
// // //         const response = await fetch(`${url}/api/template/singleTemplate/${templateId}`);
// // //         const data = await response.json();
// // //         console.log(data)
// // //         setTemplateData(data);
// // //       } catch (error) {
// // //         console.error('Error fetching template:', error);
// // //       }
// // //     };

// // //     fetchTemplate();
// // //   }, [templateId]);

// // //   const getValueByPath = (obj, path) => {
// // //     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
// // //   };
  
// // //   const replacePlaceholders = (html, data) => {
// // //     return html
// // //       .replace(/{{#(.*?)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
// // //         let value = getValueByPath(data, key.trim());
  
// // //         if (Array.isArray(value)) {
// // //           return value
// // //             .map(item => {
// // //               // Handle array of strings (e.g., certifications)
// // //               if (typeof item === "string") {
// // //                 return content.replace(/{{\.}}/g, item);
// // //               }
// // //               // Handle array of objects (like workExperience)
// // //               return content.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
// // //             })
// // //             .join("");
// // //         }
  
// // //         return ""; // If the value is not an array, return empty
// // //       })
// // //       .replace(/{{(.*?)}}/g, (match, key) => {
// // //         let value = getValueByPath(data, key.trim());
// // //         return value !== undefined ? value : match;
// // //       });
// // //   };
// // //   // const handleDownloadDOCX = () => {
// // //   //   const element = document.getElementById('resume-content').innerHTML;
// // //   //   const converted = htmlDocx.asBlob(`<!DOCTYPE html><html><body>${element}</body></html>`);
// // //   //   saveAs(converted, 'My_Resume.docx');
// // //   // };

// // //   const handleDownloadPDF = () => {
// // //     const element = document.getElementById('resume-content'); // Get resume content
  
// // //     const pdf = new jsPDF({
// // //       orientation: 'portrait',
// // //       unit: 'mm',
// // //       format: 'a4',
// // //     });
  
// // //     pdf.html(element, {
// // //       callback: function (pdf) {
// // //         pdf.save('My_Resume.pdf');
// // //       },
// // //       x: 10,
// // //       y: 10,
// // //       width: 190, // Ensures it fits well on an A4 page
// // //       windowWidth: element.scrollWidth, // Helps in proper rendering
// // //     });
// // //   };
  
// // //   const handleDownloadPNG = () => {
// // //     const element = document.getElementById('resume-content');
  
// // //     html2canvas(element, { scale: 2 }).then(canvas => {
// // //       canvas.toBlob(blob => {
// // //         saveAs(blob, 'My_Resume.png');
// // //       });
// // //     });
// // //   };

  
// // //   if (!templateId) return <h2>No template selected!</h2>;
// // //   if (!templateData) return <h2>Loading template...</h2>;

// // //   const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);

// // //   return (
// // //     <div>
// // //       <h1>{templateData.name}</h1>
// // //       <div id="resume-content" dangerouslySetInnerHTML={{ __html: finalHTML }} />
// // //       <style>{templateData.cssContent}</style>
// // //       <button onClick={handleDownloadPDF}>Download as PDF</button>
// // //       <button onClick={handleDownloadPNG}>Download as PNG</button>
// // //     </div>
// // //   );
// // // };

// // // export default ResumeReview;

// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useResume } from '../context/FormContext';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { AppContext } from '../context/AppContext';

// const ResumeReview = ({url}) => {
//   const location = useLocation();
//   // const { templateId } = location.state || {};
//   const [templateData, setTemplateData] = useState(null);
//   const { resumeData } = useResume();
//   const {isLoggedIn} = useContext(AppContext)
//   const navigate = useNavigate()
//   const [templateId, setTemplateId] = useState(location.state?.templateId || localStorage.getItem("selectedTemplateId"));


//     //to render the same pageif user login from resume review page 
//     const hangleLoginRedirect = () => {
//       if (templateId) {
//         localStorage.setItem("selectedTemplateId" , templateId)// Store templateId
//       }
//       navigate('/login' , {state:{from :location.pathname}})
//     }
    


//   // Customization State
//   const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '16px');
//   const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'Arial');
//   const [textColor, setTextColor] = useState(localStorage.getItem('textColor') || '#000000');
//   const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '#ffffff');

//   useEffect(() => {
//     const fetchTemplate = async () => {
//       if (!templateId) return;

//       try {
//         const response = await fetch(`${url}/api/template/singleTemplate/${templateId}`);
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

 

  


// const replacePlaceholders = (html, data) => {
//   return html
//       .replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
//           let value = getValueByPath(data, key.trim());

//           if (Array.isArray(value) && value.length > 0) {
//               return value
//                   .map(item => {
//                       if (typeof item === "string") {
//                           return content.replace(/{{.}}/g, item); // Handle arrays of strings
//                       }

//                       let updatedContent = content;

//                       // Replace nested placeholders for objects
//                       updatedContent = updatedContent.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (subMatch, subKey, subContent) => {
//                           let nestedValue = item[subKey.trim()];
//                           if (Array.isArray(nestedValue) && nestedValue.length > 0) {
//                               return nestedValue.map(nestedItem =>
//                                   subContent.replace(/{{(.*?)}}/g, (m, k) => nestedItem[k.trim()] || "")
//                               ).join("");
//                           }
//                           return "";
//                       });

//                       // Replace object placeholders
//                       return updatedContent.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
//                   })
//                   .join(""); 
//           }

//           return ""; // Remove empty placeholders
//       })
//       .replace(/{{(.*?)}}/g, (match, key) => getValueByPath(data, key.trim()) || "");
// };

// // const replacePlaceholders = (html, data) => {
// //   // 1. Handle sections like {{#key}}...{{/key}}
// //   html = html.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
// //       let value = getValueByPath(data, key.trim()); // Get the value for the section

// //       // If the value is an array and not empty, process each item
// //       if (Array.isArray(value) && value.length > 0) {
// //           return value
// //               .map(item => {
// //                   // Process each item inside the section (replace inner placeholders)
// //                   let updatedContent = content.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || ""); 
// //                   return updatedContent;
// //               })
// //               .join("");  // Join the items together for the array section
// //       }

// //       // If the value is not an array or empty, remove the section
// //       return "";
// //   });

// //   // 2. Handle individual placeholders like {{key}}
// //   html = html.replace(/{{(.*?)}}/g, (match, key) => {
// //       let value = getValueByPath(data, key.trim());

// //       // If the value is undefined or null, return an empty string
// //       // If it's src and empty, replace with a default image URL
// //       if (key === "src" && (value === undefined || value === null || value === "")) {
// //           return "path/to/default-image.jpg";  // Replace with your default image URL
// //       }

// //       // Return value or empty string if no value exists
// //       return value !== undefined && value !== null && value !== "" ? value : "";
// //   });

// //   // 3. Clean up any empty placeholders or tags that remain
// //   // Remove empty or unfilled elements or sections
// //   html = html.replace(/(<.*?>\s*)*{{.*?}}(\s*<.*?>)*/g, "");

// //   return html;
// // };




//   const applyStyleToSelectedText = (styleProperty, value) => {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return;

//     const range = selection.getRangeAt(0);
//     const span = document.createElement('span');

//     span.style[styleProperty] = value;
//     range.surroundContents(span);

//     localStorage.setItem(styleProperty, value);
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

//   const resetStyles = () => {
//     setFontSize('16px');
//     setFontFamily('Arial');
//     setTextColor('#000000');
//     setBgColor('#ffffff');
//     localStorage.removeItem('fontSize');
//     localStorage.removeItem('fontFamily');
//     localStorage.removeItem('textColor');
//     localStorage.removeItem('bgColor');
//     document.getElementById('resume-content').innerHTML = finalHTML;
//   };

//   useEffect(() => {
//     let storedTemplateId =  localStorage.getItem("selectedTemplateId")
//     if (!templateId && storedTemplateId) {
//       setTemplateId(storedTemplateId);
//     }
//   }, [templateId])

//   if (!templateId) return <h2>No template selected!</h2>;
//   if (!templateData) return <h2>Loading template...</h2>;

//   const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);
//  ;
  
//   return (
//     <div>
//       <h1 className='text-center text-2xl font-bold' style={{textTransform:'capitalize'}}>{templateData.name}</h1>
//       {/* Customization Panel */}
//       <div className='flex flex-col md:flex-row gap-5'>
//       <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }} className='flex flex-col gap-24 mb-5 bg-[#f4f4f4] 2 w-72'>
//         <label>
//           Font Size:
//           <select value={fontSize} onChange={(e) => applyStyleToSelectedText('fontSize', e.target.value)} className='p-2 text-sm  pl-1'>
//             <option value="12px">12px</option>
//             <option value="14px">14px</option>
//             <option value="16px">16px</option>
//             <option value="18px">18px</option>
//             <option value="20px">20px</option>
//             <option value="22px">22px</option>
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
//             <option value="Tahoma">Tahoma</option>
//             <option value="Helvetica">Helvetica</option>
//             <option value="Comic Sans MS">Comic Sans MS</option>
//           </select>
//         </label>
//         <label>
//           Text Color:
//           <input type="color" value={textColor} onChange={(e) => applyStyleToSelectedText('color', e.target.value)} />
//         </label>
//         <label>
//           Background Color:
//           <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
//         </label>
//         <button onClick={resetStyles} className='bg-green-400 text-black mt-10 w-30 text-center rounded-md p-1'>Reset Styles</button>
//       </div>
//             Resume Preview
//             <div className='flex-1' id="resume-content" contentEditable={true} style={{fontSize: fontSize,fontFamily: fontFamily,color: textColor,backgroundColor: bgColor,padding: '20px',}}dangerouslySetInnerHTML={{ __html: finalHTML }}/>
//       <style>{templateData.cssContent}</style>


//       </div>

//       {
//         !isLoggedIn ? (
//           <button  onClick={hangleLoginRedirect} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]"'> Login to download </button>
//         ) : (
//           <div className='flex justify-between'>
//             <div className='flex gap-5  '>
//               <button onClick={handleDownloadPDF} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white p-2 rounded-md'>Download as PDF</button>
//               <button onClick={handleDownloadPNG} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white p-2 rounded-md'>Download as PNG</button>
//             </div>
//             <div>
//               <Link to={'/createResume'}><button  className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] p-2 text-white rounded-md'>Edit Form</button></Link>
//             </div>
//           </div>
//         )
//       }
//     </div>
//   );
// };

// export default ResumeReview;

// // import React, { useContext, useEffect, useState } from 'react';
// // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import { useResume } from '../context/FormContext';
// // import { saveAs } from 'file-saver';
// // import html2canvas from 'html2canvas';
// // import jsPDF from 'jspdf';
// // import { AppContext } from '../context/AppContext';

// // const ResumeReview = ({url}) => {
// //   const location = useLocation();
// //   // const { templateId } = location.state || {};
// //   const [templateData, setTemplateData] = useState(null);
// //   const { resumeData } = useResume();
// //   const {isLoggedIn} = useContext(AppContext)
// //   const navigate = useNavigate()
// //   const [templateId, setTemplateId] = useState(location.state?.templateId || localStorage.getItem("selectedTemplateId"));


// //     //to render the same pageif user login from resume review page 
// //     const hangleLoginRedirect = () => {
// //       if (templateId) {
// //         localStorage.setItem("selectedTemplateId" , templateId)// Store templateId
// //       }
// //       navigate('/login' , {state:{from :location.pathname}})
// //     }
    



// //   useEffect(() => {
// //     const fetchTemplate = async () => {
// //       if (!templateId) return;

// //       try {
// //         const response = await fetch(`${url}/api/template/singleTemplate/${templateId}`);
// //         const data = await response.json();
// //         setTemplateData(data);
// //       } catch (error) {
// //         console.error('Error fetching template:', error);
// //       }
// //     };

// //     fetchTemplate();
// //   }, [templateId]);

// //   const getValueByPath = (obj, path) => {
// //     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
// //   };

 

  


// // const replacePlaceholders = (html, data) => {
// //   return html
// //       .replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
// //           let value = getValueByPath(data, key.trim());

// //           if (Array.isArray(value) && value.length > 0) {
// //               return value
// //                   .map(item => {
// //                       if (typeof item === "string") {
// //                           return content.replace(/{{.}}/g, item); // Handle arrays of strings
// //                       }

// //                       let updatedContent = content;

// //                       // Replace nested placeholders for objects
// //                       updatedContent = updatedContent.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (subMatch, subKey, subContent) => {
// //                           let nestedValue = item[subKey.trim()];
// //                           if (Array.isArray(nestedValue) && nestedValue.length > 0) {
// //                               return nestedValue.map(nestedItem =>
// //                                   subContent.replace(/{{(.*?)}}/g, (m, k) => nestedItem[k.trim()] || "")
// //                               ).join("");
// //                           }
// //                           return "";
// //                       });

// //                       // Replace object placeholders
// //                       return updatedContent.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
// //                   })
// //                   .join(""); 
// //           }

// //           return ""; // Remove empty placeholders
// //       })
// //       .replace(/{{(.*?)}}/g, (match, key) => getValueByPath(data, key.trim()) || "");
// // };










// //   const handleDownloadPDF = () => {
// //     const element = document.getElementById('resume-content');
// //     const pdf = new jsPDF({
// //       orientation: 'portrait',
// //       unit: 'mm',
// //       format: 'a4',
// //     });

// //     pdf.html(element, {
// //       callback: function (pdf) {
// //         pdf.save('My_Resume.pdf');
// //       },
// //       x: 10,
// //       y: 10,
// //       width: 190,
// //       windowWidth: element.scrollWidth,
// //     });
// //   };

// //   const handleDownloadPNG = () => {
// //     const element = document.getElementById('resume-content');

// //     html2canvas(element, { scale: 2 }).then(canvas => {
// //       canvas.toBlob(blob => {
// //         saveAs(blob, 'My_Resume.png');
// //       });
// //     });
// //   };

// //   useEffect(() => {
// //     let storedTemplateId =  localStorage.getItem("selectedTemplateId")
// //     if (!templateId && storedTemplateId) {
// //       setTemplateId(storedTemplateId);
// //     }
// //   }, [templateId])

// //   if (!templateId) return <h2>No template selected!</h2>;
// //   if (!templateData) return <h2>Loading template...</h2>;

// //   const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);
// //  ;
  
// //   return (
// //     <div>
// //       <h1 className='text-center text-2xl font-bold' style={{textTransform:'capitalize'}}>{templateData.name}</h1>
// //       {/* Customization Panel */}
// //       <div className='flex flex-col md:flex-row gap-5'>

// //             <div className='flex-1' id="resume-content" contentEditable={true} dangerouslySetInnerHTML={{ __html: finalHTML }}/>
// //       <style>{templateData.cssContent}</style>


// //       </div>

// //       {
// //         !isLoggedIn ? (
// //           <button  onClick={hangleLoginRedirect} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[linear-gradient(90deg,_hsla(205,_97%,_42%,_1)_0%,_hsla(133,_68%,_60%,_1)_100%)]"'> Login to download </button>
// //         ) : (
// //           <div className='flex justify-between'>
// //             <div className='flex gap-5  '>
// //               <button onClick={handleDownloadPDF} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white p-2 rounded-md'>Download as PDF</button>
// //               <button onClick={handleDownloadPNG} className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] text-white p-2 rounded-md'>Download as PNG</button>
// //             </div>
// //             <div>
// //               <Link to={'/createResume'}><button  className='bg-[linear-gradient(90deg,_hsla(133,_68%,_60%,_1)_0%,_hsla(205,_97%,_42%,_1)_100%)] p-2 text-white rounded-md'>Edit Form</button></Link>
// //             </div>
// //           </div>
// //         )
// //       }
// //     </div>
// //   );
// // };

// // export default ResumeReview;


import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AppContext } from '../context/AppContext';
import { useResume } from '../context/FormContext';

const ResumeReview = ({ url }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const { resumeData } = useResume();

  const [templateData, setTemplateData] = useState(null);
  const [templateId, setTemplateId] = useState(location.state?.templateId || localStorage.getItem("selectedTemplateId"));

  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '16px');
  const [fontFamily, setFontFamily] = useState(localStorage.getItem('fontFamily') || 'Arial');
  const [textColor, setTextColor] = useState(localStorage.getItem('textColor') || '#000000');
  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '#ffffff');

  // ✅ Utility - Get nested value from path
  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // ✅ Utility - Replace placeholders in HTML
  const replacePlaceholders = (html, data) => {
    return html
      .replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
        let value = getValueByPath(data, key.trim());

        if (Array.isArray(value) && value.length > 0) {
          return value
            .map(item => {
              if (typeof item === "string") {
                return content.replace(/{{.}}/g, item);
              }

              let updatedContent = content;

              updatedContent = updatedContent.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (subMatch, subKey, subContent) => {
                let nestedValue = item[subKey.trim()];
                if (Array.isArray(nestedValue) && nestedValue.length > 0) {
                  return nestedValue.map(nestedItem =>
                    subContent.replace(/{{(.*?)}}/g, (m, k) => nestedItem[k.trim()] || "")
                  ).join("");
                }
                return "";
              });

              return updatedContent.replace(/{{(.*?)}}/g, (m, k) => item[k.trim()] || "");
            })
            .join("");
        }

        return "";
      })
      .replace(/{{(.*?)}}/g, (match, key) => getValueByPath(data, key.trim()) || "");
  };

  // ✅ Utility - Store resume data in localStorage (for older templates)
  const setLocalStorageFromResume = (resumeData) => {
    const sections = [
      'generalInfo', 'socialLinks', 'certifications', 'interests',
      'softwareInfo', 'accomplishments', 'volunteering',
      'languages', 'skills', 'projects', 'workExperience',
      'education', 'internshipExperience'
    ];

    const dataObject = {}; // Wrap sections in an object
    sections.forEach(section => {
      if (resumeData[section]) {
        dataObject[section] = resumeData[section];
      }
    });

    // Store the entire object in localStorage under a single key
    localStorage.setItem('resumeSections', JSON.stringify(dataObject));
  };

  useEffect(() => {
    if (resumeData) {
      setLocalStorageFromResume(resumeData);
    }
  }, [resumeData]);

  useEffect(() => {
    if (!templateId) return;

    const fetchTemplate = async () => {
      try {
        const res = await fetch(`${url}/api/template/singleTemplate/${templateId}`);
        const data = await res.json();
        setTemplateData(data);
      } catch (err) {
        console.error('Error loading template', err);
      }
    };

    fetchTemplate();
  }, [templateId]);

  useEffect(() => {
    if (templateData?.jsContent) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.text = `(function() { ${templateData.jsContent} })();`;  // Wrapping in an IIFE
      document.getElementById("resume-content")?.appendChild(script);
    }
  }, [templateData]);
  

  const applyStyleToSelectedText = (property, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;  // No selection available, exit early
    const range = selection.getRangeAt(0);
    if (!range.collapsed) {  // Ensure the range is not collapsed (i.e., there's text to style)
      const span = document.createElement('span');
      span.style[property] = value;
      range.surroundContents(span);
      localStorage.setItem(property, value);
    }
  };
  

  // const handleDownloadPDF = () => {
  //   const element = document.getElementById('resume-content');
  //   const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  //   pdf.html(element, {
  //     callback: (doc) => doc.save('My_Resume.pdf'),
  //     x: 0,
  //     y: 0,
  //     width: 210,
  //     windowWidth: element.scrollWidth,
  //   });
  // };

  const handleDownloadPNG = () => {
    const element = document.getElementById('resume-content');
    html2canvas(element, { scale: 2 }).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, 'My_Resume.png');
      });
    });
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
      x: 0,
      y: 0,
      html2canvas: {
        scale: 2,          // Better quality
        useCORS: true,     // Allow external images/fonts
        scrollY: 0         // Prevent vertical scroll issues
      },
      margin: [0, 0, 0, 0], // <-- Explicitly remove all margins
      autoPaging: 'text',   // Handle page breaks better (optional)
      width: 210,           // A4 width in mm
      windowWidth: element.scrollWidth
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

  const handleLoginRedirect = () => {
    if (templateId) {
      localStorage.setItem("selectedTemplateId", templateId);
    }
    navigate('/login', { state: { from: location.pathname } });
  };

  if (!templateId) return <h2>No template selected!</h2>;
  if (!templateData) return <h2>Loading template...</h2>;

  const finalHTML = replacePlaceholders(templateData.htmlContent, resumeData);

  return (
    <div className="p-4">
      <h1 className='text-center text-2xl font-bold capitalize mb-4'>{templateData.name}</h1>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Customization Panel */}
        <div className="bg-gray-100 p-4 rounded shadow w-full md:w-72">
          <label>
            Font Size:
            <select value={fontSize} onChange={e => applyStyleToSelectedText('fontSize', e.target.value)} className="block w-full">
              {["12px", "14px", "16px", "18px", "20px", "22px"].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
          <label>
            Font Family:
            <select value={fontFamily} onChange={e => applyStyleToSelectedText('fontFamily', e.target.value)} className="block w-full">
              {["Arial", "Times New Roman", "Verdana", "Georgia", "Courier New", "Tahoma", "Helvetica", "Comic Sans MS"].map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </label>
          <label>
            Text Color:
            <input type="color" value={textColor} onChange={e => applyStyleToSelectedText('color', e.target.value)} />
          </label>
          <label>
            Background Color:
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          </label>
          <button onClick={resetStyles} className="bg-green-500 text-white mt-4 px-4 py-1 rounded">Reset Styles</button>
        </div>

        {/* Resume Preview */}
        <div className="flex-1" id="resume-content"
          contentEditable={true}
          style={{ fontSize, fontFamily, color: textColor, backgroundColor: bgColor, padding: '20px' }}
          dangerouslySetInnerHTML={{ __html: finalHTML }}
        />
        <style>{templateData.cssContent}</style>
      </div>

      {/* Download/Login Options */}
      <div className="mt-6 flex justify-between flex-wrap gap-3">
        {!isLoggedIn ? (
          <button onClick={handleLoginRedirect} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded">Login to download</button>
        ) : (
          <div className="flex gap-4 flex-wrap">
            <button onClick={handleDownloadPDF} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded">Download PDF</button>
            <button onClick={handleDownloadPNG} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded">Download PNG</button>
            <Link to="/createResume"><button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded">Edit Form</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeReview;
