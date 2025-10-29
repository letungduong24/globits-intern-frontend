import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFormikContext, useField } from "formik";
import React from "react";

const GlobitsAutocomplete = ({
  name,
  options,
  displayData,
  variant,
  size,
  isObject,
  properties,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (_, value) => {
    if(isObject != null && !isObject){
      setFieldValue(name, value.value ? value.value : null);
    }else{
      setFieldValue(name, value ? value : null);
    }
    
  };

  const configAutocomplete = {
    ...field,
    ...otherProps,
    id: name,
    size: size ? size : "small",
    options: options,
    getOptionLabel: (option) =>
      option[displayData ? displayData : "name"]
        ? option[displayData ? displayData : "name"]
        : "",
    onChange: handleChange,
    getOptionSelected: (option, value) => option.id === value.id,
    renderInput: (params) => (
      <TextField {...params} variant={variant ? variant : "outlined"} />
    ),
  };

  if (meta && meta.touched && meta.error) {
    configAutocomplete.error = true;
    configAutocomplete.helperText = meta.error;
  }

  return <Autocomplete {...configAutocomplete} />;
};
export default GlobitsAutocomplete;

// export default function GlobitsAutocomplete(props) {
//   const {
//     name,
//     label,
//     setFieldValue,
//     options,
//     value,
//     defaultValue,
//     displayData,
//     size,
//     variant,
//   } = props;
//   const [field, meta] = useField(props);
//   const onChange = (event, value) => {
//     setFieldValue(props.name, value ? value : null);
//   };

//   return (
//     <>
//       <Autocomplete
//         {...props}
//         {...field}
//         id={name}
//         options={options}
//         getOptionLabel={(option) =>
//           option[displayData ? displayData : "name"]
//             ? option[displayData ? displayData : "name"]
//             : ""
//         }
//         onChange={onChange}
//         value={value}
//         size={size ? size : "small"}
//         defaultValue={defaultValue ? defaultValue : undefined}
//         getOptionSelected={(option, value) => option.id === value.id}
//         filterSelectedOptions
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant={variant ? variant : "outlined"}
//             label={label}
//           />
//         )}
//       />

//       <ErrorMessage component="div" name={name} className="color-red" />
//     </>
//   );
// }
