import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
import templateModel from '../model/templateModel.js';

// export const uploadTemplate = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const { htmlFile, cssFile, jsFile, previewImage } = req.files || {};

//         if (!htmlFile && !cssFile && !jsFile && !previewImage) {
//             return res.status(400).json({ error: 'No files uploaded.' });
//         }

//         // Create a separate folder for the template using its name
//         const templateFolder = path.join('upload/templates', name);
//         fs.mkdirSync(templateFolder, { recursive: true });

//         // Define file paths inside the new template folder
//         const htmlPath = htmlFile ? path.join(templateFolder, `${name}.html`) : '';
//         const cssPath = cssFile ? path.join(templateFolder, `${name}.css`) : '';
//         const jsPath = jsFile ? path.join(templateFolder, `${name}.js`) : '';

//         if (htmlFile && htmlFile[0]) fs.renameSync(htmlFile[0].path, htmlPath);
//         if (cssFile && cssFile[0]) fs.renameSync(cssFile[0].path, cssPath);
//         if (jsFile && jsFile[0]) fs.renameSync(jsFile[0].path, jsPath);

//         let imageUrl = '';
//         if (previewImage && previewImage[0]) {
//             const result = await cloudinary.uploader.upload(previewImage[0].path, {
//                 folder: 'resume_templates',
//                 public_id: `${name}-preview`,
//                 resource_type: 'image',
//             });
//             imageUrl = result.secure_url;
//             fs.unlinkSync(previewImage[0].path); // Delete local image file after upload
//         }

//         // Save template details to MongoDB
//         const newTemplate = new templateModel({
//             name,
//             htmlFile: htmlPath,
//             cssFile: cssPath,
//             jsFile: jsPath,
//             previewImage: imageUrl,
//         });

//         await newTemplate.save();
//         res.status(201).json({ message: "Template uploaded successfully", template: newTemplate });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };

// Fetch all templates


export const uploadTemplate = async (req, res) => {
    try {
        const { name } = req.body;
        const { htmlFile, cssFile, jsFile, previewImage } = req.files || {};

        if (!htmlFile && !cssFile && !jsFile && !previewImage) {
            return res.status(400).json({ error: 'No files uploaded.' });
        }

        // Reading the file content as text
        const htmlContent = htmlFile && htmlFile[0] ? fs.readFileSync(htmlFile[0].path, 'utf-8') : '';
        const cssContent = cssFile && cssFile[0] ? fs.readFileSync(cssFile[0].path, 'utf-8') : '';
        const jsContent = jsFile && jsFile[0] ? fs.readFileSync(jsFile[0].path, 'utf-8') : '';

        // Upload preview image to Cloudinary
        let imageUrl = '';
        if (previewImage && previewImage[0]) {
            const result = await cloudinary.uploader.upload(previewImage[0].path, {
                folder: 'resume_templates',
                public_id: `${name}-preview`,
                resource_type: 'image',
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(previewImage[0].path); // Delete local image after upload
        }

        // Save template details to MongoDB
        const newTemplate = new templateModel({
            name,
            htmlContent,
            cssContent,
            jsContent,
            previewImage: imageUrl,
        });

        await newTemplate.save();
        res.status(201).json({ message: "Template uploaded successfully", template: newTemplate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const getAllTemplates = async (req, res) => {
    try {
        const templates = await templateModel.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Fetch single template by ID
export const getSingleTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await templateModel.findById(id);

        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};