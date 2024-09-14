import { atom } from "recoil";

export const currentPageAtom = atom({
  key: "currentPage",
  default: 1,
});

export const itemsPerPageAtom = atom({
  key: "itemsPerPage",
  default: 5,
});

export const totalPagesAtom = atom({
  key: "totalPages",
  default: 1,
});
