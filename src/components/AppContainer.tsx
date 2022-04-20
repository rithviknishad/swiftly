import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 transition-all text-gray-800 dark:text-gray-400">
      {props.children}
    </div>
  );
}
