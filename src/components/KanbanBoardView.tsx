import { navigate } from "raviger";
import { useEffect, useReducer, useState } from "react";
import { Board, Status, Task } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";

import { deleteBoard, listTasks, updateBoard } from "../utils/ApiUtils";
import {
  getLocalStatus,
  getLocalTasks,
  updateLocalBoard,
  updateLocalTasks,
} from "../utils/StorageUtils";
import { AddTask } from "./AddTask";
import Modal from "./commons/Modal";
import CreateStatus from "./CreateStatus";
import DashboardBase from "./DashboardBase";
import { EditStatus } from "./EditStatus";
import { EditTask } from "./EditTask";

type SetBoardAction = {
  type: "set_board";
  board: Model<Board>;
};

type EditBoardTitleAction = {
  type: "edit_title";
  title: string;
};

type EditBoardDescriptionAction = {
  type: "edit_description";
  title: string;
};

type BoardAction =
  | SetBoardAction
  | EditBoardTitleAction
  | EditBoardDescriptionAction;

const boardReducer = (state: Model<Board>, action: BoardAction) => {
  switch (action.type) {
    case "set_board":
      updateLocalBoard(action.board);
      return action.board;

    case "edit_title":
      if (state.title === action.title) return state;
      updateBoard(state.id!, { title: action.title });
      return { ...state, title: action.title };
  }
  return state;
};

const fetchTasks = async (
  boardId: number,
  setTasksCB: (value: Model<Task>[]) => void
) => {
  try {
    setTasksCB(await listTasks(boardId));
  } catch (error) {
    console.log(error);
  }
};

export default function KanbanBoardView(props: { initialBoard: Model<Board> }) {
  const [board, dispatchBoardAction] = useReducer(
    boardReducer,
    null,
    () => props.initialBoard
  );
  const [status] = useState(getLocalStatus());
  const [tasks, setTasks] = useState(getLocalTasks(board.id));

  useEffect(() => {
    fetchTasks(board.id, (tasks) => {
      updateLocalTasks(board.id, tasks);
      setTasks(tasks);
    });
  }, [board.id]);

  const [title, setTitle] = useState(board.title);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatchBoardAction({ type: "edit_title", title: title });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [title]);

  const [newStatus, setNewStatus] = useState(false);

  const [newTask, setNewTask] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<Model<Status>>();

  const openNewTaskDialog = (status?: Model<Status>) => {
    setNewTaskStatus(status);
    setNewTask(true);
  };

  const hasStatus = status.length > 0;

  return (
    <DashboardBase selectedTabName="Boards">
      <div className="h-full px-6">
        <div className="flex flex-row items-center gap-6">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 text-4xl font-medium w-full rounded-lg p-2 my-2 bg-transparent focus:bg-gray-50 hover:bg-gray-50 focus:dark:bg-gray-800 hover:dark:bg-gray-800"
          />
          <div className="flex flex-row items-center gap-2">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              onClick={async (e) => {
                try {
                  await await deleteBoard(board.id);
                  navigate("/boards");
                  // TODO: just update and close modal instead of reloading the page.
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Delete Board
              </span>
            </button>
            <button
              onClick={(e) => setNewStatus(true)}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                New Status
              </span>
            </button>
          </div>
        </div>
        {hasStatus ? (
          <div className="overflow-auto container w-full mt-4 h-full">
            <div className="flex">
              {status.map((s, i) => (
                <StatusColumn
                  key={i}
                  status={s}
                  tasks={tasks.filter((t) => t.status_object!.id === s.id)}
                  openNewTaskDialogCB={openNewTaskDialog}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-10">
            <p className="text-gray-500">
              No stages to keep your tasks. Create a new status.
            </p>
          </div>
        )}
        <Modal open={newStatus} closeCB={() => setNewStatus(false)}>
          <CreateStatus
            boardId={board.id!}
            closeCB={() => setNewStatus(false)}
          />
        </Modal>
        <Modal open={newTask} closeCB={() => setNewTask(false)}>
          <AddTask
            boardId={board.id!}
            availableStatus={status}
            initialStatusId={newTaskStatus?.id}
            closeCB={() => setNewTask(false)}
          />
        </Modal>
      </div>
    </DashboardBase>
  );
}

export function StatusColumn(props: {
  status: Model<Status>;
  tasks: Model<Task>[];
  openNewTaskDialogCB: (defaultStatus: Model<Status>) => void;
}) {
  const [editStatus, setEditStatus] = useState(false);

  const status = props.status;
  const tasks = props.tasks;

  const hasTasks = tasks.length > 0;

  const sortedTasks = tasks.sort((a, b) =>
    new Date(a.modified_date) > new Date(b.modified_date) ? 0 : 1
  );

  return (
    <div className="m-2 rounded-2xl bg-gray-100 dark:bg-gray-800 flex-none w-96 p-4 divide-y-4 divide-gray-300 dark:divide-gray-700">
      <div className="flex flex-row gap-2">
        <p className="flex-none p-2 font-medium">{status.title}</p>
        <button className="text-sm" onClick={(_) => setEditStatus(true)}>
          Edit
        </button>
        <div className="flex-1"></div>
        <button
          type="button"
          className="flex-none py-2.5 px-5 text-sm font-medium rounded-t-md text-gray-700 bg-gray-300 dark:bg-gray-700 hover:text-gray-800 dark:hover:text-white focus:z-10 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700"
          onClick={(_) => {
            props.openNewTaskDialogCB(status);
          }}
        >
          Add Task
        </button>
      </div>
      <div className="py-4 px-2 flex flex-col items-center justify-center">
        {hasTasks ? (
          sortedTasks.map((t, i) => <TaskCard key={i} task={t} />)
        ) : (
          <p className="text-gray-500">No tasks</p>
        )}
      </div>
      <Modal open={editStatus} closeCB={() => setEditStatus(false)}>
        <EditStatus status={status} closeCB={() => setEditStatus(false)} />
      </Modal>
    </div>
  );
}

export function TaskCard(props: { task: Model<Task> }) {
  const [editTask, setEditTask] = useState(false);

  const task = props.task;
  return (
    <div
      onClick={(_) => setEditTask(true)}
      className="transition-all hover:scale-105 m-2 p-4 rounded-lg w-80 bg-gray-200 dark:bg-gray-700"
    >
      <div
        className="flex flex-row items-center align-middle"
        onChange={(e) => {}}
      >
        <div className="flex-1 font-semibold text-lg pb-2">{task.title}</div>
      </div>
      <div className="italic">{task.description}</div>
      <Modal open={editTask} closeCB={() => setEditTask(false)}>
        <EditTask task={task} closeCB={() => setEditTask(false)} />
      </Modal>
    </div>
  );
}
