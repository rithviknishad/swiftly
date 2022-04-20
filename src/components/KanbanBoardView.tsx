import { useEffect, useReducer, useState } from "react";
import { Board } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";
import { updateBoard } from "../utils/ApiUtils";
import { getLocalBoards, updateLocalBoard } from "../utils/StorageUtils";
import Modal from "./commons/Modal";
import CreateStatus from "./CreateStatus";
import DashboardBase from "./DashboardBase";

type EditBoardTitleAction = {
  type: "edit_board_title";
  title: string;
};

type EditBoardDescriptionAction = {
  type: "edit_board_description";
  title: string;
};

type BoardAction = EditBoardTitleAction | EditBoardDescriptionAction;

const boardReducer = (state: Model<Board>, action: BoardAction) => {
  switch (action.type) {
    case "edit_board_title":
      updateBoard(state.id!, { title: action.title });
      return { ...state, title: action.title };
  }

  return state;
};

export function KanbanBoardView(props: { boardId: number }) {
  const [board, dispatchBoardAction] = useReducer(
    boardReducer,
    null,
    () => getLocalBoards().find((b) => b.id === props.boardId)!
  );
  const [title, setTitle] = useState(() => board.title);

  const [newTask, setNewTask] = useState(false);
  const [newStatus, setNewStatus] = useState(false);

  useEffect(() => {
    updateLocalBoard(board);
  }, [board]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatchBoardAction({ type: "edit_board_title", title: title });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [title]);

  return (
    <DashboardBase selectedTabName="Boards">
      <div className="p-6">
        <div className="flex flex-row items-center gap-6">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 text-4xl font-medium w-full rounded-lg p-2 my-2 bg-transparent focus:bg-gray-50 hover:bg-gray-50 focus:dark:bg-gray-800 hover:dark:bg-gray-800"
          />
          <button
            onClick={(e) => setNewStatus(true)}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              New Status
            </span>
          </button>
        </div>
        {/* {hasBoards ? (
          <div className="container mx-auto m-16">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
              {myBoards.map((board, i) => (
                <BoardCard key={i} board={board} />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-10">
            <p className="text-gray-500">
              You don't have any boards yet... Go ahead and create one!
            </p>
          </div>
        )} */}
        <Modal open={newStatus} closeCB={() => setNewStatus(false)}>
          <CreateStatus
            boardId={props.boardId}
            closeCB={() => setNewStatus(false)}
          />
        </Modal>
      </div>
    </DashboardBase>
  );
}
