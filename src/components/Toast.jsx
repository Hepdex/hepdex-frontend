import { BsCheck, BsExclamation, BsXLg } from "react-icons/bs";

export default function Toast({ data, closeToast, toastProps }) {
  return (
    <div>
      <div className="top">
        <button onClick={closeToast}>
          <BsXLg size={14} />
        </button>
      </div>
      <div className="content">
        <span className={`icon ${toastProps.type}`}>
          {toastProps.type === "success" ? (
            <BsCheck size={20} />
          ) : (
            <BsExclamation size={20} />
          )}
        </span>
        <p className="label">{data.text}</p>
      </div>
    </div>
  );
}
