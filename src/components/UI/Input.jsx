const Input = ({ label, id, ...props }) => {
  return (
    <p className=" w-2/3 flex flex-col gap-1 mt-1">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        required
        {...props}
        className="h-7 px-2 py-1 focus:outline-blue-700 rounded shadow"
      />
    </p>
  );
};

export default Input;
