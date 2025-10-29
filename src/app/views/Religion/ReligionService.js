import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/hrRelegion";

export const pagingReligions = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};

export const getReligion = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createReligion = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editReligion = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteReligion = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const getAllReligions = () => {
  var url = API_PATH + "/getAllReligions";
  return axios.get(url);
};

export const checkCode = (obj) => {
  let url = API_PATH + "/checkCode";
  return axios.post(url, obj);
};
