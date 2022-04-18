import { User } from "./UserTypes";

export type Errors<T> = Partial<Record<keyof T, string>>;

export type DashboardPageTabProps = {
  name: string;
  isSelected: boolean;
  onClickCB: () => void;
};

export type DashboardPageProps = {
  user: User;
  pages: DashboardPageProps[];
};
