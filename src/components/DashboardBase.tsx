import { navigate } from "raviger";
import React, { ReactNode } from "react";
import { DashboardTabProps } from "../types/DashboardPageTypes";
import { currentAccount } from "../utils/StorageUtils";

const DASHBOARD_TABS: DashboardTabProps[] = [
  { name: "Home", onClickCB: () => navigate("/home/") },
  { name: "Boards", onClickCB: () => navigate("/boards/") },
  { name: "To Do", onClickCB: () => navigate("/todo/") },
];

export default function DashboardBase(props: {
  children: ReactNode;
  selectedTabName: string;
}) {
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-56 flex flex-row gap-2 divide-x-2 divide-gray-100 min-h-max">
        <div className="min-w-full p-2">
          <div className="p-4 flex flex-row">
            <p className="font-medium text-xl text-gray-700">Swiftly</p>
            <div className="flex-1"></div>
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
      <div className="flex-1">
        <div className="flex flex-row py-6 px-10 bg-white items-center">
          <SearchBar />
          <div className="flex-1"></div>
          <AccountInfo />
        </div>
        <div className="p-4">{props.children}</div>
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
        tab.isSelected ? "bg-gray-100" : "hover:bg-gray-100"
      } rounded-lg py-2 w-full items-start text-gray-800`}
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

function AccountInfo() {
  const account: { name: string; username: string } = currentAccount() ?? {
    name: "Anonymous",
    username: "anonymous",
  };

  return <p className="text-gray-700">{account.name}</p>;
}
