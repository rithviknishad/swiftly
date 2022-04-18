export type AuthTokenParams = { username: string; password: string };
export type AuthToken = AuthTokenParams & { token: string };

export type User = {
  username: string;
  name: string;
  url: Readonly<string>;
  password: string;
};
