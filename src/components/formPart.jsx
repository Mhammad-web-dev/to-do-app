import { useContext, useEffect } from "react";
import { TodosContext } from "../context/todosContext";

const FormPart = () => {
  const { todos, setTodos, searchTodos, setSearchTodos } =
    useContext(TodosContext);

  const handelAddTodo = (e) => {
    const inputValue = document.querySelector(".input-todo");
    const date = new Date();
    const dataLS = JSON.parse(localStorage.getItem("todos"));
    const valueRepeated = dataLS.filter((t) => t.name === inputValue.value);

    if (inputValue.value.trim() === "") return;

    if (e.target.innerHTML === "add") {
      if (valueRepeated.length > 0) return;
      setTodos([
        {
          name: inputValue.value,
          hours: date.toLocaleTimeString(),
          date: date.toLocaleDateString(),
          action: "not-done",
        },
        ...todos,
      ]);
    } else if (e.target.innerHTML === "search") {
      setSearchTodos(todos.filter((t) => t.name === inputValue.value));
    }

    inputValue.value = "";
  };

  const handelDeleteAll = () => {
    setTodos([]);
  };

  const handelChangeBtn = (e) => {
    const sendBtn = document.querySelector(".send-btn");
    sendBtn.innerHTML = e.target.innerHTML;

    document
      .querySelectorAll(".form-change")
      .forEach((b) => b.classList.remove("active"));

    e.target.classList.add("active");

    if (e.target.innerHTML == "add") setSearchTodos([]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="form">
      <div className="form-item">
        <input type="text" className="input-todo" placeholder="add item..." />
        <button className="send-btn" onClick={handelAddTodo} type="button">
          add
        </button>
      </div>
      <div className="form-change-mode-container">
        <button
          onClick={handelChangeBtn}
          className="form-change add-btn active"
          type="button"
        >
          add
        </button>
        <button
          onClick={handelChangeBtn}
          className="form-change search-btn"
          type="button"
        >
          search
        </button>
        <button
          onClick={handelDeleteAll}
          className={`delete-all ${todos.length === 0 ? "disable" : ""}`}
          type="button"
        >
          delete all
        </button>
      </div>
    </div>
  );
};

export default FormPart;
