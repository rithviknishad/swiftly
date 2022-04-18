import { Board, Status, Task } from "../types/BoardTypes";
import { AuthToken, AuthTokenParams } from "../types/UserTypes";

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

  const auth_token = localStorage.getItem("token");
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

export const login = (credentials: AuthTokenParams): Promise<AuthToken> =>
  request("/auth-token/", "POST", credentials);

export const me = () => request("/users/me/");

export const signup = (formData: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}) => request(`/auth/registration/`, "POST", formData);

// Boards related API utils

export const listBoards = () => request(`/boards/`, "GET");

export const getBoard = (boardId: number) =>
  request(`/boards/${boardId}/`, "GET");

export const addBoard = (board: Board) => request(`/boards/`, "POST", board);

export const deleteBoard = (boardId: number) =>
  request(`/boards/${boardId}/`, "DELETE");

// Task related API utils

export const listTasks = (boardId: number) =>
  request(`/boards/${boardId}/tasks/`, "GET");

export const addTask = (task: Task) =>
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

// Status related API utils

export const listStatus = (boardId: number) =>
  request(`/boards/${boardId}/status/`, "GET");

export const addStatus = (status: Status) =>
  request(`/boards/${status.board}/status/`, "POST", status);

export const updateStatus = (props: {
  boardId: number;
  statusId: number;
  status: Partial<Status>;
}) =>
  request(
    `/boards/${props.boardId}/status/${props.statusId}/`,
    "PATCH",
    props.status
  );

export const deleteStatus = (props: { boardId: number; statusId: number }) =>
  request(`/boards/${props.boardId}/status/${props.statusId}/`, "DELETE");
