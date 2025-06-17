// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { AppContext } from '../context/AppContext';
// import { useResume } from '../context/FormContext';
// import axios from 'axios';
// import TemplatePage from '../pages/TemplatePage';
// import Handlebars from 'handlebars';
// import DOMPurify from 'dompurify';
// import moment from 'moment';
// import he from 'he';

// const ResumeReview = ({ url }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { isLoggedIn } = useContext(AppContext);
//   const { resumeData } = useResume();
//   const [templateData, setTemplateData] = useState(null);
//   const [templateId, setTemplateId] = useState(location.state?.templateId || localStorage.getItem('selectedTemplateId'));
//   const [compiledHTML, setCompiledHTML] = useState('');
//   const generalInfo = JSON.parse(localStorage.getItem('generalInfo'));
//   const userName = generalInfo?.firstName || 'My_Resume';
//   const [refreshKey, setRefreshKey] = useState(0);

//   const check = () => {
//     const keys = ["projects","interests", "certifications", "skills", "softwareInfo","languages","socialLinks","volunteering"];

//     keys.forEach((key) => {
//       const raw = localStorage.getItem(key);

//       let data;
//       try {
//         data = JSON.parse(raw);
//       } catch {
//         data = null;
//       }

//       const isEmptyArray = Array.isArray(data) && data.length === 0;
//       const isArrayWithEmptyObject =
//         Array.isArray(data) &&
//         data.length === 1 &&
//         typeof data[0] === "object" &&
//         data[0] !== null &&
//         Object.values(data[0]).every((v) => v === "");

//       if (!data || isEmptyArray || isArrayWithEmptyObject) {
//         localStorage.setItem(key, JSON.stringify([]));
//       }
//     });
//   };

//   useEffect(() => {
//     check();
//   }, []);

//   useEffect(() => {
//     // whenever resumeData changes, force recompile
//     setRefreshKey(k => k + 1);
//   }, [resumeData]);
  
//   Handlebars.registerHelper('formatDate', function (dateStr) {
//     return moment(dateStr).format('MMM YYYY');
//   });

//   Handlebars.registerHelper('eq', function (a, b) {
//     return a === b;
//   });

//   //to see icons in template 
//   Handlebars.registerHelper('capitalize', function(str) {
//     if (typeof str !== 'string') return '';
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   });

//   // software inffo to check rating is greater than zero or not 
//   Handlebars.registerHelper('not', function(value) {
//     return !value;
//   });

//   // Checks a > b
//   Handlebars.registerHelper('gt', (a, b) => a > b);

//   // Checks a <= b
//   Handlebars.registerHelper('lte', (a, b) => a <= b);

//   // Logical AND for multiple conditions
//   Handlebars.registerHelper('and', function() {
//     return Array.prototype.every.call(arguments, Boolean);
//   });

//   // Range helper to create array from start to end inclusive
//   Handlebars.registerHelper('range', function(start, end, options) {
//     let accum = [];
//     for(let i = start; i <= end; i++) {
//       accum.push(i);
//     }
//     return accum;
//   });

//   //for software rating to show the bar using css
//   Handlebars.registerHelper('gt', (a, b) => a > b);
//   Handlebars.registerHelper('and', function() {
//     return Array.prototype.every.call(arguments, Boolean);
//   });
//   Handlebars.registerHelper('multiply', (a, b) => a * b);

//   Handlebars.registerHelper('multiply', function(a, b) {
//     return a * b;
//   });

//   Handlebars.registerHelper('gt', (a, b) => a > b);
//   Handlebars.registerHelper('lte', (a, b) => a <= b);
//   Handlebars.registerHelper('range', function(start, end) {
//     const result = [];
//     for (let i = start; i <= end; i++) {
//       result.push(i);
//     }
//     return result;
//   });

//   const handleTemplateChange = (newTemplateId) => {
//     setTemplateId(newTemplateId);
//     localStorage.setItem('selectedTemplateId', newTemplateId);
//   };


