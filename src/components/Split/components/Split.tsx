import Navbar from "../../Navbar";
import ExpenseBar from "./ExpenseBar";
import "../style/style.css";
import Balances from "./Balances";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSetRecoilState, useRecoilValue } from "recoil";
import { expenseAtom, userExpenseAtom } from "../store/expense";
import { tokenAtom } from "../store/token";
import Topbar from "./Topbar";

export default function Split() {
  const navigate = useNavigate(); // Use useNavigate hook for redirection
  const setExpense = useSetRecoilState(expenseAtom);
  const token = useRecoilValue(tokenAtom);

  const setUserExpense = useSetRecoilState(userExpenseAtom);

  useEffect(() => {
    const getExpenses = async (username: string) => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `http://localhost:3000/api/split/transaction/${username}`,
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
