import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(props, ref) {
  const { label, name, type } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label}>{name}</label>
      <input
        type={type}
        id={label}
        className="bg-neutral-100 px-3 py-2 rounded-md shadow-inner"
        minLength={type === "password" ? "8" : ""}
        ref={ref}
        required
      />
    </div>
  );
});

export default FormInput;
