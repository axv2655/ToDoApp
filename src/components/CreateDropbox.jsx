import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export function CreateDropbox({
  selectedProject,
  projects,
  setSelectedProject,
}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedProject ? selectedProject.name : "Select Project"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {projects.map((project) => (
          <Dropdown.Item
            key={project.id}
            onClick={() => setSelectedProject(project)}
          >
            {project.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
