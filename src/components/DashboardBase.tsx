import React, { ReactNode, useState } from "react";

export default function DashboardBase(props: { children: ReactNode }) {
  // Sidebar Expanded State Handling Logic
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  return <div className="">{props.children}</div>;
}