//   useEffect(() => {
//     if (!templateId) return;
//     const fetchTemplate = async () => {
//       try {
//         const res = await axios.get(`${url}/api/template/singleTemplate/${templateId}`);
//         setTemplateData(res.data);
//       } catch (err) {
//         console.error('Error loading template:', err);
//       }
//     };
//     fetchTemplate();
//   }, [templateId]);

//   // Compile Template with Data
//   useEffect(() => {
//     if (templateData?.htmlContent && resumeData) {
//       try {
//         const compile = Handlebars.compile(templateData.htmlContent);
//         let rawHTML = compile(resumeData);
//         rawHTML = he.decode(rawHTML);
//         const safeHTML = DOMPurify.sanitize(rawHTML);
//         setCompiledHTML(safeHTML);
//       } catch (error) {
//         console.error('Handlebars compile error:', error);
//       }
//     }
//   }, [templateData, resumeData ,refreshKey]);

//   // Inject JS if needed
//   useEffect(() => {
//     if (templateData?.jsContent) {
//       const script = document.createElement('script');
//       script.type = 'text/javascript';
//       script.text = `(function() { ${templateData.jsContent} })();`;
//       document.getElementById('resume-content')?.appendChild(script);
//     }
//   }, [templateData]);

//   const handleDownloadPDF = () => {
//     const element = document.getElementById('resume-content');
//     if (!element) {
//       console.error("resume-content element not found!");
//       return;
//     }

//     const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//     pdf.html(element, {
//       callback: (doc) => doc.save(`${userName}_Resume.pdf`),
//       x: 0,
//       y: 0,
//       width: 210,
//       windowWidth: element.scrollWidth,
//     });
//   };
// // const handleDownloadPDF = async () => {
// //   try {
// //     const completeHTML = `<style>${templateData.cssContent}</style>${compiledHTML}`;

// //     const response = await axios.post(`http://localhost:5000/api/pdf/generate-pdf`, {
// //       headers: {
// //         "Content-Type": "application/json"
// //       },
// //       body: JSON.stringify({
// //         htmlContent: completeHTML,
// //         fileName: `${userName}_Resume.pdf`
// //       })
// //     });

// //     if (!response.ok) {
// //       throw new Error("PDF generation failed!");
// //     }

// //     const blob = await response.blob();
// //     const downloadLink = document.createElement("a");
// //     downloadLink.href = window.URL.createObjectURL(blob);
// //     downloadLink.download = `${userName}_Resume.pdf`;
// //     document.body.appendChild(downloadLink);
// //     downloadLink.click();
// //     document.body.removeChild(downloadLink);
// //   } catch (error) {
// //     console.error("Error generating PDF:", error);
// //   }
// // };

//   const handleDownloadPNG = () => {
//     const element = document.getElementById('resume-content');
//     html2canvas(element, { scale: 2 }).then(canvas => {
//       canvas.toBlob(blob => {
//         saveAs(blob, `${userName}_Resume.png`);
//       });
//     });
//   };

//   const handleLoginRedirect = () => {
//     if (templateId) localStorage.setItem('selectedTemplateId', templateId);
//     navigate('/login', { state: { from: location.pathname } });
//   };

//   if (!templateId) return <h2 className="text-center text-lg font-semibold mt-10">No template selected!</h2>;
//   if (!templateData) return <h2 className="text-center text-lg font-semibold mt-10">Loading template...</h2>;


