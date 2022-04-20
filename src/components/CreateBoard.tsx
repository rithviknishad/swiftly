import { navigate } from "raviger";
import React from "react";
import { useState } from "react";
import { Board, validateBoard } from "../types/BoardTypes";
import { Errors } from "../types/DashboardPageTypes";
import { createBoard } from "../utils/ApiUtils";

export default function CreateBoard() {
  const [board, setBoard] = useState<Board>({ title: "", description: "" });
  const [errors, setErrors] = useState<Errors<Board>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBoard({ ...board, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateBoard(board);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      const data = await createBoard(board);
      navigate(`/boards/${data.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Create Board</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className={`${errors.title ? "text-red-500" : ""}`}>
          <label htmlFor="title">Title</label>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="text"
            id="title"
            name="title"
            value={board.title}
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
            value={board.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
