import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { IoChevronDownSharp } from "react-icons/io5";
import Modal from "../modal/Modal";
import {
  getConferenceByCity,
  getConferenceByCountry,
  getConferenceByContinent,
  getConferenceByTech,
} from "../../service/api/conferenceAPI";
import { conferenceData } from "../../store/store";
import { addQuotesToString } from "../../utils/utils";

const ModalContainer = ({ title, setShowModal, categoryData }) => {
  const $conferenceData = useStore(conferenceData);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDownSelected, setDropDownSelected] = useState("");
  console.log("react", $conferenceData);
  const findCategoryData = [
    { name: "City", func: getConferenceByCity, toChangeAtt: "citySelected" },
    {
      name: "Country",
      func: getConferenceByCountry,
      toChangeAtt: "countrySelected",
    },
    {
      name: "Continent",
      func: getConferenceByContinent,
      toChangeAtt: "continentSelected",
    },
    {
      name: "Technology",
      func: getConferenceByTech,
      toChangeAtt: "technologySelected",
    },
  ];

  const categorySelected = findCategoryData.find(({ name }) => name === title);

  const getData = async (dropDownSelected) => {
    const response = await categorySelected.func(dropDownSelected);

    conferenceData.set({
      tableData: response?.data,
      pastConference: false,
      citySelected: "",
      countrySelected: "",
      continentSelected: "",
      technologySelected: "",
    });
    setShowModal(false);
  };

  useEffect(() => {
    if (dropDownSelected) {
      const convertedStr = addQuotesToString(dropDownSelected);
      getData(convertedStr);
    }
  }, [dropDownSelected]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDropDown = () => {
    setShowDropDown(() => !showDropDown);
  };

  const handleSearch = (e) => {
    setShowDropDown(true);
    setSearchTerm(e.target.value);
  };

  const handleDropDownSelected = (e) => {
    setDropDownSelected(e.target.textContent);
  };

  const filteredDropDownData =
    searchTerm.length > 0
      ? categoryData?.data.filter((obj) =>
          obj?.node?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : categoryData?.data;

  return (
    <Modal onClose={closeModal}>
      <div className="absolute top-0 left-0 z-10 w-[300px] md:top-10 p-[24px] flex flex-col gap-[16px] self-stretch bg-white border border-[##3129e73d] modalShadow rounded-[4px]">
        <div className="w-full flex flex-col items-start gap-[8px] self-stretch">
          <p className="text-neutral-base text-[16px] font-[700] self-stretch">
            {title}
          </p>
          <div className="w-full">
            <div className="flex items-center gap-2 pr-[8px] border border-neutrals-200 rounded-[4px] self-stretch mb-[4px] overflow-hidden">
              <input
                type="text"
                className="text-[13px] w-full p-[8px] pl-[12px]"
                placeholder={`Search or select a ${title.toLowerCase()}`}
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
              />
              <span onClick={handleDropDown} className="cursor-pointer">
                <IoChevronDownSharp className="text-neutrals-400" />
              </span>
            </div>
            <div className="self-stretch">
              {showDropDown && (
                <ul className="flex flex-col border border-neutrals-200 rounded-[4px] max-h-[248px] overflow-auto">
                  {filteredDropDownData?.map((obj) => (
                    <li
                      key={obj.node.id}
                      className="text-[14px] text-neutrals-600 font-[700] hover:bg-[#3129e714] hover:text-[#3129E7] p-[10px]"
                      onClick={(e) => handleDropDownSelected(e)}
                    >
                      {obj?.node?.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContainer;
