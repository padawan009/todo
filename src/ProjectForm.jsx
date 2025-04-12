import React from 'react'

function ProjectForm({ projectName, setProjectName, handleAddClick, handleProjectForm}) {
  return (
    <div className="project-form">
    <h3>Enter project name</h3>
    <input
      type="text" 
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}/>
    <div className='button-container'>
      <button type="button" onClick={handleAddClick}>Add</button>
      <button type="button" onClick={handleProjectForm}>Cancel</button>          
    </div>
  </div>
  )
}

export default ProjectForm