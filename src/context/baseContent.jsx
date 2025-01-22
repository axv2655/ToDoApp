import React, { createContext, useContext, useState } from "react";

const BaseContext = createContext(undefined);
import ProjectData from "../data/projectdata.json";
export const BaseContextProvider = ({ children }) => {
  const [selectedProjectInfo, setSelectedProjectInfo] = useState(null);
  const [modalType, setModalType] = useState("");
  const [dropdownType, setDropdownType] = useState("");
  const [title, setTitle] = useState("To Do");
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [page, setPage] = useState("");
  const [projects, setProjects] = useState(ProjectData);
  return (
    <BaseContext.Provider
      value={{
        selectedProjectInfo,
        setSelectedProjectInfo,
        modalType,
        setModalType,
        dropdownType,
        setDropdownType,
        title,
        setTitle,
        selectedProject,
        setSelectedProject,
        page,
        setPage,
        setProjects,
        projects,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export const useBaseContext = () => {
  const context = useContext(BaseContext);

  if (!context) {
    throw new Error("useBaseContext must be used within a BaseContextProvider");
  }

  return context;
};
