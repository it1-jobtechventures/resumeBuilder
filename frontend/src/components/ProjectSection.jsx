import React, { useState, useEffect ,useContext, useRef ,useMemo} from 'react';
import {  useResume } from '../context/FormContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'
import JoditEditor from 'jodit-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProjectSection = ({url}) => {
  const [projects, setProjects] = useState(() => {
    // Retrieve data from local storage or use default
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [{ name: "", deployedLink: "", summary: "", githubLink: "" }];
  });
  const { updateResumeData  } = useResume();
  // const {activeResumeId} = useContext(AppContext)
  const [activeResumeId, setActiveResumeId] = useState(() => localStorage.getItem("activeResumeId") || null);
  const resumeId = activeResumeId;
  const editor = useRef(null);
  const [editorData, setEditorData] = useState(projects.summary || "");

  // Save to local storage whenev
  // Save projects data to local storage whenever it updates
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { name: "", deployedLink: "", summary: "", githubLink: "" }]);
  };

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  useEffect(() => {
    if(projects.length === 0) {
      setProjects(
        [{ name: "", deployedLink: "", summary: "", githubLink: "" }]
      )
    }
  },[])

  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 400,
    toolbarSticky: false,
    buttons: [
      'bold', 'italic', 'underline', 'ul', 'ol', 'font', 'fontsize',
      'paragraph', 'align', 'undo', 'redo', 'link', 'image', 'video'
    ],
    uploader: {
      insertImageAsBase64URI: true,
    }
  }), []);

  const generateProjectSummary = async (index) => {
    const { name, deployedLink, githubLink } = projects[index];
    if (!name || !deployedLink) {
      toast.error("Please enter both project name and deployed link to generate summary.");
      return;
    }
    try {
      toast.info("Generating project summary...");
      const response = await axios.post(`${url}/api/ai/generate-projectDes`, {
        name,
        deployedLink,
      });
      const updated = [...projects];
      updated[index].summary = response.data.summary;
      setProjects(updated);
      toast.success("Generated successfully!");
    } catch (error) {
      console.error("Error generating project summary:", error.response?.data || error.message);
      toast.error("Failed to generate summary.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Resume ID is missing");
      console.error("❌ Resume ID is undefined");
      return;
    }
    try {
      const data = await axios.post(`${url}/api/project/add-project`, {
        userId: localStorage.getItem("temporaryUserId"),
        resumeId,
        projects,
      });
      toast.success(data.message || 'Saved successfully');
    } catch (error) {
      console.error("❌ Error from backend:", error.response?.data || error);
      toast.error(error.response?.data?.error || 'Save failed');
    }
  };

  return (
    <>
      <div className="p-6 border rounded-md bg-white shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Projects</h2>
        <form className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-6 space-y-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Project {index + 1}</h3>
                {projects.length > 1 && (
                  <button type="button" onClick={() => removeProject(index)} className="text-sm text-red-600 hover:text-red-800 transition">
                    – Remove
                  </button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-800 font-medium mb-1">Project Name</label>
                  <input type="text" name="name" value={project.name} placeholder="Enter project name"onChange={(e) => handleChange(index, e)}className="w-full p-3 border border-gray-300 rounded-md capitalize focus:outline-none focus:ring-2 focus:ring-blue-500"spellCheck={true}/>
                </div>
                <div>
                  <label className="block text-purple-800 font-medium mb-1"> Deployed Link </label>
                  <input type="url" name="deployedLink" value={project.deployedLink} placeholder="https://your-project.live" onChange={(e) => handleChange(index, e)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" spellCheck={true} />
                </div>
                <div>
                  <label className="block text-purple-800 font-medium mb-1">GitHub Link</label>
                  <input type="url" name="githubLink" value={project.githubLink} placeholder="https://github.com/your-repo" onChange={(e) => handleChange(index, e)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" spellCheck={true} />
                </div>
                <div>
                  <label className="block text-purple-800 font-medium mb-1"> Project Summary </label>
                  <CKEditor editor={ ClassicEditor }
                    key={index} 
                    data={project.summary}  
                    config={ {
                      licenseKey:'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDkxNjc5OTksImp0aSI6ImQ0MTAzODkwLThlNjAtNDAzNi04MDgyLThhNDUyYjFlYTcxYyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjAyZGExM2I1In0.O80gcsNxnnBbi9Xpz7MW-MGD8WmuvT6q5xAayzBuYLHXvOOFPpiqZhoYE-o2UfmMkPDdusZFrE8GU5LGMKlPlA',
                      // plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
                      toolbar: ['undo','redo','|','bold','italic','underline','|','heading','formatPainter','|','link','imageUpload','|','bulletedList','numberedList','blockQuote',],
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      const updatedProjects = [...projects];
                      updatedProjects[index].summary = data;
                      setProjects(updatedProjects);
                    }}
                  />
                  <button type="button" onClick={() => generateProjectSummary(index)} className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                    ✨ Generate with AI
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button type="button" onClick={addProject} className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-md hover:from-blue-500 hover:to-green-500 transition">
              + Add One More Project
            </button>
            <button type="button" onClick={handleSave} className="w-full sm:w-auto bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition" >
              Save Projects
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectSection;