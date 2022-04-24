import { Board, Status, Task } from "../types/BoardTypes";
import { Model } from "../types/CommonTypes";
import { AuthToken, AuthTokenParams } from "../types/UserTypes";
import { clearAuthToken, getAuthToken } from "./StorageUtils";

export const API_BASE_URL =
  process.env.API_BASE_URL ||
  "https://rithviknishad-swiftly-api.herokuapp.com/api";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function request(
  endpoint: `/${string}/`,
  method: RequestMethod = "GET",
  data: any = {}
) {
  let url = `${API_BASE_URL}${endpoint}`;
  let body = data ? JSON.stringify(data) : null;

  if (method === "GET") {
    if (data) {
      const queryParams = `${Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join("&")}`;

      if (queryParams.length > 0) {
        url += `?${queryParams}`;
      }
    }
    body = null;
  }

  let auth: string = "";

  const auth_token = getAuthToken();
  if (auth_token) auth = "Token " + auth_token;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: body,
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw Error(await response.json());
  }
}

// Authentication Related API utils

export const login = async (
  credentials: AuthTokenParams
): Promise<AuthToken> => {
  const response = await request("/auth-token/", "POST", credentials);
  await me();
  return response;
};

export const me = async () => {
  const response = await request("/users/me/");
  localStorage.setItem("current_account", JSON.stringify(response));
  return response;
};

export const logout = (): void => {
  clearAuthToken();
  window.location.reload();
};

export const signup = (formData: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}) => request(`/auth/registration/`, "POST", formData);

// Boards related API utils

export const listBoards = async () => {
  const boards: Model<Board>[] = (await request(`/boards/`, "GET")).results;
  return boards;
};

export const getBoard = async (boardId: number) => {
  const result: Model<Board> = await request(`/boards/${boardId}/`, "GET");
  return result;
};

export const createBoard = (board: Board) => request(`/boards/`, "POST", board);

export const updateBoard = (boardId: number, deltas: Partial<Board>) =>
  request(`/boards/${boardId}/`, "PATCH", deltas);

export const deleteBoard = (boardId: number) =>
  request(`/boards/${boardId}/`, "DELETE");

// Task related API utils

export const listTasks = async (boardId: number) => {
  const tasks: Model<Task>[] = (
    await request(`/boards/${boardId}/tasks/`, "GET")
  ).results;
  return tasks;
};

export const createTask = (task: Task) =>
  request(`/boards/${task.board}/tasks/`, "POST", task);

export const getTask = (props: { boardId: number; taskId: number }) =>
  request(`/boards/${props.boardId}/tasks/${props.taskId}/`, "GET");

export const updateTask = (props: {
  boardId: number;
  taskId: number;
  task: Partial<Task>;
}) =>
  request(
    `/boards/${props.boardId}/tasks/${props.taskId}/`,
    "PATCH",
    props.task
  );

export const deleteTask = (props: { boardId: number; taskId: number }) =>
  request(`/boards/${props.boardId}/tasks/${props.taskId}/`, "DELETE");

// ------------------- Status related API utils -------------------

export const listStatus = async () => {
  const results: Model<Status>[] = (await request(`/status/`, "GET")).results;
  return results;
};

export const createStatus = (status: Status) =>
  request(`/status/`, "POST", status);

export const updateStatus = (statusId: number, deltas: Partial<Status>) =>
  request(`/status/${statusId}/`, "PATCH", deltas);

export const deleteStatus = (statusId: number) =>
  request(`/status/${statusId}/`, "DELETE");
