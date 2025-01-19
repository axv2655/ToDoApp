import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext(undefined);

export const ProjectProvider = ({ children }) => {
  const [selectedProjectInfo, setSelectedProjectInfo] = useState(null);

  return (
    <ProjectContext.Provider
      value={{ selectedProjectInfo, setSelectedProjectInfo }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
