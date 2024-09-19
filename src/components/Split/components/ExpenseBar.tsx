import { useRecoilValue } from "recoil";
import { userExpenseAtom } from "../store/expense";
import "../style/style.css";
import ExpenseBarItem from "./ExpenseBarItem";
export default function ExpenseBar() {
  const items = [
    { id: 1, title: "Your Balance", type: "balance", balance: <></> },
    { id: 2, title: "Your Get", type: "get", balance: <></> },
    { id: 3, title: "Your Owe", type: "owe", balance: <></> },
  ];

  const userExpense = useRecoilValue(userExpenseAtom);
  items.map((item) => {
    if (item.type === "balance") {
      item.balance = formatCurrency(userExpense.balance);
    }
    if (item.type === "get") {
      item.balance = (
        <b style={{ color: "green" }}>
          CA$ {(userExpense.debit / 100).toFixed(2)}
        </b>
      );
    }
    if (item.type === "owe" && userExpense) {
      item.balance = (
        <b style={{ color: "red" }}>
          CA$ {(userExpense.credit / 100).toFixed(2)}
        </b>
      );
    }
  });

  function formatCurrency(value: number) {
    const amountValue = `CA$ ${(value / 100).toFixed(2)}`;
    if (value > 0) {
      return <b style={{ color: "green" }}>{amountValue}</b>;
    } else if (value === 0) {
      return <b>{amountValue}</b>;
    } else {
      return <b style={{ color: "red" }}>{amountValue}</b>;
    }
  }
  return (
    <div className="expense-bar">
      {items.map((item) => (
        <div key={item.id}>
          <ExpenseBarItem item={item} />
        </div>
      ))}
    </div>
  );
}
