import { makeAutoObservable, runInAction } from "mobx";
import { pagingCountries, createCountry, editCountry, deleteCountry } from "./CountryService";
import { toast } from "react-toastify";

export default class CountryStore {
  countries = [];
  page = 0;
  pageSize = 10;
  totalElements = 0;
  currentCountry = null;
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

  setCurrentCountry = (country) => {
    this.currentCountry = country;
  };

  setOpen = (open) => {
    this.open = open;
  };

  handleOpen = () => {
    this.currentCountry = null;
    this.open = true;
  };

  handleClose = () => {
    this.currentCountry = null;
    this.open = false;
  };

  handleEdit = (country) => {
    this.currentCountry = country;
    this.open = true;
  };

  loadCountries = async () => {
    this.loading = true;
    try {
      // Backend logic: if (pageIndex > 0) pageIndex--; else pageIndex = 0;
      // Điều này có nghĩa:
      // - Frontend gửi pageIndex = 0 → Backend dùng 0 (trang đầu)
      // - Frontend gửi pageIndex = 1 → Backend dùng 0 (vẫn trang đầu) ❌
      // - Frontend gửi pageIndex = 2 → Backend dùng 1 (trang 2)
      // 
      // Giải pháp: Frontend cần gửi pageIndex + 1 để backend giảm về đúng giá trị
      // - Frontend page 0 → Gửi pageIndex = 1 → Backend giảm thành 0 ✅
      // - Frontend page 1 → Gửi pageIndex = 2 → Backend giảm thành 1 ✅
      // - Frontend page 2 → Gửi pageIndex = 3 → Backend giảm thành 2 ✅
      const searchObject = {
        pageIndex: this.page + 1, // Tăng lên 1 để backend giảm về đúng giá trị
        pageSize: this.pageSize,
      };

      if (this.keyword && this.keyword.trim() !== "") {
        searchObject.keyword = this.keyword.trim();
      }

      const response = await pagingCountries(searchObject);
      const content = response?.data?.content || [];

      runInAction(() => {
        this.countries = Array.isArray(content) ? [...content] : [];
        this.totalElements = response?.data?.totalElements || 0;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error loading countries:", error);
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Có lỗi khi tải dữ liệu!");
    }
  };

  handleCreate = async (values) => {
    try {
      await createCountry(values);
      toast.success("Tạo mới thành công!");
      await this.loadCountries();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error creating country:", error);
      toast.error("Có lỗi khi tạo mới!");
      return false;
    }
  };

  handleUpdate = async (values) => {
    try {
      await editCountry(values);
      toast.success("Cập nhật thành công!");
      await this.loadCountries();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error updating country:", error);
      toast.error("Có lỗi khi cập nhật!");
      return false;
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteCountry(id);
      toast.success("Xóa thành công!");
      await this.loadCountries();
      return true;
    } catch (error) {
      console.error("Error deleting country:", error);
      toast.error("Có lỗi khi xóa!");
      return false;
    }
  };
}
