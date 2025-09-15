import { use, useContext, useEffect } from "react";
import { TodosContext } from "../context/todosContext";

const Info = ({ setTheme, theme }) => {
  const { todos } = useContext(TodosContext);
  const doneInfo = document.querySelector(".count-done span");
  const notDoneInfo = document.querySelector(".count-not-done span");
  const countDoneLength = todos.filter((t) => t.action === "done");
  const countNotDoneLength = todos.filter((t) => t.action === "not-done");

  const handelSetTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    localStorage.setItem(
      "theme",
      theme === "dark" ? JSON.stringify("light") : JSON.stringify("dark")
    );
  };

  useEffect(() => {
    const dataTheme = JSON.parse(localStorage.getItem("theme"));

    if (dataTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);


  useEffect(() => {
    const themeSwitcher = document.querySelector(".theme-switcher");
    if (theme === "light") {
      themeSwitcher.setAttribute("src", "../public/images/moon-icon-23623.png");
    } else {
      themeSwitcher.setAttribute("src", "../public/images/sun-3-24.png");
    }
  }, [theme]);

  return (
    <div className="title-container">
      <h1>to do app</h1>
      <img
        onClick={handelSetTheme}
        className="theme-switcher"
        src={""}
        width={"25px"}
        height={"25px"}
        alt={"moon"}
      />
      <div className="info">
        <span className="count-done">
          done : <span>{String(countDoneLength.length)}</span>
        </span>
        <span className="count-not-done">
          not done : <span>{String(countNotDoneLength.length)}</span>
        </span>
      </div>
    </div>
  );
};

export default Info;
