import * as Yup from 'yup';

const religionSchema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").max(100).required("Name is required"),
    code: Yup.string().min(1, "Code is required").max(50).required("Code is required"),
    description: Yup.string().max(255, "Description can be up to 255 characters").optional(),
});

export default religionSchema;

