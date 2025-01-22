import "./TaskBar.css";
import { useBaseContext } from "../context/baseContent";

function TaskBar() {
  const { title } = useBaseContext();
  return <h1> {title} </h1>;
}

export default TaskBar;
