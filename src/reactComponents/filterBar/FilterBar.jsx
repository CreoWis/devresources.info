import { RiMapPin2Line } from "react-icons/ri";
import { MdOutlineHandyman } from "react-icons/md";
import DropdownWrapper from "../dropdownWrapper/DropdownWrapper";
import Switch from "../switch/Switch";

const FilterBar = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center md:h-[48px] border border-[#3129e714] rounded-[8px] mb-[10px]">
      <div className="flex items-center p-1 pl-[12px]">
        <span className="text-neutrals-300">
          <RiMapPin2Line className="w-[18px] h-[18px]" />
        </span>
        <div className="flex gap-[4px] items-center">
          <DropdownWrapper title="City" arrList={[]} client:load />
          <span className="w-[1px] h-[18px] bg-[#D6D6E1]"></span>
          <DropdownWrapper title="Country" arrList={[]} client:load />
          <span className="w-[1px] h-[18px] bg-[#D6D6E1]"></span>
          <DropdownWrapper title="Continent" arrList={[]} client:load />
        </div>
        <span className="w-[1px] h-[18px] mx-[8px] bg-[#D6D6E1]"></span>
        <div className="flex items-center px-[4px]">
          <MdOutlineHandyman className="text-neutrals-300 w-[18px] h-[18px]" />
          <DropdownWrapper title="Technology" arrList={[]} client:load />
        </div>
      </div>
      <div className="flex items-center gap-[8px] mx-[16px]">
        <Switch client:load />
        <span className="text-[14px] text-neutrals-600 leading-[21px]">
          Show past conferences
        </span>
      </div>
    </div>
  );
};

export default FilterBar;
