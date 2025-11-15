import { makeAutoObservable, runInAction } from "mobx";
import { pagingReligions, createReligion, editReligion, deleteReligion } from "./ReligionService";
import { toast } from "react-toastify";

export default class ReligionStore {
  religions = [];
  page = 0;
  pageSize = 10;
  totalElements = 0;
  currentReligion = null;
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

  setCurrentReligion = (religion) => {
    this.currentReligion = religion;
  };

  setOpen = (open) => {
    this.open = open;
  };

  handleOpen = () => {
    this.currentReligion = null;
    this.open = true;
  };

  handleClose = () => {
    this.currentReligion = null;
    this.open = false;
  };

  handleEdit = (religion) => {
    this.currentReligion = religion;
    this.open = true;
  };

  loadReligions = async () => {
    this.loading = true;
    try {
      const searchObject = {
        pageIndex: this.page + 1,
        pageSize: this.pageSize,
      };

      if (this.keyword && this.keyword.trim() !== "") {
        searchObject.keyword = this.keyword.trim();
      }

      const response = await pagingReligions(searchObject);
      const content = response?.data?.content || [];

      runInAction(() => {
        this.religions = Array.isArray(content) ? [...content] : [];
        this.totalElements = response?.data?.totalElements || 0;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error loading religions:", error);
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Có lỗi khi tải dữ liệu!");
    }
  };

  handleCreate = async (values) => {
    try {
      await createReligion(values);
      toast.success("Tạo mới thành công!");
      await this.loadReligions();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error creating religion:", error);
      toast.error("Có lỗi khi tạo mới!");
      return false;
    }
  };

  handleUpdate = async (values) => {
    try {
      await editReligion(values);
      toast.success("Cập nhật thành công!");
      await this.loadReligions();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error updating religion:", error);
      toast.error("Có lỗi khi cập nhật!");
      return false;
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteReligion(id);
      toast.success("Xóa thành công!");
      await this.loadReligions();
      return true;
    } catch (error) {
      console.error("Error deleting religion:", error);
      toast.error("Có lỗi khi xóa!");
      return false;
    }
  };
}

