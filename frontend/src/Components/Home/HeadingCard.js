import React from "react";

function HeadingCard({
  url1,
  heading1,
  heading1Style,
  heading2Style,
  heading2,
  children,
  height,
}) {
  return (
    <div
      className={`parallax  ${height}`}
      style={{
        backgroundImage: `url(${url1})`,
      }}>
      <h1 className={`home-main-heading  ${heading1Style}`}>{heading1}</h1>
      {heading2 && (
        <p
          className={`mt-4 home-main-heading home-main-para  ${heading2Style}`}>
          {heading2}
        </p>
      )}
      <div className="mt-4 ">{children}</div>
    </div>
  );
}

export default HeadingCard;
