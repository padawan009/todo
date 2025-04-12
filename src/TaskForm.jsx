import React from "react";

function TaskForm({ taskData, setTaskData, handleTaskForm, handleAddTask }) {
  return (
    <div className="task-form">
      <button className="close-task-form-btn" onClick={handleTaskForm}>
        x
      </button>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <textarea
        name="description"
        id="description"
        maxLength={300}
        rows={5}
        cols={32}
        value={taskData.description}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      ></textarea>
      <div className="task-form-row">
        <input
          type="date"
          value={taskData.date}
          onChange={(e) => setTaskData({ ...taskData, date: e.target.value })}
        />
        <select
          name="priority"
          id="priority"
          value={taskData.priority}
          onChange={(e) =>
            setTaskData({ ...taskData, priority: e.target.value })
          }
        >
          <option value="none">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button className="task-form-btn" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}

export default TaskForm;
