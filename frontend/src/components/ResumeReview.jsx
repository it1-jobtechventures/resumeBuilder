import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AppContext } from '../context/AppContext';
import { useResume } from '../context/FormContext';
import axios from 'axios';
import TemplatePage from '../pages/TemplatePage';
import Handlebars from 'handlebars';
import DOMPurify from 'dompurify';
import moment from 'moment';

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

  Handlebars.registerHelper('formatDate', function (dateStr) {
    return moment(dateStr).format('MMM YYYY');
  });

  Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });

  //to see icons in template 
  Handlebars.registerHelper('capitalize', function(str) {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  // software inffo to check rating is greater than zero or not 
  Handlebars.registerHelper('not', function(value) {
    return !value;
  });

  // Checks a > b
  Handlebars.registerHelper('gt', (a, b) => a > b);

  // Checks a <= b
  Handlebars.registerHelper('lte', (a, b) => a <= b);

  // Logical AND for multiple conditions
  Handlebars.registerHelper('and', function() {
    return Array.prototype.every.call(arguments, Boolean);
  });

  // Range helper to create array from start to end inclusive
  Handlebars.registerHelper('range', function(start, end, options) {
    let accum = [];
    for(let i = start; i <= end; i++) {
      accum.push(i);
    }
    return accum;
  });

  //for software rating to show the bar using css
  Handlebars.registerHelper('gt', (a, b) => a > b);
  Handlebars.registerHelper('and', function() {
    return Array.prototype.every.call(arguments, Boolean);
  });
  Handlebars.registerHelper('multiply', (a, b) => a * b);

  Handlebars.registerHelper('multiply', function(a, b) {
    return a * b;
  });

  Handlebars.registerHelper('gt', (a, b) => a > b);
  Handlebars.registerHelper('lte', (a, b) => a <= b);
  Handlebars.registerHelper('range', function(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  });

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
        console.log(res.data)
      } catch (err) {
        console.error('Error loading template:', err);
      }
    };
    fetchTemplate();
  }, [templateId]);

  // Compile Template with Data
  useEffect(() => {
    if (templateData?.htmlContent && resumeData) {
      try {
        const compile = Handlebars.compile(templateData.htmlContent);
        const rawHTML = compile(resumeData);
        const safeHTML = DOMPurify.sanitize(rawHTML);
        setCompiledHTML(safeHTML);
      } catch (error) {
        console.error('Handlebars compile error:', error);
      }
    }
  }, [templateData, resumeData]);

  // Inject JS if needed
  useEffect(() => {
    if (templateData?.jsContent) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = `(function() { ${templateData.jsContent} })();`;
      document.getElementById('resume-content')?.appendChild(script);
    }
  }, [templateData]);

const handleDownloadPDF = () => {
  const element = document.getElementById('resume-content');
  if (!element) {
    console.error("resume-content element not found!");
    return;
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  pdf.html(element, {
    callback: (doc) => doc.save(`${userName}_Resume.pdf`),
    x: 0,
    y: 0,
    width: 210,
    windowWidth: element.scrollWidth,
  });
};

  const handleDownloadPNG = () => {
    const element = document.getElementById('resume-content');
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
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold capitalize mb-4">
          {templateData.name}
        </h1>

        <div
          id="resume-content"
          contentEditable
          className="shadow-md rounded border  bg-white overflow-auto"
          style={{
            fontSize: templateData.fontSize || '14px',
            fontFamily: templateData.fontFamily || 'Arial',
            color: templateData.textColor || '#000',
            backgroundColor: templateData.bgColor || '#fff',
          }}
          dangerouslySetInnerHTML={{ __html: compiledHTML }}
        />

        {/* Template Custom CSS */}
        <style>{templateData.cssContent}</style>

        <div className="mt-6 flex justify-center">
          {!isLoggedIn ? (
            <button
              onClick={handleLoginRedirect}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded shadow hover:opacity-90"
            >
              Login to Download
            </button>
          ) : (
                      <>
          <button onClick={handleDownloadPDF} className="btn-primary">Download PDF</button>
          <button onClick={handleDownloadPNG} className="btn-primary">Download PNG</button>
          <Link to="/createResume"><button className="btn-primary">Edit Resume</button></Link>
          <Link to="/templates"><button className="btn-primary">Change Template</button></Link>
          
        </>
          )}
        </div>
      </div>
        {/* Template Selection (1/3 on large screens) */}
  <div className="bg-gray-100 shadow-lg p-4 rounded-lg h-fit">
    <h2 className="text-xl font-bold mb-4">Choose Template</h2>
    <TemplatePage url={url} onTemplateSelect={handleTemplateChange} />
  </div>
    </div>
    </>
  );
};

export default ResumeReview;
