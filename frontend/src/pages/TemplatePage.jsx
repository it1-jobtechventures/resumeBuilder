import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TemplateSelection from '../components/TemplateSelection'

const TemplatePage = ({url, onTemplateSelect}) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${url}/api/template/allTemplate`);
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div>
      <h1>Choose a Template</h1>
      <TemplateSelection templates={templates} url={url}  onTemplateSelect={ onTemplateSelect} />
    </div>
  );
};

export default TemplatePage;