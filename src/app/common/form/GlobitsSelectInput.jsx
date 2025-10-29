import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const GlobitsSelectInput = ({
  name,
  keyValue,
  options,
  size,
  variant,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelectInput = {
    ...field,
    ...otherProps,
    select: true,
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelectInput.error = true;
    configSelectInput.helperText = meta.error;
  }

  return (
    <TextField {...configSelectInput}>
      {options.map((item, pos) => {
        return (
          <MenuItem key={pos} value={item[keyValue]}>
            {item.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default GlobitsSelectInput;
