import { useState } from "react";
import { Task } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";
import { updateTask } from "../utils/ApiUtils";
import {
  getLocalBoards,
  getLocalStatus,
  getLocalTasks,
  updateLocalTasks,
} from "../utils/StorageUtils";
import DashboardBase from "./DashboardBase";

const getTodos = () => {
  return getLocalBoards()
    .flatMap((board) => getLocalTasks(board.id))
    .filter((task) => !task.status_object!.is_completed)
    .sort((a, b) =>
      new Date(a.modified_date) < new Date(b.modified_date) ? 1 : 0
    );
};

export function TodosView() {
  const [todos, setTodos] = useState<Model<Task>[]>(getTodos());

  const markTaskAsCompleted = (task: Model<Task>) => {
    const status = getLocalStatus().find((s) => s.is_completed);
    if (!status) return;
    const boardId = task.board_object!.id;

    updateLocalTasks(
      boardId,
      getLocalTasks(boardId).map((t) =>
        t.id === task.id ? { ...task, status_object: status } : t
      )
    );

    updateTask({
      boardId,
      taskId: task.id,
      task: { ...task, status: status.id },
    });

    setTodos((todos) => todos.filter((t) => t.id !== task.id));
  };

  console.log(todos);
  return (
    <DashboardBase selectedTabName="To Do">
      <div className="p-6">
        <div>
          <p className="text-4xl font-medium">To Do</p>
        </div>
        <div className="py-6 px-6">
          {todos.map((todo, index) => (
            <TaskListTile
              key={index}
              task={todo}
              markAsCompletedCB={markTaskAsCompleted}
            />
          ))}
        </div>
      </div>
    </DashboardBase>
  );
}

function TaskListTile(props: {
  task: Model<Task>;
  markAsCompletedCB: (task: Model<Task>) => void;
}) {
  const task = props.task;
  return (
    <div className="p-4 rounded-lg w-full my-2 flex flex-row items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all">
      <p className="text-white bg-slate-700 text-xs w-28 rounded-lg truncate px-3 py-2 font-medium mr-6">
        {task.board_object!.title.toUpperCase()}
      </p>
      <div className="flex flex-col gap-2">
        <p className="font-bold">{task.title}</p>
        {task.description.length > 0 && (
          <p className="text-gray-600 dark:text-gray-500">{task.description}</p>
        )}
      </div>
      <div className="flex-1"></div>
      <button
        className="rounded-lg font-medium py-2 px-4 text-sm bg-lime-300 text-lime-800 dark:bg-lime-900 dark:text-lime-300"
        onClick={(_) => {
          props.markAsCompletedCB(task);
        }}
      >
        MARK AS COMPLETED
      </button>
    </div>
  );
}
