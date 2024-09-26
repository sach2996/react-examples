import AddExpense from "./AddExpense";
import { useRecoilState } from "recoil";
import { showModalAtom } from "../store/showModal";

// interface UserExpenses {
//   username: string;
//   email: string;
//   balance: number;
//   owed: number;
//   paid: number;
//   transactions: TransactionItem[];
// }
export interface TransactionItem {
  transaction: Transaction;
  shares: Share[];
}

interface Transaction {
  _id: string;
  username: string;
  email: string;
  description: string;
  currency: string;
  amount: number;
  date: string; // You can use Date type if it's parsed as a Date object
  __v: number;
}

interface Share {
  _id: string;
  transaction_id: string;
  username: string;
  email: string;
  owed: number;
  paid: number;
  input: string; // If input could be of multiple types, change to appropriate types
  calculated_amount: number;
  __v: number;
}

export default function Balances() {
  const [showModal, setShowModal] = useRecoilState(showModalAtom);

  const handleAddExpense = () => {
    setShowModal(true);
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };
  return (
    <div className="balances-screen">
      <div className="balances-top-bar">
        <h4>Balances</h4>
        <span>
          <button onClick={handleAddExpense}>Add Expense</button>
          <button hidden>Settle Up</button>
        </span>
      </div>

      <div className="balances-bottom-bar">sample</div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <AddExpense />
          </div>
        </div>
      )}
    </div>
  );
}
