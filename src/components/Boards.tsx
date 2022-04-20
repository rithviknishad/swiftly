import { Link } from "raviger";
import { useEffect, useState } from "react";
import { Board } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";
import { listBoards } from "../utils/ApiUtils";
import { updateLocalBoards } from "../utils/StorageUtils";
import Modal from "./commons/Modal";
import CreateBoard from "./CreateBoard";
import DashboardBase from "./DashboardBase";

const fetchBoards = async (setBoardsCB: (value: Model<Board>[]) => void) => {
  try {
    const results = await listBoards();
    setBoardsCB(results);
  } catch (error) {
    console.log(error);
  }
};

export default function Boards() {
  const [newBoard, setNewBoard] = useState<boolean>(false);
  const [boards, setBoards] = useState<Model<Board>[]>([]);

  useEffect(() => {
    fetchBoards(setBoards);
  }, []);

  useEffect(() => {
    updateLocalBoards(boards);
  }, [boards]);

  const hasBoards = boards.length > 0;

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
        {hasBoards ? (
          <div className="container mx-auto m-16">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
              {boards.map((board, i) => (
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
        )}
        <Modal open={newBoard} closeCB={() => setNewBoard(false)}>
          <CreateBoard />
        </Modal>
      </div>
    </DashboardBase>
  );
}

function BoardCard(props: { board: Model<Board> }) {
  const board = props.board;
  const hasDescription = board.description.length > 0;

  return (
    <Link
      href={`/boards/${board.id}`}
      className="transition-all hover:scale-105 flex border-2 rounded-xl bg-gray-300 hover:bg-gray-100 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
    >
      <div className="p-4">
        <p className="font-medium text-2xl text-gray-400">{board.title}</p>
        {hasDescription ? (
          <p className="my-6 text-gray-600 dark:text-gray-500">
            {board.description}
          </p>
        ) : (
          <p className="my-6 text-gray-500 italic">No description</p>
        )}
      </div>
    </Link>
  );
}
