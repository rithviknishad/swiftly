import { Board } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";

export const currentAccount: () => {
  name: string;
  username: string;
} | null = () => {
  const accountData = localStorage.getItem("current_account");
  if (!accountData) return null;
  const result = JSON.parse(accountData);
  if (result.username === "") return null;
  return result;
};

export const getAuthToken = () => localStorage.getItem("token");

export const setAuthToken = (token: string) =>
  localStorage.setItem("token", token);

export const clearAuthToken = () => localStorage.removeItem("token");

export const isAuthenticated = () => getAuthToken() !== null;

export const getLocalBoards: () => Model<Board>[] = () => {
  const jsonData = localStorage.getItem("boards");
  return jsonData ? JSON.parse(jsonData) : [];
};

export const updateLocalBoards = (boards: Model<Board>[]) => {
  localStorage.setItem("boards", JSON.stringify(boards));
};

export const updateLocalBoard = (board: Model<Board>) => {
  updateLocalBoards(
    getLocalBoards().map((b) => (b.id === board.id ? board : b))
  );
};
