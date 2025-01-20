import TaskBar from "./components/TaskBar";
import "./App.css";
import TaskList from "./components/TaskList";
import OffCanvas from "./components/OffCanvas";
import { BaseContextProvider } from "./context/baseContent";
function App() {
  return (
    <div>
      <BaseContextProvider>
        <OffCanvas />
        <TaskBar />
        <TaskList />
      </BaseContextProvider>
    </div>
  );
}

export default App;
