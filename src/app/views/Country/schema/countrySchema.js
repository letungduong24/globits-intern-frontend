import * as Yup from 'yup';

const countrySchema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").max(100).required("Name is required"),
    code: Yup.string().length(2, "Code must be 2 characters").required("Code is required"),
    description: Yup.string().max(255, "Description can be up to 255 characters").optional(),
});

export default countrySchema;
