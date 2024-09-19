import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../store/user";
import { tokenAtom } from "../store/token";
import { expenseAtom, userExpenseAtom } from "../store/expense";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setUser = useSetRecoilState(userAtom);
  const setUserExpense = useSetRecoilState(userExpenseAtom);
  const setExpense = useSetRecoilState(expenseAtom);

  function handleLogout() {
    setToken("");
    setUser({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
    });
    setExpense([]);
    setUserExpense({
      balance: 0,
      credit: 0,
      debit: 0,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className="topbar-style">
      <div> </div>
      <div>
        Hello{" "}
        <b>
          {user.firstname} {user.lastname}
        </b>
        <button style={{ marginLeft: "2px" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
