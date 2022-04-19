export const currentAccount: () => {
  name: string;
  username: string;
} | null = () => {
  const accountData = localStorage.getItem("current_account");

  if (accountData) {
    return JSON.parse(accountData);
  }

  return null;
};
