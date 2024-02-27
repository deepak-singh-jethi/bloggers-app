import React from "react";
import { useRouteError } from "react-router-dom";
import Error from "../../Components/Error/Error";

function ErrorLayout() {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong";
  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 400) {
    title = "Check Your Inputs ";
  }
  if (error.status === 401 || error.status === 403) {
    title = "You do not have permission";
  }
  return (
    <div className="">
      <Error title={title}>
        <p className="text-xl">{message}</p>
      </Error>
    </div>
  );
}

export default ErrorLayout;
