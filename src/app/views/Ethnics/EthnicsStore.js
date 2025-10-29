import { makeAutoObservable } from "mobx";

export default class EthnicsStore {

  constructor() {
    makeAutoObservable(this);
  }

}