//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
//       <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-center text-2xl font-bold capitalize mb-4">
//           {templateData.name}
//         </h1>
//         <div
//           id="resume-content"
//           contentEditable
//           className="shadow-md rounded border  bg-white overflow-auto"
//           style={{
//             fontSize: templateData.fontSize || '14px',
//             fontFamily: templateData.fontFamily || 'Arial',
//             color: templateData.textColor || '#000',
//             backgroundColor: templateData.bgColor || '#fff',
//           }}
//           dangerouslySetInnerHTML={{ __html: compiledHTML }}
//         />
//         {/* Template Custom CSS */}
//         <style>{templateData.cssContent}</style>
//         <div className="mt-6 flex justify-center space-x-4">
//           {!isLoggedIn ? (
//             <button onClick={handleLoginRedirect} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded shadow hover:opacity-90">
//               Login to Download
//             </button>
//           ) : (
//             <>
//               <button onClick={handleDownloadPDF} className="btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Download PDF</button>
//               <button onClick={handleDownloadPNG} className="btn-primary bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Download PNG</button>
//               <Link to="/createResume"><button className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Edit Resume</button></Link>
//               <Link to="/templates"><button className="btn-primary bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">Change Template</button></Link>
//             </>
//           )}
//         </div>
//       </div>
//       {/* Template Selection (1/3 on large screens) */}
//       <div className="bg-gray-100 shadow-lg p-4 rounded-lg h-fit">
//         <h2 className="text-xl font-bold mb-4">Choose Template</h2>
//         <TemplatePage url={url} onTemplateSelect={handleTemplateChange} />
//       </div>
//     </div>
//   );
// };

// export default ResumeReview;















// import React, { useContext, useEffect, useState, useRef } from 'react'; // Added useRef
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf'; // Still here, but html2pdf.js handles the PDF creation
// import { AppContext } from '../context/AppContext';
// import { useResume } from '../context/FormContext';
// import axios from 'axios';
// import TemplatePage from '../pages/TemplatePage';
// import Handlebars from 'handlebars';
// import DOMPurify from 'dompurify';
// import moment from 'moment';
// import he from 'he';
// import html2pdf from 'html2pdf.js'; // Import html2pdf.js

// const ResumeReview = ({ url }) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { isLoggedIn } = useContext(AppContext);
//     const { resumeData } = useResume();
//     const [templateData, setTemplateData] = useState(null);
//     const [templateId, setTemplateId] = useState(location.state?.templateId || localStorage.getItem('selectedTemplateId'));
//     const [compiledHTML, setCompiledHTML] = useState(''); // Stores the full HTML document string for PDF
//     const generalInfo = JSON.parse(localStorage.getItem('generalInfo'));
//     const userName = generalInfo?.firstName || 'My_Resume';
//     const [refreshKey, setRefreshKey] = useState(0);

//     // useRef for the hidden element used by html2pdf.js
//     const pdfContentRef = useRef(null);

//     const check = () => {
//         const keys = ["projects", "interests", "certifications", "skills", "softwareInfo", "languages", "socialLinks", "volunteering"];

//         keys.forEach((key) => {
//             const raw = localStorage.getItem(key);
//             let data;
//             try { data = JSON.parse(raw); } catch { data = null; }
//             const isEmptyArray = Array.isArray(data) && data.length === 0;
//             const isArrayWithEmptyObject =
//                 Array.isArray(data) &&
//                 data.length === 1 &&
//                 typeof data[0] === "object" &&
//                 data[0] !== null &&
//                 Object.values(data[0]).every((v) => v === "");

//             if (!data || isEmptyArray || isArrayWithEmptyObject) {
//                 localStorage.setItem(key, JSON.stringify([]));
//             }
//         });
//     };

//     useEffect(() => {
//         check();
//     }, []);

//     useEffect(() => {
//         // whenever resumeData changes, force recompile
//         setRefreshKey(k => k + 1);
//     }, [resumeData]);

//     // --- Handlebars Helper Registrations (Consolidated to run once) ---
//     useEffect(() => {
//         Handlebars.registerHelper('formatDate', function (dateStr) {
//             return moment(dateStr).format('MMM DD,YYYY');
//         });

//         Handlebars.registerHelper('eq', function (a, b) {
//             return a === b;
//         });

//         Handlebars.registerHelper('capitalize', function(str) {
//             if (typeof str !== 'string' || str.length === 0) return '';
//             return str.charAt(0).toUpperCase() + str.slice(1);
//         });

//         Handlebars.registerHelper('not', function(value) {
//             return !value;
//         });

