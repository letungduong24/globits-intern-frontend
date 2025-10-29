import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/hRDepartment";
const API_PATH_CORE = ConstantList.API_ENPOINT + "/api/department";

export const pagingDepartments = (searchObject) => {
  var url = API_PATH + "/searchByPage";
  return axios.post(url, searchObject);
};

export const pagingAllDepartments = (searchObject) => {
  var url = API_PATH + "/pagingDepartments";
  return axios.post(url, searchObject);
};

export const getDepartment = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createDepartment= (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editDepartment = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteDepartment = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (id,code) => {
  const param = { params: { id: id, code: code } };
  var url = API_PATH + "/checkCode";
  return axios.get(url, param);
};

export const getListDepartment = () => {
  var url = API_PATH + "/getListDepartment";
  return axios.get(url);
};

export const getTreeView = () => {
  var url = API_PATH_CORE + "/tree/1/10000000";
  return axios.get(url);
};