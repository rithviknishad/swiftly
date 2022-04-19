import { useState } from "react";
import Modal from "./commons/Modal";
import CreateForm from "./CreateBoard";
import DashboardBase from "./DashboardBase";

export default function Boards() {
  const [newBoard, setNewBoard] = useState<boolean>(false);

  return (
    <DashboardBase selectedTabName="Boards">
      <div className="p-6">
        <div className="flex flex-row items-center">
          <p className="text-4xl font-medium">My Boards</p>
          <div className="flex-1"></div>
          <button
            onClick={(e) => setNewBoard(true)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              New Board
            </span>
          </button>
        </div>
        <Modal open={newBoard} closeCB={() => setNewBoard(false)}>
          <CreateForm />
        </Modal>
      </div>
    </DashboardBase>
  );
}