//         Handlebars.registerHelper('gt', (a, b) => a > b);
//         Handlebars.registerHelper('lte', (a, b) => a <= b);
//         Handlebars.registerHelper('and', function() {
//             return Array.prototype.every.call(arguments, Boolean);
//         });
//         Handlebars.registerHelper('range', function(start, end) {
//             const result = [];
//             for(let i = start; i <= end; i++) {
//                 result.push(i);
//             }
//             return result;
//         });
//         Handlebars.registerHelper('multiply', (a, b) => a * b);
//     }, []); // Empty dependency array means it runs only once on mount

//     const handleTemplateChange = (newTemplateId) => {
//         setTemplateId(newTemplateId);
//         localStorage.setItem('selectedTemplateId', newTemplateId);
//     };

//     useEffect(() => {
//         if (!templateId) return;
//         const fetchTemplate = async () => {
//             try {
//                 const res = await axios.get(`${url}/api/template/singleTemplate/${templateId}`);
//                 setTemplateData(res.data);
//             } catch (err) {
//                 console.error('Error loading template:', err);
//             }
//         };
//         fetchTemplate();
//     }, [templateId, url]);

//     // Compile Template with Data and build full HTML document
//     useEffect(() => {
//         if (templateData?.htmlContent && resumeData) {
// // ... inside useEffect where compiledHTML is compiled

// // ... inside useEffect where compiledHTML is compiled

// try {
//     const compile = Handlebars.compile(templateData.htmlContent);
//     let renderedHtmlBody = compile(resumeData);
//     renderedHtmlBody = he.decode(renderedHtmlBody);

//     const fullHtmlDocument = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>${userName}_Resume</title>
//             <link rel="stylesheet"
//                   href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
//                   integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=="
//                   crossorigin="anonymous" referrerpolicy="no-referrer" />
//             <style>
//                 /* Global print styles */
//                 body { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
//                 @page { margin: 0.5in; }
//                 ${templateData.cssContent || ''}
//                 img { max-width: 100%; height: auto; }
//                 .page-break-before { page-break-before: always; }
//                 .page-break-after { page-break-after: always; }
//                 .no-page-break-inside { page-break-inside: avoid; }
//             </style>
//         </head>
//         <body>
//             ${renderedHtmlBody}
//         </body>
//         <script>
// 	window.PagedConfig = {
// 		before: () => {
// 			return new Promise((resolve, reject) => {
// 				setTimeout(() => { resolve() }, 1000);
// 			})
// 		},
// 		after: (flow) => { console.log("after", flow) },
// 	};
// </script> 
//         </html>
//     `;
//     setCompiledHTML(fullHtmlDocument); // Keep this line as is
// console.log("test",fullHtmlDocument)
//     // ... rest of your debugging logs ...

// } catch (error) {
//     console.error('Handlebars compile error:', error);
// }
// // ...
// // ...
//         }
//     }, [templateData, resumeData, refreshKey, userName]);

//     // Inject JS if needed (for live preview interactivity, not for PDF generation)
//     useEffect(() => {
//         const currentContainer = document.getElementById('resume-content');
//         if (currentContainer) {
//             const oldScripts = currentContainer.querySelectorAll('script[data-template-script]');
//             oldScripts.forEach(script => script.remove());
//         }

//         if (templateData?.jsContent && currentContainer) {
//             const script = document.createElement('script');
//             script.type = 'text/javascript';
//             script.text = `(function() { ${templateData.jsContent} })();`;
//             script.setAttribute('data-template-script', 'true');
//             currentContainer.appendChild(script);
//         }
//     }, [templateData]);

// // ... (rest of your component code) ...

// // --- Direct PDF Download with html2pdf.js ---
// const handleDownloadPDF = async () => {
//     if (!compiledHTML) {
//         alert("Resume content not ready for PDF download. Please wait for rendering.");
//         return;
//     }

//     const element = pdfContentRef.current; // This is the hidden div

