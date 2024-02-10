import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import ModalContainer from "../modalContainer/ModalContainer";
import {
  getAllCities,
  getAllCountries,
  getAllContinents,
  getAllTechnologies,
} from "../../service/api/conferenceAPI";
import { conferenceData } from "../../store/store";
import { useStore } from "@nanostores/react";

const DropdownWrapper = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const handleClick = () => {
    setShowModal(() => !showModal);
  };
  const $conferenceData = useStore(conferenceData);
  console.log("dropdown", $conferenceData);

  const findCategory = [
    { name: "City", func: getAllCities },
    { name: "Country", func: getAllCountries },
    { name: "Continent", func: getAllContinents },
    { name: "Technology", func: getAllTechnologies },
  ];

  const categorySelected = findCategory.find(({ name }) => name === title);
  const getData = async () => {
    const response = await categorySelected.func();
    setCategoryData(() => response);
  };

  useEffect(() => {
    getData();
  }, [title]);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-[4px] text-neutrals-400 p-[5px] pl-[12px] pr-[4px] cursor-pointer"
        onClick={() => handleClick()}
      >
        <p className="text-[13px] font-[500]">{title}</p>
        <IoChevronDownSharp className="p-[1px]" />
      </button>
      {showModal && (
        <ModalContainer
          title={title}
          setShowModal={setShowModal}
          categoryData={categoryData}
        />
      )}
    </div>
  );
};

export default DropdownWrapper;
