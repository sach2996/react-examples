import { useEffect } from "react";
import Navbar from "../../Navbar";
import CreateTodo from "./CreateTodo";
import "./Todo.css";
import axios from "axios";
import Todos from "./Todos";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoAtam } from "../store/atoms/todo";
import {
  currentPageAtom,
  itemsPerPageAtom,
  totalPagesAtom,
} from "../store/atoms/pagination";
export default function Todo() {
  const setTodos = useSetRecoilState(todoAtam);

  const currentPage = useRecoilValue(currentPageAtom);
  const itemsPerPage = useRecoilValue(itemsPerPageAtom);
  const setTotalPages = useSetRecoilState(totalPagesAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/todos?limit=${itemsPerPage}&skip=${
            (currentPage - 1) * itemsPerPage
          }`
        );
        setTodos(response.data.todos);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <Navbar />
      <div className=" todo-container">
        <div className="todo-section">
          <h2>Todo Application</h2>
        </div>
        <CreateTodo />
        <Todos />
      </div>
    </div>
  );
}
