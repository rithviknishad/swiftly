import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return <div className="bg-[#F7F7F7]">{props.children}</div>;
}
