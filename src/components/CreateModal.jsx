import { CreateDropbox } from "./CreateDropbox";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { useBaseContext } from "../context/baseContent";

export function CreateTaskModal({
  show,
  handleClose,
  taskValue,
  taskDate,
  selectedProject,
  projects,
  setSelectedProject,
  handleCloseSave,
}) {
  let modalInfo = {};
  const { modalType, selectedProjectInfo } = useBaseContext();
  // if (selectedProjectInfo) {
  //   setSelectedProject(selectedProjectInfo);
  // }
  if (modalType === "task") {
    modalInfo.heading = "Add Task";
    modalInfo.body = (
      <>
        <input type="text" placeholder="Task Name" ref={taskValue} autoFocus />
        <input type="datetime-local" ref={taskDate} />
        {!selectedProjectInfo ? (
          <CreateDropbox
            selectedProject={selectedProject}
            projects={projects}
            setSelectedProject={setSelectedProject}
          />
        ) : null}
      </>
    );
    modalInfo.button = (
      <>
        <Button
          variant="primary"
          onClick={handleCloseSave}
          // disabled={!selectedProject}
        >
          Add Task
        </Button>
      </>
    );
  } else if (modalType === "project") {
    modalInfo.heading = "Add Project";
    modalInfo.body = (
      <>
        <input
          type="text"
          placeholder="Project Name"
          ref={taskValue}
          autoFocus
        />
      </>
    );
    modalInfo.button = (
      <>
        <Button variant="primary" onClick={handleCloseSave}>
          Add Project
        </Button>
      </>
    );
  }
  return (
    <>
      <Modal show={show} backdrop={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalInfo.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {modalInfo.button}
        </Modal.Footer>
      </Modal>
    </>
  );
}
