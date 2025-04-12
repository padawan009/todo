import ReactDOM from 'react-dom'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './App.css'

function App() {
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    date: '',
    priority: 'none',
    projectId: '',
  });

  function handleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function handleTaskForm() {
    if (projects.length === 0) {
      alert("Please create or select project");
      return;
    }
    setShowTaskForm(!showTaskForm)
  }

  function handleAddClick() {
    if(projectName.trim()) {
      const newProject = {
        id: uuidv4(),
        name: projectName,
      };
      setProjects([...projects, newProject])
      setProjectName('');
      setShowProjectForm(false)
    }
  }

  function handleAddTask() {
    if (taskData.title && selectedProjectId) {
      const newTask = {
        ...taskData,
        id: uuidv4(),
        projectId: selectedProjectId,
      };
      setTasks((task) => [...task, newTask])
      setTaskData({
        id: uuidv4(),
        title: '',
        description: '',
        date: '',
        priority: 'none',
        projectId: '',
      })
      setShowTaskForm(false);
    }
  }

  function removeProject(id) {
    const updatedProjectList = projects.filter((project) => project.id !== id)
    setProjects(updatedProjectList);
  }

  function removeTask(id) {
    const updatedTaskList = tasks.filter(task => task.id !== id)
    setTasks(updatedTaskList);
  }

  return (
    <div className="main-container">
      <div className="project-container">
        <h2>Projects</h2>
        <div>
          <button className="add-button" onClick={handleProjectForm}>+</button>
          <p style={{ fontSize: "1.1rem"}}>Add project</p>
        </div>

        {showProjectForm && (
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
        )}
 
        {projects.length > 0 && (
            <ul>
              {projects.map((project) => (
                  <li key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}>
                    {project.name}
                  <button className="trash-btn" style={{ marginLeft: '20px' }} onClick={() => removeProject(project.id)}>    
                  <FontAwesomeIcon icon={faTrash} /></button>
                  </li>
                ))}
            </ul>
          )
        }       
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <div className='task-container__block'>
          <button className="add-button" onClick={handleTaskForm}>+</button>
          <p style={{ fontSize: "1.1rem"}}>Add task</p>
        </div>

      {showTaskForm && (
        <div className='task-form'>
          <button className='close-task-form-btn' onClick={handleTaskForm}>x</button>
          <div>
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              value={taskData.title}
              onChange={(e) => setTaskData({...taskData, title: e.target.value})}
              style={{marginLeft: "10px"}}/>            
          </div>
          <textarea 
            name="description" 
            id="description" 
            maxLength={300} 
            rows={5} 
            cols={32}
            value={taskData.description}
            onChange={(e) => setTaskData({...taskData, description: e.target.value})}></textarea>
          <div className='task-form-row'>
            <input 
              type="date"
              value={taskData.date}
              onChange={(e) => setTaskData({...taskData, date: e.target.value})}/>
            <select 
              name="priority" 
              id="priority"
              value={taskData.priority}
              onChange={(e) => setTaskData({...taskData, priority: e.target.value})}>
              <option value="none">None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button className='task-form-btn' onClick={handleAddTask}>Add</button>
        </div>
      )}

        {tasks
          .filter((task) => task.projectId === selectedProjectId)
          .map((task) => (
            <div className="task-card" key={task.id}>
              <p style={{marginBottom: "10px"}}><strong>{task.title}</strong></p>
              <div style={{ display: "flex"}}>
                <p className='task-card__description'>{task.description}</p>                
                <div style={{ marginLeft: "30px", display: "flex", flexDirection: "column" }}>
                  <p>{task.date}</p>
                  <p className='task-card__priority'>{task.priority}</p>
                </div>
                <button className="trash-btn" onClick={() => removeTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} /></button>   
              </div>
           </div>
       
          ))
        }   

      </div>

    </div>
  )
}

export default App
