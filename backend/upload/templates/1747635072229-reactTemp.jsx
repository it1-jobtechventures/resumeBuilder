import React from 'react'

const reactTemp = ({ formData }) => {
      const {
    name,
    email,
    phone,
    summary,
    education = [],
    experience = [],
    skills = [],
  } = formData || {};
  return (
    <div className="p-8 bg-white text-black font-sans max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">{name || "Your Name"}</h1>
        <p className="text-sm text-gray-600">
          {email} | {phone}
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
          <p className="text-sm">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
          {experience.map((job, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{job.role} - {job.company}</p>
              <p className="text-sm text-gray-600">{job.duration}</p>
              <p className="text-sm">{job.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.school} — {edu.year}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <li key={idx} className="bg-gray-200 px-2 py-1 text-sm rounded">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default reactTemp