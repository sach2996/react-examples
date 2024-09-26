import "./App.css";
// import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Todo from "./components/Todo/components/Todo";
import { RecoilRoot } from "recoil";
import Split from "./components/Split/components/Split";
import Activity from "./components/Split/components/Activity";
import Signup from "./components/Split/components/Signup";
import Login from "./components/Split/components/Login";
import Friends from "./components/Split/components/Friends";
import Groups from "./components/Split/components/Groups";
function App() {
  return (
    <div className="home-container">
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/split" element={<Split />} /> */}

            <Route path="/" element={<Split />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/groups" element={<Groups />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
