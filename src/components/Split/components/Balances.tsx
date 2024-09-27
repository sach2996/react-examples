import AddExpense from "./AddExpense";
import { useRecoilState, useRecoilValue } from "recoil";
import { showModalAtom } from "../store/showModal";
import { balanceAtom } from "../store/balance";
import ProfilePicture from "./ProfilePicture";
import { friendsAtom } from "../store/friends";

// interface UserBalance {
//   username: string;
//   owed: number;
//   groups: Group[];
//   friends: Friend[];
// }

// interface Group {
//   groupName: string;
//   balance: number;
// }

interface Friends {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  balance: number;
}
// interface Friend {
//   username: string;
//   balance: number;
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

  const balance = useRecoilValue(balanceAtom);
  const friends = useRecoilValue(friendsAtom);

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
      {/* {balance.groups.map(
        (item: Group) =>
          item.groupName != "null" && (
            <div className="balances-bottom-bar" key={item.groupName}>
              {item.groupName} {item.balance}
            </div>
          )
      )} */}
      {/* {balance.friends.map((item: Friend) => (
        <div className="balances-bottom-bar" key={item.username}>
          {item.username} {item.balance}
        </div>
      ))} */}
      {friends.map((friend: Friends) => (
        <div key={friend.username} className="friend-item">
          <div className="friend-item-left">
            <ProfilePicture
              firstName={friend.firstname}
              lastName={friend.lastname}
            />
            {friend.firstname} {friend.lastname}
          </div>
          <div className="friend-item-right">
            {friend.balance < 0 && (
              <span
                style={{
                  backgroundColor: "#fca5a5",
                  padding: "2px",
                  borderRadius: "6px",
                }}
              >
                You owe CAD $ {friend.balance}
              </span>
            )}
            {friend.balance > 0 && (
              <span
                style={{
                  backgroundColor: "#aed1ae",
                  padding: "2px",
                  borderRadius: "6px",
                }}
              >
                Owes you CAD $ {friend.balance}
              </span>
            )}
            {friend.balance == 0 && (
              <span
                style={{
                  backgroundColor: "#e0e0e0",
                  padding: "2px",
                  borderRadius: "6px",
                }}
              >
                You are settled up.
              </span>
            )}
          </div>
        </div>
      ))}

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
