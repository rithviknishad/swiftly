import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return <div className="bg-white">{props.children}</div>;
}
