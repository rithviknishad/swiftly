import { navigate } from "raviger";
import React, { ReactNode, useEffect, useState } from "react";
import { DashboardTabProps } from "../types/DashboardPageTypes";
import { listStatus, logout } from "../utils/ApiUtils";
import {
  currentAccount,
  isAuthenticated,
  updateLocalStatus,
} from "../utils/StorageUtils";

const DASHBOARD_TABS: DashboardTabProps[] = [
  { name: "Home", onClickCB: () => navigate("/home/") },
  { name: "Boards", onClickCB: () => navigate("/boards/") },
  { name: "To Do", onClickCB: () => navigate("/todo/") },
];

export default function DashboardBase(props: {
  children: ReactNode;
  selectedTabName: string;
}) {
  const [account] = useState(currentAccount());

  useEffect(() => {
    listStatus().then(updateLocalStatus);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (!isAuthenticated()) {
      navigate("/login");
    } else if (!account) {
      timeoutId = setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  });

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="flex-none flex flex-row gap-2 divide-x-2 divide-gray-100 min-h-max">
        <div className="flex-none w-56 p-2">
          <div className="p-4 flex flex-row">
            <p className="text-xl text-blue-700 dark:text-blue-200">Swiftly</p>
            {/* <div className="flex-1"></div> */}
            {/* <button onClick={(e) => toggleSidebar()}>{"<<"}</button> */}
          </div>
          <div className="flex flex-col items-start gap-2 px-2 py-4">
            {DASHBOARD_TABS.map((tab, index) => (
              <TabButton
                key={index}
                tab={{ ...tab, isSelected: tab.name === props.selectedTabName }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-row py-6 px-10 items-center gap-4">
          <SearchBar />
          <div className="flex-1"></div>
          <ThemeToggler />
          <AccountInfo account={account} />
        </div>
        <div className="flex-1 pt-4 pl-4">{props.children}</div>
      </div>
    </div>
  );
}

function TabButton(props: {
  tab: DashboardTabProps & { isSelected: boolean };
}) {
  const tab = props.tab;
  return (
    <button
      className={`${
        tab.isSelected
          ? "font-semibold bg-gray-100 dark:bg-gray-700"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      } rounded-lg py-2 w-full items-start text-gray-800 dark:text-gray-400`}
      onClick={(e) => tab.onClickCB()}
    >
      {tab.name}
    </button>
  );
}

function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="xl:w-96">
        <div className="input-group relative flex flex-row items-stretch w-full">
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon3"
          />
          <button
            className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            type="button"
            id="button-addon3"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeToggler() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const darkIcon = document.getElementById("theme-toggle-dark-icon");
    const lightIcon = document.getElementById("theme-toggle-light-icon");

    if (dark) {
      lightIcon?.classList.add("hidden");
      darkIcon?.classList.remove("hidden");
    } else {
      lightIcon?.classList.remove("hidden");
      darkIcon?.classList.add("hidden");
    }
  }, [dark]);

  const toggleTheme = () => {
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }

    setDark(!dark);
  };

  return (
    <button
      id="theme-toggle"
      data-tooltip-target="tooltip-toggle"
      onClick={(_) => toggleTheme()}
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      <svg
        id="theme-toggle-dark-icon"
        className="w-5 h-5 hidden"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg
        id="theme-toggle-light-icon"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

function AccountInfo(props: {
  account: { username: string; name: string } | null;
}) {
  const account = props.account ?? { username: "/login", name: "Login" };

  return (
    <button
      title="Log Out"
      onClick={(_) => {
        logout();
        navigate("/login");
      }}
    >
      {(account?.name?.length ?? 0) > 0
        ? account?.name ?? "Login"
        : account?.username ?? "/login"}
    </button>
  );
}
