import { ModelProps } from "./CommonTypes";

export type Board = ModelProps & {
  title: string;
  description: string;
};

export type Status = ModelProps & {
  title: string;
  description: string;
  board: number;
};

export type Task = ModelProps & {
  status: number;
  board: number;
  title: string;
  description: string;
};
