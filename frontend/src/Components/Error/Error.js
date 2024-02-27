function Error({ title, children }) {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <h1 className="text-4xl">{title}</h1>
      {children}
    </div>
  );
}

export default Error;
