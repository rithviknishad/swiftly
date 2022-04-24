import { useEffect, useState } from "react";
import { Status, Task, validateTask } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";
import { Errors } from "../types/DashboardPageTypes";
import { deleteTask, updateTask } from "../utils/ApiUtils";

export function EditTask(props: {
  task: Model<Task>;
  availableStatus: Model<Status>[];
  closeCB: () => void;
}) {
  const [task, setTask] = useState<Model<Task>>({
    ...props.task,
    status_object: undefined,
    board_object: undefined,
    status: props.task.status_object!.id!,
    board: props.task.board_object!.id!,
  });

  const [statusDropdown, setStatusDropdown] = useState(false);

  useEffect(() => {
    setStatusDropdown(false);
  }, [task]);

  const [errors, setErrors] = useState<Errors<Task>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTask(task);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      await updateTask({
        boardId: task.board!,
        taskId: task.id!,
        task: task,
      });
      window.location.reload();
      // TODO: just update and close modal instead of reloading the page.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Edit Task</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className={`${errors.title ? "text-red-500" : ""}`}>
          <label htmlFor="title">Title</label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className={`${errors.description ? "text-red-500" : ""}`}>
          <label htmlFor="description">Description</label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="text"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="pt-4 pb-2">
          <p>{"Status: "}</p>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setStatusDropdown(!statusDropdown);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {props.availableStatus.find((s) => s.id === task.status!)?.title +
              " "}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            className={`${
              !statusDropdown && "hidden"
            } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              {props.availableStatus.map((status, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={(_) => setTask({ ...task, status: status.id! })}
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      type="button"
                    >
                      {status.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-end">
          <button
            type="button"
            onClick={async (e) => {
              try {
                await deleteTask({ boardId: task.board, taskId: task.id });
                window.location.reload();
                // TODO: just update and close modal instead of reloading the page.
              } catch (error) {
                console.log(error);
              }
            }}
            className="transition-all focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
          <button
            type="submit"
            onClick={(e) => props.closeCB()}
            className="transition-all text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
