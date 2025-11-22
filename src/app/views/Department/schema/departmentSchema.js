import * as Yup from 'yup';

const departmentSchema = Yup.object({
    name: Yup.string().min(2, "Tên phòng ban phải có ít nhất 2 ký tự").max(255, "Tên phòng ban không được quá 255 ký tự").required("Tên phòng ban là bắt buộc"),
    code: Yup.string().min(1, "Mã phòng ban là bắt buộc").max(50, "Mã phòng ban không được quá 50 ký tự").required("Mã phòng ban là bắt buộc"),
    description: Yup.string().max(500, "Mô tả không được quá 500 ký tự").optional(),
    parentId: Yup.string().uuid("ID phòng ban cha không hợp lệ").nullable().optional(),
    func: Yup.string().max(255, "Chức năng không được quá 255 ký tự").optional(),
    industryBlock: Yup.string().max(255, "Khối ngành không được quá 255 ký tự").optional(),
    foundedNumber: Yup.string().max(100, "Số thành lập không được quá 100 ký tự").optional(),
    foundedDate: Yup.date().nullable().optional(),
    displayOrder: Yup.string().max(50, "Thứ tự hiển thị không được quá 50 ký tự").optional(),
});

export default departmentSchema;

