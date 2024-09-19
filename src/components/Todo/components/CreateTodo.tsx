import { useState } from "react";
import "./Todo.css";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { todoAtam } from "../store/atoms/todo";
export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(6);
  const setTodos = useSetRecoilState(todoAtam);

  async function handleAddTodo() {
    try {
      setUserId(6);
      const reqBody = {
        todo: title,
        completed: false,
        userId: userId,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        "https://dummyjson.com/todos/add",
        reqBody,
        {
          headers,
        }
      );
      //       https://dummyjson.com/docs/todos
      //       Adding a new todo will not add it into the server.
      // It will simulate a POST request and will return the new created todo with a new id
      const result = response.data;
      setTodos(result);
    } catch (error) {
      console.error("error occured", error);
    }
  }
  return (
    <div className="todo-section">
      <input
        className="section-style"
        type="text"
        placeholder="Enter title here"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="section-style"
        type="text"
        placeholder="Enter description here"
      />
      <button className="section-style" onClick={handleAddTodo}>
        Add a Todo
      </button>
    </div>
  );
}
