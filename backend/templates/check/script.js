
const data = JSON.parse(localStorage.getItem("resumeData"));

function createSection(title, items) {
    if (!items || items.length === 0 || items.every(i => !i || (typeof i === 'string' && i.trim() === ''))) return '';
    let html = `<div class="section"><h2>${title}</h2>`;
    items.forEach(item => {
        if (typeof item === 'string') {
            html += `<div class="item">${item}</div>`;
        } else if (typeof item === 'object') {
            html += `<div class="item">`;
            for (const key in item) {
                if (item[key]) {
                    if (key.toLowerCase().includes('date') && item[key]) {
                        html += `<span>${item[key]}</span> `;
                    } else if (!key.toLowerCase().includes('date')) {
                        html += `<div><strong>${key}:</strong> ${item[key]}</div>`;
                    }
                }
            }
            html += `</div>`;
        }
    });
    html += `</div>`;
    return html;
}

function createGeneralInfo(info) {
    let html = `<div class="section"><h2>General Info</h2>`;
    for (const key in info) {
        if (info[key]) {
            html += `<div><strong>${key}:</strong> ${info[key]}</div>`;
        }
    }
    html += `</div>`;
    return html;
}

function displayResume() {
    let html = "";
    if (!data) return;

    html += createGeneralInfo(data.generalInfo);
    html += createSection("Education", data.education);
    html += createSection("Work Experience", data.workExperience?.flatMap(w => {
        return w.roles?.map(r => ({
            company: w.company,
            location: w.location,
            industry: w.industry,
            ...r
        })) || [];
    }));
    html += createSection("Internships", data.internshipExperience);
    html += createSection("Projects", data.projects);
    html += createSection("Certifications", data.certifications);
    html += createSection("Accomplishments", data.accomplishments);
    html += createSection("Languages", data.languages);
    html += createSection("Skills", data.skills);
    html += createSection("Software", data.softwareInfo);
    html += createSection("Interests", data.interests);
    html += createSection("Volunteering", data.volunteering);
    html += createSection("Social Links", [data.socialLinks]);
    html += createSection("Reference", [data.reference]);

    document.getElementById("resume-container").innerHTML = html;
}

window.onload = displayResume;
