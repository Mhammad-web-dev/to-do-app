import { useContext, useEffect } from "react";
import { TodosContext } from "../context/todosContext";

const Todos = () => {
  const { todos, setTodos, searchTodos, setSearchTodos } =
    useContext(TodosContext);

  const currentTodos = searchTodos.length === 0 ? todos : searchTodos;

  const handelChange = (e) => {
    setSearchTodos([]);
    const index = parseInt(e.target.getAttribute("data-index"));

    setTodos(
      todos.map((todo, idx) => {
        return idx === index
          ? { ...todo, action: todo.action === "done" ? "not-done" : "done" }
          : todo;
      })
    );
  };

  const handelDeleteTodo = (e) => {
    const index = e.target.getAttribute("data-index");

    setTodos(() => {
      return todos.filter((t, i) => i != index);
    });
  };

  const handelNameHover = (e) => {
    if (e.target.textContent.length > 6) {
      e.target.children[0].classList.add("active");
    }
  };

  const handelMouseLive = (e) => {
    e.target.children[0].classList.remove("active");
  };

  return (
    <div className="todos-container">
      <div className="todos">
        {currentTodos.length !== 0 ? (
          <table className="todos-table">
            <thead>
              <tr>
                <td>#</td>
                <td>name</td>
                <td>hours</td>
                <td>date</td>
                <td>operation</td>
                <td>done</td>
                <td>delete</td>
              </tr>
            </thead>

            <tbody>
              {currentTodos.map((t, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td
                    onMouseEnter={handelNameHover}
                    onMouseLeave={handelMouseLive}
                    className={`name-todo ${t.name.length > 6 ? "pointer" : ""}`}
                  >
                    {t.name.length > 6 ? (
                      <span className="name-todo-show">{t.name}</span>
                    ) : (
                      ""
                    )}

                    {t.name.length > 6 ? t.name.slice(0, 6) + "..." : t.name}
                  </td>
                  <td>{t.hours}</td>
                  <td>{t.date}</td>
                  <td
                    className={`operation-text ${
                      t.action === "done" ? "done" : "not-done"
                    }`}
                  >
                    {t.action}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      value="done"
                      className="check-doing"
                      data-index={i}
                      checked={t.action === "done"}
                      onChange={handelChange}
                    />
                  </td>
                  <td className="delete-btn">
                    <i
                      onClick={handelDeleteTodo}
                      data-index={i}
                      className="fa fa-close"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <p className="message-todos">you don't have any todo</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Todos;
