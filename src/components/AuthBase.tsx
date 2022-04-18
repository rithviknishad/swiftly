import { ReactNode } from "react";

export default function AuthBase(props: { children: ReactNode }) {
  return (
    <div className="grid place-items-center h-screen">{props.children}</div>
  );
}
