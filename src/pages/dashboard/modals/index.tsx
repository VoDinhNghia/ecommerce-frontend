import React, { useState, useEffect } from "react";
import "./index.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IpropModal } from "../../../interfaces/dashboard.interface";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
} from "@mui/material";
import {
  inputTypes,
  modalTypes,
  selectMuiTypes,
  userGenderOptions,
} from "../../../constants/constant";
import { connect } from "react-redux";
import { IeventOnchangeInput } from "../../../interfaces/common.interface";
import {
  IregisterInputUpdatePassordForm,
  registerSchemaUpdatePasswordForm,
} from "../../../utils/user.util";
import TextFieldCommon from "../../commons/textfield-input";
import SelectMuiCommon from "../../commons/select-mui";

const DashboardModalPage = (props: IpropModal) => {
  const { type, isShowModal, onCloseModal, userInfo = {} } = props;

  const [state, setState] = useState({
    email: userInfo?.email,
    lastName: userInfo?.profile?.lastName,
    firstName: userInfo?.profile?.firstName,
    middleName: userInfo?.profile?.middleName,
    gender: userInfo?.profile?.gender,
    mobile: userInfo?.profile?.mobile,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterInputUpdatePassordForm>({
    resolver: zodResolver(registerSchemaUpdatePasswordForm),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onHandleSubmitUpdatePassword: SubmitHandler<
    IregisterInputUpdatePassordForm
  > = (values) => {
    console.log('values', values);
  };

  return (
    <Dialog
      open={isShowModal}
      onClose={() => onCloseModal()}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle>
        {type === modalTypes.UPDATE ? "Update general user info" : null}
        {type === modalTypes.UPDATE_PASSWORD ? "Update password" : null}
        {type === modalTypes.UPDATE_PROFILE ? "Update profile user" : null}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {type === modalTypes.UPDATE ? (
          <>
            <p className="mb-1">Email: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.email}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, email: e.target.value })
              }
            />
          </>
        ) : null}
        {type === modalTypes.UPDATE_PASSWORD ? (
          <form onSubmit={handleSubmit(onHandleSubmitUpdatePassword)}>
            <p className="mb-1">Current password: </p>
            <TextFieldCommon
              field="currentPassword"
              type={inputTypes.PASSWORD}
              errors={errors}
              register={register}
            />
            <p className="mt-2 mb-1">New password: </p>
            <TextFieldCommon
              field="newPassword"
              type={inputTypes.PASSWORD}
              errors={errors}
              register={register}
            />
            <p className="mt-2 mb-1">Enter new password: </p>
            <TextFieldCommon
              field="confirmPassword"
              type={inputTypes.PASSWORD}
              errors={errors}
              register={register}
            />
            <Button type="submit" variant="contained" className="mt-4 w-100">
              Change password
            </Button>
          </form>
        ) : null}
        {type === modalTypes.UPDATE_PROFILE ? (
          <>
            <p className="mb-1">LastName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.lastName}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, lastName: e.target.value })
              }
            />
            <p className="mt-2 mb-1">MiddleName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.middleName}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, middleName: e.target.value })
              }
            />
            <p className="mt-2 mb-1">FirstName: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.firstName}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, firstName: e.target.value })
              }
            />
            <p className="mt-2 mb-1">Gender: </p>
            <SelectMuiCommon
              type={selectMuiTypes.NORMAL}
              options={userGenderOptions}
              defaultValue={userInfo?.profile?.gender}
              onChangeSelect={(value: string) =>
                setState({ ...state, gender: value })
              }
            />
            <p className="mt-2 mb-1">Mobile: </p>
            <TextField
              size="small"
              variant="outlined"
              defaultValue={userInfo?.profile?.mobile}
              fullWidth={true}
              onChange={(e: IeventOnchangeInput) =>
                setState({ ...state, mobile: e.target.value })
              }
            />
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        {type === modalTypes.UPDATE ? (
          <Button
            variant="contained"
            className="w-100"
          >
            Save Info
          </Button>
        ) : null}
        {type === modalTypes.UPDATE_PROFILE ? (
          <Button
            variant="contained"
            className="w-100"
          >
            Save Profile
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default connect()(DashboardModalPage);
