//clear local storage

export const clearUser = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  return;
};
