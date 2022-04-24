import { useState } from "react";
import { Status, Task, validateStatus } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";
import { Errors } from "../types/DashboardPageTypes";
import { deleteStatus, updateStatus } from "../utils/ApiUtils";

export function EditStatus(props: {
  status: Model<Status>;
  closeCB: () => void;
}) {
  const [status, setStatus] = useState(props.status);

  const [errors, setErrors] = useState<Errors<Task>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStatus({ ...status, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateStatus(status);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      await updateStatus(status.id, status);
      window.location.reload();
      // TODO: just update and close modal instead of reloading the page.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Edit Status</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className={`${errors.title ? "text-red-500" : ""}`}>
          <label htmlFor="title">Title</label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="text"
            id="title"
            name="title"
            value={status.title}
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
            value={status.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="is_completed"
            className={`${errors.description ? "text-red-500" : ""}`}
          >
            Tasks in this status are completed
          </label>
          <input
            className="ml-2 mr-2 border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="checkbox"
            id="is_completed"
            name="is_completed"
            checked={status.is_completed ? true : false}
            onChange={(e) => {
              setStatus({ ...status, is_completed: e.target.checked });
            }}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="mt-6 flex items-end justify-end">
          <button
            type="button"
            onClick={async (e) => {
              try {
                await deleteStatus(status.id);
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
