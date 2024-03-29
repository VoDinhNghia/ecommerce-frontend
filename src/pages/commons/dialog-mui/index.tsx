import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import { modalTypes } from "../../../constants/constant";
import { ImodalCommon } from "../../../interfaces/common.interface";

const DialogModalCommonPage = (props: ImodalCommon) => {
  const {
    type,
    isShowModal,
    onCloseModal,
    nameTitle,
    content,
    onDelete,
    onFilter,
    isShowButtonUpdate = false,
    onUpdate,
    size = "xs",
  } = props;

  return (
    <Dialog
      open={isShowModal}
      fullWidth={true}
      maxWidth={size}
      onClose={() => onCloseModal()}
    >
      <DialogTitle>
        {type === modalTypes.ADD ? `Add new ${nameTitle}` : ""}
        {type === modalTypes.UPDATE ? `Update ${nameTitle}` : ""}
        {type === modalTypes.DELETE ? `Delete ${nameTitle}` : ""}
        {type === modalTypes.VIEW ? nameTitle : ""}
        {type === modalTypes.IMPORT ? `Import multi ${nameTitle}` : ""}
        {type === modalTypes.FILTER ? `Filter ${nameTitle}` : ""}
        {type === modalTypes.OPTIONS ? `Select ${nameTitle}` : ""}
        <IconButton className="DialogTitleClose" onClick={() => onCloseModal()}>
          X
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>{content}</div>
      </DialogContent>
      <DialogActions>
        {type === modalTypes.UPDATE && isShowButtonUpdate ? (
          <Button
            variant="contained"
            className="w-100"
            onClick={() => onUpdate()}
          >
            Save
          </Button>
        ) : null}
        {type === modalTypes.DELETE ? (
          <Button variant="contained" color="error" onClick={() => onDelete()}>
            Yes
          </Button>
        ) : (
          ""
        )}
        {type === modalTypes.FILTER ? (
          <Button
            variant="contained"
            className="w-100"
            onClick={() => onFilter()}
          >
            Filter
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogModalCommonPage;
