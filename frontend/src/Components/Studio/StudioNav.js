import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useractions from "../../Store/user";
import { useDispatch } from "react-redux";

function StudioNav({ children, auth }) {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");

    if (!confirm) {
      return;
    }
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    dispatch(useractions.logOut());
    return naviagte("/");
  };

  return (
    <div className="flex justify-center items-center flex-col gap-2 border-b-2 border-slate-400 rounded-md shadow-lg shadow-slate-900/50 h-350px sm:min-h-[200px] sm:max-h-[250px] bg-slate-600 mt-16 sm:mt-0 py-6 w-screen px-4">
      {children}
      {!auth && (
        <>
          <h1 className=" text-[24px] sm:text-3xl text-slate-200 font-extrabold font-serif mb-1 sm:mb-3 text-center">
            Welcome Back to Our Creative Studio
          </h1>
          <p className="text-[15px] text-center sm:text-lg text-slate-200 mb-4 sm:mb-7">
            Continue your creative journey with exclusive access to our studio.
            Unleash your creativity effortlessly.
          </p>
          <div className="flex w-full justify-center gap-4 items-center flex-wrap">
            <NavLink
              to=""
              className={({ isActive }) =>
                `text-re hover:bg-orange-500 rounded-lg px-10 py-4  ${
                  isActive ? "bg-orange-300" : "bg-cyan-300"
                }`
              }
              end>
              Profile
            </NavLink>
            <NavLink
              to="create"
              className={({ isActive }) =>
                `text-re hover:bg-orange-500 rounded-lg px-10 py-4  ${
                  isActive ? "bg-orange-300" : "bg-cyan-300"
                }`
              }
              end>
              Create
            </NavLink>
            <button
              className="px-10 py-4 bg-cyan-300 rounded-lg hover:text-orange-500 "
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default StudioNav;
