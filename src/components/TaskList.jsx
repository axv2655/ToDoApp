import { CreateTaskModal } from "./CreateModal";
import "./TaskList.css";
import React, { useState, useRef } from "react";
import TaskData from "../data/taskdata.json";
import ProjectData from "../data/projectdata.json";
import { useBaseContext } from "../context/baseContent";
import Button from "react-bootstrap/Button";

function TaskList() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState(
    TaskData.map((task) => ({
      ...task,
      date: new Date(task.date), // convert string date to date object
    }))
  );
  const [projects] = useState(ProjectData);
  const [selectedProject, setSelectedProject] = useState(undefined); // used for adding tasks modal
  const { selectedProjectInfo, setModalType, setDropdownType } =
    useBaseContext(); // used for tasks of project

  const taskValue = useRef(null);
  const taskDate = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseSave = () => {
    if (taskValue.current && taskDate.current && selectedProject) {
      const dates = new Date(taskDate.current.value);

      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          name: taskValue.current.value,
          date: dates,
          project: selectedProject.name,
          projectid: selectedProject.id,
        },
      ]);
      setSelectedProject(undefined);
      setShow(false);
    }
  };

  const handleTaskCompletion = (taskId, event) => {
    if (event.target.checked) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  return (
    <div className="task-list">
      <ul className="list-group">
        {tasks
          .sort((a, b) => {
            const dateA = a.date;
            const dateB = b.date;
            return dateA.getTime() - dateB.getTime();
          })
          .map((task) => {
            if (
              (selectedProjectInfo &&
                selectedProjectInfo.id === task.projectid) ||
              !selectedProjectInfo
            ) {
              return (
                <li key={task.id}>
                  <div className="form-check">
                    <div>
                      <input
                        type="checkbox"
                        id={`checkbox-${task.id}`}
                        className="form-check-input"
                        onChange={(event) =>
                          handleTaskCompletion(task.id, event)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`checkbox-${task.id}`}
                      >
                        {task.name}
                      </label>
                    </div>
                  </div>
                  <div className="task-details">
                    <label className="task-time">
                      {task.date.toLocaleTimeString()}
                    </label>
                    <label className="task-date">
                      {task.date.toLocaleDateString()}
                    </label>
                  </div>
                </li>
              );
            }
            return null;
          })}
      </ul>
      <div className="add-task">
        <Button
          variant="primary"
          onClick={() => {
            handleShow();
            setModalType("task");
          }}
        >
          Add Task
        </Button>
        <CreateTaskModal
          show={show}
          handleClose={handleClose}
          taskValue={taskValue}
          taskDate={taskDate}
          selectedProject={selectedProject}
          projects={projects}
          setSelectedProject={setSelectedProject}
          handleCloseSave={handleCloseSave}
        />
      </div>
    </div>
  );
}

export default TaskList;
