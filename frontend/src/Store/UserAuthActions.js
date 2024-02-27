import useractions from "./user";

export const autheticateUser = (data) => {
  const { method, username, password } = data;
  return async (dispatch) => {
    async function registerUser() {
      const response = await fetch("http://localhost:3000/" + method, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.authToken);
        return data;
      } else {
        return response.json();
      }
    }

    try {
      const data = await registerUser();
      dispatch(useractions.setUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};
