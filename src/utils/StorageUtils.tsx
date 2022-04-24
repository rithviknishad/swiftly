import { Board, Status, Task } from "../types/BoardTypes";
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

export const getLocalBoards = () => {
  const jsonData = localStorage.getItem("boards");
  return (jsonData ? JSON.parse(jsonData) : []) as Model<Board>[];
};

export const updateLocalBoards = (boards: Model<Board>[]) => {
  localStorage.setItem("boards", JSON.stringify(boards));
};

export const updateLocalBoard = (board: Model<Board>) => {
  updateLocalBoards(
    getLocalBoards().map((b) => (b.id === board.id ? board : b))
  );
};

export const getLocalTasks = (boardId: number) => {
  const jsonData = localStorage.getItem(`tasks_${boardId}`);
  return (jsonData ? JSON.parse(jsonData) : []) as Model<Task>[];
};

export const updateLocalTasks = (boardId: number, tasks: Model<Task>[]) => {
  localStorage.setItem(`tasks_${boardId}`, JSON.stringify(tasks));
};

export const getLocalStatus = () => {
  const jsonData = localStorage.getItem("status");
  return (jsonData ? JSON.parse(jsonData) : []) as Model<Status>[];
};

export const updateLocalStatus = (status: Model<Status>[] | Model<Status>) => {
  if (Array.isArray(status)) {
    localStorage.setItem("status", JSON.stringify(status));
  } else {
    localStorage.setItem(
      "status",
      JSON.stringify(
        getLocalStatus().map((s) => (s.id! === status.id! ? status : s))
      )
    );
  }
};
