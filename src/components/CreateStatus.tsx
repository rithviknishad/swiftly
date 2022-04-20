import React from "react";
import { useState } from "react";
import { Status, validateStatus } from "../types/BoardTypes";
import { Errors } from "../types/DashboardPageTypes";
import { createStatus } from "../utils/ApiUtils";

export default function CreateStatus(props: {
  boardId: number;
  closeCB: () => void;
}) {
  const [status, setStatus] = useState<Status>({
    board: props.boardId,
    title: "",
    description: "",
    is_completed: false,
  });
  const [errors, setErrors] = useState<Errors<Status>>({});

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
      await createStatus(status);
      window.location.reload();
      // TODO: just update and close modal instead of reloading the page.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Create Status</h1>
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
        <button
          type="submit"
          onClick={(e) => props.closeCB()}
          className="mt-6 transition-all hover:scale-110 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Status
        </button>
      </form>
    </div>
  );
}
