import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/country";
const API_PATH_2 = ConstantList.API_ENPOINT + "/api/hrCountry";

export const pagingCountries = (searchObject) => {
  var url = API_PATH_2 + "/searchByPage";
  return axios.post(url, searchObject);
};

export const getCountry = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createCountry = (obj) => {
  let url = API_PATH_2;
  return axios.post(url, obj);
};

export const editCountry = (obj) => {
  let url = API_PATH_2 + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteCountry = (id) => {
  let url = API_PATH_2 + "/" + id;
  return axios.delete(url);
};
