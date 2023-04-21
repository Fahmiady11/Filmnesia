import {
  IconChevronDown,
  IconMinus,
  IconPlus,
  IconUser,
  IconUsers,
} from "@tabler/icons";
import { useEffect, useState } from "react";

export default function PopOver({
  className,
  containerClassName,
  childClassName,
  options,
  onChange,
  name,
}) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  // console.log(options);
  const doFocus = () => {
    if (!show) {
      setShow(true);
    } else {
      setAnimate(false);
    }
  };

  const doBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setAnimate(false);
    }
  };

  useEffect(() => {
    if (show) {
      setAnimate(true);
    }
  }, [show]);

  useEffect(() => {
    if (!animate) {
      setTimeout(() => {
        setShow(false);
      }, 150);
    }
  }, [animate]);

  return (
    <div
      className={`${
        containerClassName ? containerClassName + " " : ""
      }relative whitespace-nowrap`}
      onBlur={doBlur}
    >
      <input
        type="checkbox"
        className="w-full h-full absolute z-[3] opacity-0 cursor-pointer"
        onClick={doFocus}
      />

      <div>
        <div
          tabIndex={0}
          className={`${show ? "" : "hidden "}${
            animate ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-2 "
          }${
            childClassName ? childClassName + " " : ""
          }transition-all text-xs absolute top-16 w-full rounded-lg bg-white shadow p-5 border z-[99]`}
        >
          {/* People */}
          <div className="mb-2 flex items-center justify-between gap-4">
            <div className="flex items-center justify-start gap-2">
              <IconUser className="text-custom-dark_grey w-5 h-5" />
              <p className="font-medium text-xs text-custom-black">{name}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={onChange}
                name="people"
                value={options.people != 0 ? options.people - 1 : 0}
                className="w-5 h-5 flex items-center justify-center rounded bg-yellow-400 text-white"
              >
                <IconMinus className="w-4 h-4" />
              </button>
              <p className="font-medium text-xs text-custom-black">
                {options.people}
              </p>
              <button
                onClick={onChange}
                name="people"
                value={options.people + 1}
                className="w-5 h-5 flex items-center justify-center rounded bg-yellow-400 text-white"
              >
                <IconPlus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            className ? className + " " : ""
          }bg-white px-12 py-5 text-xs font-medium rounded-lg shadow-custom w-full text-custom-black`}
        >
          {`${options.people} ${name} `}
          <div className="absolute z-[2] top-0 left-0 px-4 h-full w-full flex items-center justify-between gap-4 text-xs font-medium text-custom-dark_grey">
            <IconUsers className="w-5 h-5" />
            <IconChevronDown className="w-5 h-5 text-custom-primary_red" />
          </div>
        </div>
      </div>
    </div>
  );
}
