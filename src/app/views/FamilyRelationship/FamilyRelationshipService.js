import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/familyrelationship";

export const pagingFamilyRelationship = (searchObject) => {
    var url = API_PATH + "/searchByPage";
    return axios.post(url, searchObject);
};

export const getFamilyRelationship = (id) => {
    let url = API_PATH + "/" + id;
    return axios.get(url);
};

export const createFamilyRelationship = (obj) => {
    let url = API_PATH;
    return axios.post(url, obj);
};

export const editFamilyRelationship = (obj) => {
    let url = API_PATH + "/" + obj.id;
    return axios.put(url, obj);
};

export const deleteFamilyRelationship = (id) => {
    let url = API_PATH + "/" + id;
    return axios.delete(url);
};

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    let url = API_PATH + "/checkCode";
    return axios.get(url, config);
};