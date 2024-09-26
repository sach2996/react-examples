import { useSetRecoilState } from "recoil";
import { showModalAtom } from "../store/showModal";

export default function AddExpense() {
  const setShowModal = useSetRecoilState(showModalAtom);

  return (
    <div className="add-expense-container">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h4>New Expense</h4>
      </div>
      <div className="add-expense-section">
        <div className="add-expense-section-item">
          <label>Description</label>
          <input placeholder="Starbuck's coffee" />
        </div>
        <div className="add-expense-section-item">
          <label>Amount</label>
          <input placeholder="0.00" />
        </div>
      </div>
      <div className="add-expense-section">
        <div className="add-expense-section-item">
          <label>Date</label>
          <input placeholder="Starbuck's coffee" />
        </div>
        <div className="add-expense-section-item">
          <label>Category</label>
          <input placeholder="0.00" />
        </div>
      </div>

      <div className="add-expense-section">
        <div className="add-expense-section-item">
          <p>
            Paid by <b>You</b>
          </p>
        </div>
        <div className="add-expense-section-item">
          <a>Change Payer</a>
        </div>
      </div>

      <div className="add-expense-section">
        <div className="add-expense-section-item">
          <p>Split</p>
        </div>
        <div className="add-expense-section-item">
          <a>%</a>
        </div>
      </div>

      <div className="add-expense-section">
        <div className="add-expense-section-item">
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
        <div className="add-expense-section-item">
          <button>Create</button>
        </div>
      </div>
    </div>
  );
}
