import accountStore from "../store/account.store";
import accountService from "./account-service";

export const exportTextFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const accountInfoContent = (username: string, password: string, email: string) : string => {
    accountService.getAccountDetails();
    const account = accountStore.getState().account;
    const rootId = account?.rootId ? account?.rootId : account?.accountId;
    
    return `Login link: ${rootId} \nUsername: ${username} \nPassword: ${password} \nEmail: ${email}`;
}