//     if (!element) {
//         console.error("PDF content element not found!");
//         alert("Error: Resume content could not be prepared for PDF. Please try again.");
//         return;
//     }

//     // Define pdfOptions BEFORE it's used
//     const pdfOptions = {
//         margin: [0.5, 0.5, 0.5, 0.5], // Top, Left, Bottom, Right in inches
//         filename: `${userName}_Resume.pdf`,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: {
//             scale: 2, // Higher scale for better resolution (e.g., 2 or 3)
//             useCORS: true, // Essential for images from different origins
//             logging: true, // IMPORTANT: Turn this on to see html2canvas errors in console
//             // dpi: 192, // Optional: higher DPI, works with scale
//             // letterRendering: true, // Optional: improve text rendering
//         },
//         jsPDF: {
//             unit: 'in',
//             format: 'A4', // Set paper format
//             orientation: 'portrait' // Portrait orientation
//         }
//     };

//     // --- IMPORTANT: Remove/Comment out the temporary visibility styles and console logs here ---
//     // You added these for debugging. They should be removed for normal operation.
//     // I'm putting them back to their original state below for clarity.

//     // Restore original hidden state for actual PDF generation
//     element.style.position = 'absolute';
//     element.style.top = '-9999px';
//     element.style.left = '-9999px';
//     element.style.width = '210mm'; // Revert to A4 width
//     element.style.height = 'auto'; // Revert height
//     element.style.zIndex = '-1';
//     element.style.backgroundColor = 'transparent'; // Or whatever default it should be
//     element.style.display = 'none'; // Ensure it's hidden again

//     // Force a brief reflow/re-render to ensure all styles are applied,
//     // especially important if content changes rapidly or is affected by JS.
//     // This is a common trick to help html2canvas capture accurately.
//     element.style.display = 'block'; // Temporarily make it block to force layout
//     element.offsetWidth; // Trigger reflow
//     element.style.display = 'none'; // Hide it again immediately after reflow

//     try {
//         // This is where pdfOptions is first used, so it must be defined above this line.
//         await html2pdf().set(pdfOptions).from(element).save();
//         console.log("PDF generated successfully with html2pdf.js");
//     } catch (err) {
//         console.error("Error generating PDF with html2pdf.js:", err);
//         alert("Failed to generate PDF. Check console for details.");
//     } finally {
//         // Ensure the element is hidden again after attempt, regardless of success or failure
//         if (element) {
//             element.style.display = 'none';
//             // Restore original position and width after use
//             element.style.position = 'absolute';
//             element.style.top = '-9999px';
//             element.style.left = '-9999px';
//             element.style.width = '210mm';
//         }
//     }
// };

// // ... (rest of your component code) ...

//     // --- PNG Download Function ---
//     const handleDownloadPNG = () => {
//         const element = document.getElementById('resume-content');
//         if (!element) {
//             console.error("resume-content element not found for PNG download!");
//             return;
//         }
//         html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
//             canvas.toBlob(blob => {
//                 saveAs(blob, `${userName}_Resume.png`);
//             });
//         });
//     };

//     const handleLoginRedirect = () => {
//         if (templateId) localStorage.setItem('selectedTemplateId', templateId);
//         navigate('/login', { state: { from: location.pathname } });
//     };

//     if (!templateId) return <h2 className="text-center text-lg font-semibold mt-10">No template selected!</h2>;
//     if (!templateData) return <h2 className="text-center text-lg font-semibold mt-10">Loading template data...</h2>;
//     if (!resumeData) return <h2 className="text-center text-lg font-semibold mt-10">Loading resume form data...</h2>;
//     if (!compiledHTML) return <h2 className="text-center text-lg font-semibold mt-10">Preparing resume preview...</h2>;


