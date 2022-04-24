import { ReactNode } from "react";
import { User } from "./UserTypes";

export type Errors<T> = Partial<Record<keyof T, string>>;

export type DashboardTabProps = {
  name: string;
  onClickCB: () => void;
  icon: ReactNode;
};

export type DashboardProps = {
  user: User;
  pages: DashboardProps[];
};
