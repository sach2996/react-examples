import { atom } from "recoil";

export const friendsAtom = atom({
  key: "friendsAtom",
  default: [],
});

export const groupsAtom = atom({
  key: "groupsAtom",
  default: [],
});