//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
//             <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
//                 <h1 className="text-center text-2xl font-bold capitalize mb-4">
//                     {templateData.name || 'Your Resume'}
//                 </h1>
//                 {/* This is the visible preview of the resume */}
//                 <div
//                     id="resume-content"
//                     contentEditable // Keep contentEditable if you want live editing, but remember changes aren't saved automatically
//                     className="shadow-md rounded border bg-white overflow-auto"
//                     style={{
//                         fontSize: templateData.fontSize || '14px',
//                         fontFamily: templateData.fontFamily || 'Arial',
//                         color: templateData.textColor || '#000',
//                         backgroundColor: templateData.bgColor || '#fff',
//                     }}
//                     dangerouslySetInnerHTML={{ __html: compiledHTML }}
//                 />

//                 {/* This is the hidden element used by html2pdf.js for rendering.
//                     It's dynamically updated with compiledHTML. */}
//                 <div
//                     ref={pdfContentRef}
//                     style={{
//                         position: 'absolute', // Absolute position
//                         left: '-9999px',     // Far off-screen
//                         width: '210mm',      // A4 width for layout
//                         overflow: 'hidden',  // Hide scrollbars
//                         height: 'auto',      // Adjust height based on content
//                         zIndex: -1,          // Ensure it's behind everything
//                         display: 'none',     // Start hidden, temporarily revealed for reflow
//                         fontSize: templateData.fontSize || '14px', // Apply template styles
//                         fontFamily: templateData.fontFamily || 'Arial',
//                         color: templateData.textColor || '#000',
//                         backgroundColor: templateData.bgColor || '#fff',
//                         boxSizing: 'border-box' // Important for accurate sizing
//                     }}
//                     dangerouslySetInnerHTML={{ __html: compiledHTML }}
//                 />

//                 <div className="mt-6 flex justify-center space-x-4">
//                     {!isLoggedIn ? (
//                         <button onClick={handleLoginRedirect} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded shadow hover:opacity-90">
//                             Login to Download
//                         </button>
//                     ) : (
//                         <>
//                             <button onClick={handleDownloadPDF} className="btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Download PDF</button>
//                             <button onClick={handleDownloadPNG} className="btn-primary bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Download PNG</button>
//                             <Link to="/createResume"><button className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Edit Resume</button></Link>
//                             <Link to="/templates"><button className="btn-primary bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">Change Template</button></Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//             {/* Template Selection (1/3 on large screens) */}
//             <div className="bg-gray-100 shadow-lg p-4 rounded-lg h-fit">
//                 <h2 className="text-xl font-bold mb-4">Choose Template</h2>
//                 <TemplatePage url={url} onTemplateSelect={handleTemplateChange} />
//             </div>
//         </div>
//     );
// };

// export default ResumeReview;














  import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { AppContext } from '../context/AppContext';
import { useResume } from '../context/FormContext';
import axios from 'axios';
import TemplatePage from '../pages/TemplatePage';
import Handlebars from 'handlebars';
import moment from 'moment';

const A4_HEIGHT_PX = 1122;
const A4_WIDTH_PX = 794;
const PAGE_PADDING = 40;

const splitResumeIntoPages = () => {
  const originalContent = document.getElementById('resume-content');
  const container = document.getElementById('paged-resume-output');
  if (!originalContent || !container) return;

  container.innerHTML = '';

  const clone = originalContent.cloneNode(true);
  clone.style.width = `${A4_WIDTH_PX}px`;
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.top = '-9999px';
  document.body.appendChild(clone);

  const allChildren = Array.from(clone.children);

let page = createNewPage();
let currentHeight = PAGE_PADDING * 2;
let hasContent = false;

allChildren.forEach((child, index) => {
  const clonedChild = child.cloneNode(true);
  page.appendChild(clonedChild);

  const tempHeight = page.scrollHeight;

  if (tempHeight > A4_HEIGHT_PX) {
    page.removeChild(clonedChild);

    if (hasContent) container.appendChild(page);

    page = createNewPage();
    page.appendChild(clonedChild);
    hasContent = true;
  } else {
    hasContent = true;
  }

  // On last child
  if (index === allChildren.length - 1 && hasContent) {
    container.appendChild(page);
  }
});



  document.body.removeChild(clone);
};
// const splitResumeIntoPages = () => {
//   const originalContent = document.getElementById('resume-content');
//   const container = document.getElementById('paged-resume-output');
//   if (!originalContent || !container) return;

