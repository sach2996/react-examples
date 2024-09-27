import Navbar from "../../Navbar";
import ExpenseBar from "./ExpenseBar";
import "../style/style.css";
import Balances from "./Balances";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { expenseAtom, userExpenseAtom } from "../store/expense";
import { tokenAtom } from "../store/token";
import Topbar from "./Topbar";
import config from "../../../../config";
import { userAtom } from "../store/user";
import { balanceAtom } from "../store/balance";
export default function Split() {
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  const setExpense = useSetRecoilState(expenseAtom);
  const [token, setToken] = useRecoilState(tokenAtom);
  const user = useRecoilValue(userAtom);

  const setBalance = useSetRecoilState(balanceAtom);

  const setUserExpense = useSetRecoilState(userExpenseAtom);

  useEffect(() => {
    const localStorageItem = localStorage.getItem("token");

    if (localStorageItem) {
      setToken(localStorageItem);
    }

    const getExpenses = async () => {
      // const username = localStorage.getItem("username");
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `${config.backendUrl}/api/transaction/${user.username}`,
          {
            headers,
          }
        );
        setExpense(response.data.transactions);
        setUserExpense(response.data.transactions);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    const getBalance = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${config.backendUrl}/api/balance`, {
          headers,
        });
        setBalance(response.data.balance);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };
    if (token) {
      //if (token || localStorage.getItem("token")) {
      getExpenses();
      getBalance();
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
