import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./components/Todo/components/Todo";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <div className="home-container">
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
