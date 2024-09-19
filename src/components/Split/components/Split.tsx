import Navbar from "../../Navbar";
import ExpenseBar from "./ExpenseBar";
import "../style/style.css";
import Balances from "./Balances";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSetRecoilState, useRecoilState } from "recoil";
import { expenseAtom, userExpenseAtom } from "../store/expense";
import { tokenAtom } from "../store/token";
import Topbar from "./Topbar";
import config from "../../../../config";
export default function Split() {
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  const setExpense = useSetRecoilState(expenseAtom);
  const [token, setToken] = useRecoilState(tokenAtom);

  const setUserExpense = useSetRecoilState(userExpenseAtom);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("token");
    console.log(localStorageItem);
    if (localStorageItem) {
      setToken(localStorageItem);
    }
    const getExpenses = async (username: string) => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `${config.backendUrl}/api/split/transaction/${username}`,
          { headers }
        );
        setExpense(response.data.transactions);
        setUserExpense(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };
    if (token) {
      getExpenses("testuser");
    } else {
      return navigate("/login");
    }
  }, [token]);

  return (
    <div className="home-style">
      <Navbar />
      <div className="split-home">
        <Topbar />
        <ExpenseBar />
        <Balances />
      </div>
    </div>
  );
}
