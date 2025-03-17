import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DisplayTemplate = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllTemplate = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/template/allTemplate');
            console.log(res.data);
            setTemplates(res.data); 
        } catch (error) {
            console.error(error); 
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllTemplate();
    }, []);

    return (
        <div className="pt-20">
            <div className="p-5 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Uploaded Templates</h2>
                {loading ? (
                    <p>Loading templates...</p>
                ) : templates.length === 0 ? (
                    <p>No templates uploaded yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {templates.map((template) => (
                            <li
                                key={template._id}
                                className="border p-3 rounded-md shadow-sm flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{template.name}</p>
                                </div>
                                <img
                                    src={template.previewImage}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DisplayTemplate;
