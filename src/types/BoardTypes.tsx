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
};

export const validateBoard = (board: Board) => {
  const errors: Errors<Board> = {};

  if (board.title.length < 1) {
    errors.title = "Title is required";
  }
  if (board.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  return errors;
};

export const validateStatus = (status: Status) => {
  const errors: Errors<Board> = {};

  if (status.title.length < 1) {
    errors.title = "Title is required";
  }
  if (status.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  return errors;
};
