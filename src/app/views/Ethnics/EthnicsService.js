import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/hrEthnics";
const API_PATH_2 = ConstantList.API_ENPOINT + "/api/hrEthnics";

export const pagingEthnicities = (searchObject) => {
  var url = API_PATH_2 + "/searchByPage";
  return axios.post(url, searchObject);
};

export const getEthnics = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createEthnics = (obj) => {
  let url = API_PATH_2;
  return axios.post(url, obj);
};

export const editEthnics = (obj) => {
  let url = API_PATH_2 + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteEthnics = (id) => {
  let url = API_PATH_2 + "/" + id;
  return axios.delete(url);
};

export const checkCode = (id, code) => {
  const config = { params: { id: id, code: code } };
  var url = API_PATH + "/checkCode";
  return axios.get(url, config);
};

export const getAllEthnicities = () => {
  var url = API_PATH_2 + "/getAllEthnicities";
  return axios.get(url);
};
