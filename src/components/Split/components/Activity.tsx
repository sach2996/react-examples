import { useRecoilValue } from "recoil";
import Navbar from "../../Navbar";
import "../style/style.css";
import { expenseAtom } from "../store/expense";
import { TransactionItem } from "./Balances";
import { format } from "date-fns";
import Topbar from "./Topbar";

export default function Split() {
  const expense = useRecoilValue(expenseAtom);

  function formatCurrency(value: number) {
    const amountValue = `CA$ ${(value / 100).toFixed(2)}`;
    return (
      <p>
        You are owed <b>{amountValue}</b>
      </p>
    );
  }

  return (
    <div className="home-style">
      <Navbar />
      <div className="activity-style">
        <Topbar />
        <div className="activity-header">
          <h3>Recent Activity</h3>
        </div>

        <div className="activity-body">
          {expense.map((item: TransactionItem) => (
            <div className="expense-item" key={item.transaction._id}>
              <div>
                <p>
                  <b>{item.transaction.username}</b> create an expense
                  <b> {item.transaction.description} </b>
                  in <b>Test Group</b>
                </p>
                {formatCurrency(item.transaction.amount)}
              </div>

              <div>
                <p>{format(new Date(item.transaction.date), "MM/dd/yyyy")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
