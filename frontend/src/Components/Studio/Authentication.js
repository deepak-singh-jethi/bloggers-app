import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autheticateUser } from "../../Store/UserAuthActions";

function AuthForm() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.user);

  const [isLogin, setIsLogin] = useState(true);
  const [formMessage, setFormMessage] = useState(null);

  const handleChangeInButton = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);

    if (data.username.length < 3) {
      setFormMessage("Username must be greater than 3");
      return;
    }
    if (data.password.length < 7) {
      setFormMessage("Password must be greater than 7");
      return;
    }
    if (!isLogin && data.password !== data.confirmPassword) {
      setFormMessage("Passwords do not match");
      return;
    }

    const method = isLogin ? "login" : "register";
    const username = data.username;
    const password = data.password;
    dispatch(autheticateUser({ username, password, method }));
    setFormMessage(null);
  };

  const handlefocus = () => {
    setFormMessage(null);
  };

  return (
    <div
      className="flex items-center justify-center h-2/3 py-40"
      style={{
        backgroundImage: `url(${"https://source.unsplash.com/E8Ufcyxz514/2400x1823"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-white px-8 py-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onFocus={handlefocus}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onFocus={handlefocus}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onFocus={handlefocus}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
          )}
          {formMessage && (
            <p className="text-red-500 text-sm font-medium text-center">
              {formMessage}
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
              type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <button
              onClick={handleChangeInButton}
              className="text-indigo-500 hover:underline">
              {isLogin ? "Create an account" : "Already have an account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
