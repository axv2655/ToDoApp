import React, { createContext, useContext, useState } from "react";

const BaseContext = createContext(undefined);

export const BaseContextProvider = ({ children }) => {
  const [selectedProjectInfo, setSelectedProjectInfo] = useState(null);
  const [modalType, setModalType] = useState("");
  const [dropdownType, setDropdownType] = useState("");
  return (
    <BaseContext.Provider
      value={{
        selectedProjectInfo,
        setSelectedProjectInfo,
        modalType,
        setModalType,
        dropdownType,
        setDropdownType,
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
