import { useEffect, useState } from "react";
import { Status, Task, validateTask } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";
import { Errors } from "../types/DashboardPageTypes";
import { createTask } from "../utils/ApiUtils";

export function AddTask(props: {
  boardId: number;
  availableStatus: Model<Status>[];
  initialStatusId?: number;
  closeCB: () => void;
}) {
  const [status, setStatus] = useState<Model<Status>>(() => {
    if (props.initialStatusId) {
      return props.availableStatus.find((s) => s.id === props.initialStatusId)!;
    } else {
      return props.availableStatus[0];
    }
  });

  const [task, setTask] = useState<Task>({
    board: props.boardId,
    status: status.id!,
    title: "",
    description: "",
  });

  const [statusDropdown, setStatusDropdown] = useState(false);

  useEffect(() => {
    setStatusDropdown(false);
    setTask((task) => {
      return { ...task, status: status.id! };
    });
  }, [status]);

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
      await createTask(task);
      window.location.reload();
      // TODO: just update and close modal instead of reloading the page.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Add Task</h1>
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
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setStatusDropdown(!statusDropdown);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {status.title + " "}
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
                      onClick={(_) => setStatus(status)}
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
        <div className="flex items-end justify-end">
          <button
            type="submit"
            onClick={(e) => props.closeCB()}
            className="mt-6 transition-all hover:scale-110 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
