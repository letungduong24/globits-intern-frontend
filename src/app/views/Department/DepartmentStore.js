import { makeAutoObservable } from "mobx";

export default class DepartmentStore {

  constructor() {
    makeAutoObservable(this);
  }

}
