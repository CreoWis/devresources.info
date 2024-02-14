import React from "react";

const PrimaryBtn = ({ text }) => {
  return (
    <button
      className={`primaryBtn btn hidden sm:block px-4 py-2 lg:py-4 lg:px-6 text-white rounded-full font-bold text-[12px] sm:text-[13px] xl:text-[16px]`}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
