import { atom } from "recoil";

export const expenseAtom = atom({
  key: "expenseAtom",
  default: [],
});
export const userExpenseAtom = atom({
  key: "userExpenseAtom",
  default: {
    username: "",
    owe: 0,
    receive: 0,
    balance: 0,
    paid: 0,
    transactions: [],
  },
});