//   container.innerHTML = '';

//   const clone = originalContent.cloneNode(true);
//   clone.style.width = `${A4_WIDTH_PX}px`;
//   clone.style.position = 'absolute';
//   clone.style.visibility = 'hidden';
//   clone.style.top = '-9999px';
//   document.body.appendChild(clone);

//   const allChildren = Array.from(clone.children);
//   let currentPage = createNewPage();
//   container.appendChild(currentPage);

//   allChildren.forEach((child) => {
//     const clonedChild = child.cloneNode(true);
//     currentPage.appendChild(clonedChild);

//     const currentHeight = currentPage.scrollHeight;

//     if (currentHeight > A4_HEIGHT_PX) {
//       currentPage.removeChild(clonedChild);
//       currentPage = createNewPage();
//       currentPage.appendChild(clonedChild);
//       container.appendChild(currentPage);
//     }
//   });

//   document.body.removeChild(clone);
// };

const createNewPage = () => {
  const div = document.createElement('div');
  div.className = 'resume-page';
  div.style.width = `${A4_WIDTH_PX}px`;
  div.style.minHeight = `${A4_HEIGHT_PX}px`;
  div.style.padding = `${PAGE_PADDING}px`;
  div.style.boxSizing = 'border-box';
  div.style.background = '#fff';
  div.style.marginBottom = '20px';
  div.style.marginTop = '20px';

  div.style.pageBreakAfter = 'always';
  div.style.breakAfter = 'page';
  return div;
};

