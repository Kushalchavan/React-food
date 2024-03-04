const Error = ({ title, message }) => {
  return (
    <div className="w-1/2 mt-3 bg-red-200 rounded px-3 py-2 shadow-md text-red-700 font-semibold">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
