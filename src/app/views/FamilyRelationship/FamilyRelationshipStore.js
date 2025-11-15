import { makeAutoObservable, runInAction } from "mobx";
import { pagingFamilyRelationship, createFamilyRelationship, editFamilyRelationship, deleteFamilyRelationship } from "./FamilyRelationshipService";
import { toast } from "react-toastify";

export default class FamilyRelationshipStore {
  familyRelationships = [];
  page = 0;
  pageSize = 10;
  totalElements = 0;
  currentFamilyRelationship = null;
  keyword = "";
  open = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  setPage = (page) => {
    this.page = page;
  };

  setPageSize = (pageSize) => {
    this.pageSize = pageSize;
    this.page = 0;
  };

  setKeyword = (keyword) => {
    this.keyword = keyword;
    this.page = 0;
  };

  setCurrentFamilyRelationship = (familyRelationship) => {
    this.currentFamilyRelationship = familyRelationship;
  };

  setOpen = (open) => {
    this.open = open;
  };

  handleOpen = () => {
    this.currentFamilyRelationship = null;
    this.open = true;
  };

  handleClose = () => {
    this.currentFamilyRelationship = null;
    this.open = false;
  };

  handleEdit = (familyRelationship) => {
    this.currentFamilyRelationship = familyRelationship;
    this.open = true;
  };

  loadFamilyRelationships = async () => {
    this.loading = true;
    try {
      const searchObject = {
        pageIndex: this.page + 1,
        pageSize: this.pageSize,
      };

      if (this.keyword && this.keyword.trim() !== "") {
        searchObject.keyword = this.keyword.trim();
      }

      const response = await pagingFamilyRelationship(searchObject);
      const content = response?.data?.content || [];

      runInAction(() => {
        this.familyRelationships = Array.isArray(content) ? [...content] : [];
        this.totalElements = response?.data?.totalElements || 0;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error loading family relationships:", error);
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Có lỗi khi tải dữ liệu!");
    }
  };

  handleCreate = async (values) => {
    try {
      await createFamilyRelationship(values);
      toast.success("Tạo mới thành công!");
      await this.loadFamilyRelationships();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error creating family relationship:", error);
      toast.error("Có lỗi khi tạo mới!");
      return false;
    }
  };

  handleUpdate = async (values) => {
    try {
      await editFamilyRelationship(values);
      toast.success("Cập nhật thành công!");
      await this.loadFamilyRelationships();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error updating family relationship:", error);
      toast.error("Có lỗi khi cập nhật!");
      return false;
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteFamilyRelationship(id);
      toast.success("Xóa thành công!");
      await this.loadFamilyRelationships();
      return true;
    } catch (error) {
      console.error("Error deleting family relationship:", error);
      toast.error("Có lỗi khi xóa!");
      return false;
    }
  };
}
