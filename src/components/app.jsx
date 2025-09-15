import FormPart from "./formPart";
import Info from "./info";
import Todos from "./todos";
import "../style.css";
import { useEffect, useState } from "react";
import { TodosContext } from "../context/todosContext";

const App = () => {
  const dataLS = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(dataLS !== null || dataLS != [] ? dataLS : []);
  const [searchTodos, setSearchTodos] = useState([]);
  const [theme, setTheme] = useState("dark");



  return (
    <div className={`container ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg"></div>
      <div className="to-do-app">
        <TodosContext.Provider
          value={{
            todos,
            setTodos,
            searchTodos,
            setSearchTodos,
          }}
        >
          <Info theme={theme} setTheme={setTheme} />
          <FormPart />
          <Todos />
        </TodosContext.Provider>
      </div>
    </div>
  );
};

export default App;
