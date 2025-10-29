import { makeAutoObservable } from "mobx";

export default class FamilyRelationshipStore {

  constructor() {
    makeAutoObservable(this);
  }

}
