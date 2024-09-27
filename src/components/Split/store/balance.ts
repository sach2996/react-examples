import { atom } from "recoil";

export const balanceAtom = atom({
  key: "balanceAtom",
  default: {
    username: "",
    balanceTotal: 0,
    groups: [],
    friends: [],
  },
});
