import React, { useState } from 'react'
import axios from 'axios'

const TemplateUpload = () => {
  const [name, setName] = useState("");
  const [htmlFile, setHtmlFile] = useState(null);
  const [cssFile, setCssFile] = useState(null);
  const [jsFile, setJsFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onsubmitFormHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("name", name);
    if (htmlFile) formData.append("htmlFile", htmlFile);
    if (cssFile) formData.append("cssFile", cssFile);
    if (jsFile) formData.append("jsFile", jsFile);
    if (previewImage) formData.append("previewImage", previewImage);

    try {
      const res = await axios.post('http://localhost:5000/api/template/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        }
      });
      if (res.data) {
        console.log("Template uploaded successfully");
        setName('')
        setHtmlFile('')
        setCssFile('')
      } else {
        console.log('Error uploading template');
      }
    } catch (error) {
      console.error("Error uploading template:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="p-5 bg-white shadow-md rounded-lg pt-20">
      <h2 className="text-xl font-semibold mb-4">Upload New Template</h2>
      <form onSubmit={onsubmitFormHandle} className="space-y-4">
        <input type="text" placeholder="Template Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" required />
        <label>html </label>
        <input type="file" accept=".html" onChange={(e) => setHtmlFile(e.target.files[0])} className="border p-2 w-full" placeholder='html' />
        <label> css</label>
        <input type="file" accept=".css" onChange={(e) => setCssFile(e.target.files[0])} className="border p-2 w-full"  placeholder='css'/>
        <label> js</label>
        <input type="file" accept=".js" onChange={(e) => setJsFile(e.target.files[0])} className="border p-2 w-full" placeholder='js'/>
        <label>image </label>
        <input type="file" accept="image/*" onChange={(e) => setPreviewImage(e.target.files[0])} className="border p-2 w-full"  />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Uploading..." : "Upload Template"}
        </button>
      </form>
      </div>
    </>
  )
}

export default TemplateUpload