import { navigate } from "raviger";
import { ReactNode, useEffect } from "react";
import { isAuthenticated } from "../utils/StorageUtils";

export default function Authenticated(props: { children: ReactNode }) {
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  });
  return <>{props.children}</>;
}
