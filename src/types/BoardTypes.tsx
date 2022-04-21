import { Model } from "./CommonTypes";
import { Errors } from "./DashboardPageTypes";

export type Board = {
  title: string;
  description: string;
};

export type Status = {
  title: string;
  description: string;
  board: number;
  is_completed: boolean;
};

export type Task = {
  status: number;
  board: number;
  title: string;
  description: string;
  status_object?: Model<Status>;
  board_object?: Model<Board>;
};

export const validateBoard = (board: Board) => {
  const e: Errors<Board> = {};
  if (board.title.length < 1) e.title = "Required";
  if (board.title.length > 100) e.title = "Must be less than 100 characters";
  return e;
};

export const validateStatus = (status: Status) => {
  const e: Errors<Board> = {};
  if (status.title.length < 1) e.title = "Required";
  if (status.title.length > 100) e.title = "Must be less than 100 characters";
  return e;
};

export const validateTask = (task: Task) => {
  const e: Errors<Board> = {};
  if (task.title.length < 1) e.title = "Required";
  if (task.title.length > 100) e.title = "Must be less than 100 characters";
  return e;
};
