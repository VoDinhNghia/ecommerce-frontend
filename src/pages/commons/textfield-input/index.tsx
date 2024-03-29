import React from "react";
import { TextField } from "@mui/material";
import { IpropTextFieldForm } from "../../../interfaces/common.interface";
import { inputTypes } from "../../../constants/constant";

const TextFieldCommon = (props: IpropTextFieldForm) => {
  const {
    errors,
    register,
    field,
    defaultValue = "",
    type = inputTypes.TEXT,
    rows = 4,
    placeholder = "",
  } = props;

  return (
    <TextField
      fullWidth={true}
      size="small"
      type={type}
      rows={type === inputTypes.TEXT_AREA ? rows : null}
      multiline={type === inputTypes.TEXT_AREA ? true : false}
      defaultValue={defaultValue}
      placeholder={placeholder}
      error={errors ? !!errors[field] : null}
      helperText={errors && errors[field] ? errors[field].message : ""}
      {...register(field)}
    />
  );
};

export default TextFieldCommon;
