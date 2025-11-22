import { makeAutoObservable, runInAction } from "mobx";
import { pagingAllDepartments, createDepartment, editDepartment, deleteDepartment, getDepartment } from "./DepartmentService";
import { toast } from "react-toastify";

export default class DepartmentStore {
  departments = [];
  page = 0;
  pageSize = 10;
  totalElements = 0;
  currentDepartment = null;
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

  setCurrentDepartment = (department) => {
    this.currentDepartment = department;
  };

  setOpen = (open) => {
    this.open = open;
  };

  handleOpen = () => {
    this.currentDepartment = null;
    this.open = true;
  };

  handleClose = () => {
    this.currentDepartment = null;
    this.open = false;
  };

  handleEdit = async (department) => {
    try {
      // Load full department data including parent information
      const response = await getDepartment(department.id);
      runInAction(() => {
        this.currentDepartment = response?.data || department;
        this.open = true;
      });
    } catch (error) {
      console.error("Error loading department:", error);
      // Fallback to the department data from the list
      runInAction(() => {
        this.currentDepartment = department;
        this.open = true;
      });
    }
  };

  loadDepartments = async () => {
    this.loading = true;
    try {
      // Load all departments for tree view using pagingDepartments (returns all, not just roots)
      const searchObject = {
        pageIndex: 1,
        pageSize: 10000, // Load all for tree view
      };

      if (this.keyword && this.keyword.trim() !== "") {
        searchObject.keyword = this.keyword.trim();
      }

      // Use pagingAllDepartments which calls /pagingDepartments endpoint
      // This returns ALL departments, not just root ones
      const response = await pagingAllDepartments(searchObject);
      const content = response?.data?.content || [];

      runInAction(() => {
        this.departments = Array.isArray(content) ? [...content] : [];
        this.totalElements = response?.data?.totalElements || 0;
        this.loading = false;
      });
    } catch (error) {
      console.error("Error loading departments:", error);
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Có lỗi khi tải dữ liệu!");
    }
  };

  handleCreate = async (values) => {
    try {
      await createDepartment(values);
      toast.success("Tạo mới thành công!");
      await this.loadDepartments();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error("Có lỗi khi tạo mới!");
      return false;
    }
  };

  handleUpdate = async (values) => {
    try {
      await editDepartment(values);
      toast.success("Cập nhật thành công!");
      await this.loadDepartments();
      this.handleClose();
      return true;
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Có lỗi khi cập nhật!");
      return false;
    }
  };

  handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      toast.success("Xóa thành công!");
      await this.loadDepartments();
      return true;
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Có lỗi khi xóa!");
      return false;
    }
  };
}
