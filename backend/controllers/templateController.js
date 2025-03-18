import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
import templateModel from '../model/templateModel.js';
import { fileURLToPath } from 'url';

export const uploadTemplate = async (req, res) => {
    try {
        const { name } = req.body;
        const { htmlFile, cssFile, jsFile, previewImage } = req.files || {};

        if (!htmlFile && !cssFile && !jsFile && !previewImage) {
            return res.status(400).json({ error: 'No files uploaded.' });
        }

        // Define the directory path for this template
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const templateDir = path.join(__dirname, '..', 'templates', name);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(templateDir)) {
            fs.mkdirSync(templateDir, { recursive: true });
        }

        let htmlContent = '', cssContent = '', jsContent = '';

        // Save and read HTML file
        if (htmlFile && htmlFile[0]) {
            const htmlPath = path.join(templateDir, 'template.html');
            fs.writeFileSync(htmlPath, fs.readFileSync(htmlFile[0].path, 'utf-8'));
            htmlContent = fs.readFileSync(htmlPath, 'utf-8'); // Store content as text
        }

        // Save and read CSS file
        if (cssFile && cssFile[0]) {
            const cssPath = path.join(templateDir, 'styles.css');
            fs.writeFileSync(cssPath, fs.readFileSync(cssFile[0].path, 'utf-8'));
            cssContent = fs.readFileSync(cssPath, 'utf-8'); // Store content as text
        }

        // Save and read JS file
        if (jsFile && jsFile[0]) {
            const jsPath = path.join(templateDir, 'script.js');
            fs.writeFileSync(jsPath, fs.readFileSync(jsFile[0].path, 'utf-8'));
            jsContent = fs.readFileSync(jsPath, 'utf-8'); // Store content as text
        }

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
            htmlContent, // Store HTML content as text
            cssContent,  // Store CSS content as text
            jsContent,   // Store JS content as text
            previewImage: imageUrl,
            folderPath: templateDir, // Store folder path for reference
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