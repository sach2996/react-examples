import { atom } from "recoil";

export const expenseAtom = atom({
  key: "expenseAtom",
  default: [],
});
export const userExpenseAtom = atom({
  key: "userExpenseAtom",
  default: {
    balance: 0,
    credit: 0,
    debit: 0,
  },
});
