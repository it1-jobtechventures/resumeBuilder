import React from 'react'

const TemplateCard = ({ template, onSelect }) => {
  return (
    <>
      <main>
        <div className="border p-4 rounded-md cursor-pointer" onClick={() => onSelect(template)}>
          <img src={template.image} alt={template.name} className="w-full h-48 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">{template.name}</h3>
        </div>
      </main>
    </>
  )
}

export default TemplateCard