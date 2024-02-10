import { atom } from "nanostores";

export const conferenceData = atom({
  tableData: [],
  pastConference: false,
  citySelected: "",
  countrySelected: "",
  continentSelected: "",
  technologySelected: "",
});

export const updateConferenceData = () =>{
  StorageEvent.set()
}