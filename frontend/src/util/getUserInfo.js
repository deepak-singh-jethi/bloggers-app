//get user info such as username and token from local storage

export const getUser = () => {
  const userStr = localStorage.getItem("username");
  if (userStr) return JSON.parse(userStr);
  else return null;
};
export const getToken = () => {
  return localStorage.getItem("token") || null;
};
