import ReactDOM from 'react-dom'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm';
import ProjectForm from './ProjectForm';

import './App.css'

function App() {
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([{ id: uuidv4(), name: "first project" }]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState([]);  
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'none',
    projectId: null,
  });
  

  function handleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function handleTaskForm() {
    if (projects.length === 0) {
      alert("Please create project");
      return;
    } 
    if (!selectedProjectId) {
      alert("Please select project");
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
    if (taskData.title) {
      const newTask = {
        ...taskData,
        id: uuidv4(),
        projectId: selectedProjectId,  // чтобы привязать задачи к конкретному проекту (присваиваем id проекта)
      };
      setTasks((task) => [...task, newTask])
      setTaskData({
        title: '',
        description: '',
        date: '',
        priority: 'none',
        projectId: null,
      })
      setShowTaskForm(false);
    }
  }

  function removeProject(id) {
    const updatedProjectList = projects.filter(project => project.id !== id)
    const updatedTaskList = tasks.filter(task => task.projectId !== id); // удаляем задачи удаленного проекта
    setProjects(updatedProjectList);
    setTasks(updatedTaskList);
    if (selectedProjectId == id) {
      setSelectedProjectId(null);
    }
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
          <ProjectForm projectName={projectName} setProjectName={setProjectName} 
          handleAddClick={handleAddClick} handleProjectForm={handleProjectForm} />
        )}
 
        {projects.length > 0 && (
            <ul>
              {projects.map((project) => (
                  <li key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  style={{ 
                    fontWeight: project.id === selectedProjectId ? "700" : "400",
                    color: project.id === selectedProjectId ? "rgb(227, 121, 181)" : "grey" }}>
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

      {showTaskForm && selectedProjectId && (
        <TaskForm taskData={taskData} setTaskData={setTaskData} 
        handleAddTask={handleAddTask} handleTaskForm={handleTaskForm}/>
      )}

        {tasks
          .filter((task) => task.projectId === selectedProjectId)
          .map((task) => (
            <div className="task-card" key={task.id}>
              <p style={{marginBottom: "10px", color: "white"}}><strong>{task.title}</strong></p>
              <div style={{ display: "flex"}}>
                <p className='task-card__description'>{task.description}</p>                
                <div style={{ marginLeft: "30px", display: "flex", flexDirection: "column", color: "white" }}>
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
