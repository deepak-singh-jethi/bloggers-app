import { Outlet } from "react-router";
import AuthLayout from "./AuthPage/AuthLayout";
import StudioNav from "../../Components/Studio/StudioNav";
import { useSelector } from "react-redux";

function StudioLayout() {
  const { token } = useSelector((state) => state.user);
  const tokenLocal = localStorage.getItem("token");

  if (!token && !tokenLocal) {
    return (
      <>
        <StudioNav auth={true}>
          <h1 className=" text-[18px] sm:text-3xl text-slate-200 font-extrabold font-serif mb-1 sm:mb-3">
            {" "}
            Join Our Creative Studio
          </h1>
          <p className=" text-[15px] sm:text-lg text-slate-200 mb-7">
            Discover the power of creativity. Sign up for exclusive access to
            our studio and bring your ideas to life.
          </p>
        </StudioNav>
        <AuthLayout />
      </>
    );
  }

  return (
    <>
      <StudioNav />
      <Outlet />
    </>
  );
}

export default StudioLayout;
