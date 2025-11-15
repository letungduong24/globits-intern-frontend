import { makeAutoObservable, runInAction } from "mobx";
import { pagingEthnicities, createEthnics, editEthnics, deleteEthnics } from "./EthnicsService";
import { toast } from "react-toastify";

export default class EthnicsStore {
  ethnicities = [];
  page = 0;
  pageSize = 10;
  totalElements = 0;
  currentEthnicity = null;
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

  setCurrentEthnicity = (ethnicity) => {
    this.currentEthnicity = ethnicity;
  };

  setOpen = (open) => {
    this.open = open;
  };

  handleOpen = () => {
    this.currentEthnicity = null;
    this.open = true;
  };

  handleClose = () => {
    this.currentEthnicity = null;
    this.open = false;
  };

  handleEdit = (ethnicity) => {
    this.currentEthnicity = ethnicity;
    this.open = true;
  };

  loadEthnicities = async () => {
    this.loading = true;
    try {
      const searchObject = {
        pageIndex: this.page + 1,
        pageSize: this.pageSize,
      };

      if (this.keyword && this.keyword.trim() !== "") {
        searchObject.keyword = this.keyword.trim();
      }

      const response = await pagingEthnicities(searchObject);
      const content = response?.data?.content || [];

      runInAction(() => {
        this.ethnicities = Array.isArray(content) ? [...content] : [];
        this.totalElements = response?.data?.totalElements || 0;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error loading ethnicities:", error);
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Có lỗi khi tải dữ liệu!");
    }
  };

  handleCreate = async (values) => {
    try {
      await createEthnics(values);
      toast.success("Tạo mới thành công!");
      await this.loadEthnicities();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error creating ethnicity:", error);
      toast.error("Có lỗi khi tạo mới!");
      return false;
    }
  };

  handleUpdate = async (values) => {
    try {
      await editEthnics(values);
      toast.success("Cập nhật thành công!");
      await this.loadEthnicities();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error updating ethnicity:", error);
      toast.error("Có lỗi khi cập nhật!");
      return false;
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteEthnics(id);
      toast.success("Xóa thành công!");
      await this.loadEthnicities();
      return true;
    } catch (error) {
      console.error("Error deleting ethnicity:", error);
      toast.error("Có lỗi khi xóa!");
      return false;
    }
  };
}