const ResumeReview = ({ url }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const { resumeData } = useResume();
  const [templateData, setTemplateData] = useState(null);
  const [templateId, setTemplateId] = useState(location.state?.templateId || localStorage.getItem('selectedTemplateId'));
  const [compiledHTML, setCompiledHTML] = useState('');
  const generalInfo = JSON.parse(localStorage.getItem('generalInfo'));
  const userName = generalInfo?.firstName || 'My_Resume';
  const [refreshKey, setRefreshKey] = useState(0);

  const check = () => {
    const keys = ["projects", "interests", "certifications", "skills", "softwareInfo", "languages", "socialLinks", "volunteering"];
    keys.forEach((key) => {
      const raw = localStorage.getItem(key);
      let data;
      try { data = JSON.parse(raw); } catch { data = null; }
      const isEmptyArray = Array.isArray(data) && data.length === 0;
      const isArrayWithEmptyObject = Array.isArray(data) && data.length === 1 && typeof data[0] === "object" && data[0] !== null &&
        Object.values(data[0]).every((v) => v === "");
      if (!data || isEmptyArray || isArrayWithEmptyObject) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });
  };

  useEffect(() => { check(); }, []);
  useEffect(() => { setRefreshKey(k => k + 1); }, [resumeData]);

  Handlebars.registerHelper('formatDate', (dateStr) => moment(dateStr).format('MMM YYYY'));
  Handlebars.registerHelper('capitalize', (str) => typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '');
  Handlebars.registerHelper('eq', (a, b) => a === b);
  Handlebars.registerHelper('not', (v) => !v);
  Handlebars.registerHelper('gt', (a, b) => a > b);
  Handlebars.registerHelper('lte', (a, b) => a <= b);
  Handlebars.registerHelper('and', function () { return Array.prototype.every.call(arguments, Boolean); });
  Handlebars.registerHelper('range', (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i));
  Handlebars.registerHelper('multiply', (a, b) => a * b);

  const handleTemplateChange = (newTemplateId) => {
    setTemplateId(newTemplateId);
    localStorage.setItem('selectedTemplateId', newTemplateId);
  };

  useEffect(() => {
    if (!templateId) return;
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`${url}/api/template/singleTemplate/${templateId}`);
        setTemplateData(res.data);
      } catch (err) {
        console.error('Error loading template:', err);
      }
    };
    fetchTemplate();
  }, [templateId]);

  useEffect(() => {
    if (templateData?.htmlContent && resumeData) {
      try {
        const compile = Handlebars.compile(templateData.htmlContent);
        const rawHTML = compile(resumeData);
        setCompiledHTML(rawHTML);
      } catch (error) {
        console.error('Handlebars compile error:', error);
      }
    }
  }, [templateData, resumeData, refreshKey]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      splitResumeIntoPages();
    }, 100);
    return () => clearTimeout(timeout);
  }, [compiledHTML]);

  const handleDownloadPDF = () => {
    const element = document.getElementById('paged-resume-output');
    if (!element) {
      console.error("paged-resume-output not found!");
      return;
    }

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${userName}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    
html2pdf().set(opt).from(element).save();

  };

  const handleDownloadPNG = () => {
    const element = document.getElementById('paged-resume-output');
    html2canvas(element, { scale: 2 }).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, `${userName}_Resume.png`);
      });
    });
  };

  const handleLoginRedirect = () => {
    if (templateId) localStorage.setItem('selectedTemplateId', templateId);
    navigate('/login', { state: { from: location.pathname } });
  };

  if (!templateId) return <h2 className="text-center text-lg font-semibold mt-10">No template selected!</h2>;
  if (!templateData) return <h2 className="text-center text-lg font-semibold mt-10">Loading template...</h2>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold capitalize mb-4">
          {templateData.name}
        </h1>

        {/* Hidden resume for pagination calculations */}
        <div id="resume-content" style={{ display: 'none', position: 'absolute', top: '-9999px', left: '-9999px' }} dangerouslySetInnerHTML={{ __html: compiledHTML }} />

        {/* Visible paginated output */}
        <div
          id="paged-resume-output"
          className="overflow-auto"
          style={{
            fontSize: templateData.fontSize || '14px',
            fontFamily: templateData.fontFamily || 'Arial',
            color: templateData.textColor || '#000',
            backgroundColor: templateData.bgColor || '#fff',
          }}
        />

        {/* Template + Print CSS */}
        <style>{templateData.cssContent}</style>
        <style>
          {
            `body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
  font-size: 14px;
  margin: 0;
  padding: 0;
}

.resume {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

h1, h2, h3 {
  margin-top: 0;
  color: #2c3e50;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  font-size: 18px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
  margin-top: 30px;
  margin-bottom: 10px;
}

h3 {
  font-size: 16px;
}

.section {
  margin-bottom: 20px;
  page-break-inside: avoid;
  break-inside: avoid;
}

.item {
  margin-left: 15px;
  margin-bottom: 10px;
}

.role {
  margin-left: 20px;
}

ul {
  padding-left: 20px;
  margin: 0;
}

ul li {
  margin-bottom: 5px;
}

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border-radius: 5px;
  margin-bottom: 10px;
}

span.star {
  font-size: 14px;
}

@media print {
  body {
    background-color: #fff;
    color: #000;
  }

  .resume {
    padding: 10mm;
  }

  .section {
    page-break-inside: avoid;
  }

  .resume-page {
    page-break-after: always;
    break-after: page;
  }

  a[href]:after {
    content: " (" attr(href) ")";
  }
}
`
          }
        </style>

        <div className="mt-6 flex justify-center space-x-4">
          {!isLoggedIn ? (
            <button onClick={handleLoginRedirect} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded shadow hover:opacity-90">
              Login to Download
            </button>
          ) : (
            <>
              <button onClick={handleDownloadPDF} className="btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Download PDF</button>
              <button onClick={handleDownloadPNG} className="btn-primary bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Download PNG</button>
              <Link to="/createResume"><button className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Edit Resume</button></Link>
              <Link to="/templates"><button className="btn-primary bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">Change Template</button></Link>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-100 shadow-lg p-4 rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4">Choose Template</h2>
        <TemplatePage url={url} onTemplateSelect={handleTemplateChange} />
      </div>
    </div>
  );
};

export default ResumeReview;
