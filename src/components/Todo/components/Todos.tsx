import { useRecoilState, useRecoilValue } from "recoil";
import { todoAtam } from "../store/atoms/todo";
import ITodo from "./ITodo";
import {
  currentPageAtom,
  itemsPerPageAtom,
  totalPagesAtom,
} from "../store/atoms/pagination";
// import { useState } from "react";

export default function Todos() {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [itemsPerPage, setItemsPerPage] = useRecoilState(itemsPerPageAtom);
  const totalPages = useRecoilValue(totalPagesAtom);

  const todosList: ITodo[] = useRecoilValue(todoAtam);
  console.log(todosList);
  return (
    <div className="todo-section">
      {todosList.map((item) => (
        <div key={item.id} className="section-style todo-item-style">
          <div className="todo-item">
            <h3>{item.todo}</h3>
            {/* {item.userId} */}
          </div>
          <div className="todo-item">
            <button>
              {item.completed === false ? "Mark As Completed" : "Completed"}
            </button>
          </div>
        </div>
      ))}
      <div className="section-style" style={{ flexDirection: "row-reverse" }}>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        >
          <option value={3}>3 per page</option>
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
        </select>
      </div>
      <div className="section-style">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
