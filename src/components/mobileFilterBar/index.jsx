"use client";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import AreaAccordion from "../areaAccordion";

const MobileFilterBar = ({
  page,
  pageState,
  clearFunc,
  showPastDate,
  area,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="block xl:hidden px-5 py-3 text-neutrals-400 border border-indigos-op-100 rounded-[8px] mb-[10px] cursor-pointer">
      <div
        className="flex justify-between items-center text-neutrals-500 hover:text-neutrals-700"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <span className="font-[600]">Filters</span>
        <IoChevronDownSharp className="p-[1px]" />
      </div>
      {showFilters && (
        <div>
          {area && (
            <AreaAccordion
              page={page}
              pageState={pageState}
              clearFunc={clearFunc}
              showPastDate={showPastDate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MobileFilterBar;
