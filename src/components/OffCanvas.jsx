import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { CreateTaskModal } from "./CreateModal";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./OffCanvas.css";
import ProjectData from "../data/projectdata.json";
import { useBaseContext } from "../context/baseContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faHouse } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

function OffCanvas() {
  const [showCanvas, setShowCanvas] = useState(false);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const {
    setSelectedProjectInfo,
    setModalType,
    setTitle,
    setSelectedProject,
    setPage,
    projects,
    setProjects,
  } = useBaseContext();

  const handleCloseSave = () => {
    if (!taskValue.current || taskValue.current.value.trim() === "") {
      alert("Project name cannot be empty!");
      return;
    }

    setProjects((prevProjects) => [
      ...prevProjects,
      {
        id: Date.now(),
        name: taskValue.current.value.trim(),
        task_count: 0,
      },
    ]);

    taskValue.current.value = "";
    setShowModal(false);
  };

  const taskValue = useRef(null);

  return (
    <>
      <div className="project-button">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => {
            handleShowCanvas();
          }}
          style={{ color: "black", fontSize: "24px" }}
        />
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            onClick={() => {
              setPage("today");
              setSelectedProjectInfo(null);
              setTitle("Today's Tasks");
              setSelectedProject(undefined);
            }}
          >
            Today
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setPage("week");
              setSelectedProjectInfo(null);
              setTitle("This Week");
              setSelectedProject(undefined);
            }}
          >
            This Week
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setPage("month");
              setSelectedProjectInfo(null);
              setTitle("This Month");
              setSelectedProject(undefined);
            }}
          >
            This Month
          </Button>
        </ButtonGroup>
        <FontAwesomeIcon
          icon={faHouse}
          onClick={() => {
            setSelectedProjectInfo(null);
            setTitle("To Do");
            setSelectedProject(undefined);
            setPage("");
          }}
          id="home-icon"
        />
      </div>
      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Projects</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <li
                variant="light"
                onClick={() => {
                  handleCloseCanvas();
                  setSelectedProjectInfo(project);
                  setTitle(project.name);
                  setSelectedProject(project);
                  setPage("project");
                }}
                className="project-name"
              >
                {project.name}
              </li>
            </div>
          ))}
        </Offcanvas.Body>
        <div>
          <div className="add-project-div">
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => {
                handleShowModal();
                setModalType("project");
              }}
              className="add-project"
            />
          </div>
          <CreateTaskModal
            show={showModal}
            handleClose={handleCloseModal}
            taskValue={taskValue}
            handleCloseSave={handleCloseSave}
          />
        </div>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
