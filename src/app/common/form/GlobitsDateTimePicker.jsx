import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const GlobitsDateTimePicker = ({
  name,
  size,
  format,
  variant,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: variant ? variant : "outlined",
    size: size ? size : "small",
    format: format ? format : "dd/MM/yyyy",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

export default GlobitsDateTimePicker;
