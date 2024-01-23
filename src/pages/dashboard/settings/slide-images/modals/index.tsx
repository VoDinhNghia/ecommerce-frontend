import React, { useState } from "react";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../../commons/dialog-mui";
import { IpropModalSlideImgAdv } from "../../../../../interfaces/settings.interface";
import { Button } from "@mui/material";
import { modalTypes } from "../../../../../constants/constant";
import { Form } from "react-bootstrap";
import {
  IchangeFileEvent,
  IcheckBoxEvent,
  IformDataType,
} from "../../../../../interfaces/common.interface";
import { settingActions } from "../../../../../store/actions";

const ModalSlideImages = (props: IpropModalSlideImgAdv) => {
  const {
    isShowModal,
    onCloseModal,
    type,
    slideImageInfo,
    dispatch,
    fetchSlideImg,
  } = props;
  const [state, setState] = useState({
    file: null,
    isActive: null,
    description: "",
    message: "",
  });

  const addSlideImg = () => {
    if (state?.file) {
      const formData: IformDataType = new FormData();
      formData.append("file", state?.file);
      formData.append("description", state?.description);
      formData.append("isActive", state?.isActive);
      actionSlideModal(settingActions.ADD_SLIDE_IMAGE, "", formData);
    }
    setState({
      ...state,
      message: state.file ? "" : "please choose file to upload",
    });
  };

  const updateSlideImg = () => {
    actionSlideModal(settingActions.UPDATE_SLIDE_IMAGE, slideImageInfo?.id, {
      isActive: state?.isActive || slideImageInfo.isActive,
      description: state?.description || slideImageInfo?.description,
    });
  };

  const onDelete = () => {
    actionSlideModal(settingActions.DELETE_SLIDE_IMAGE, slideImageInfo?.id);
  };

  const actionSlideModal = (action: string, id = "", payload = {}) => {
    const actionSaga: { id?: string; payload?: object; type: string } = {
      type: action,
    };
    if (id) {
      actionSaga.id = id;
    }
    if (payload) {
      actionSaga.payload = payload;
    }
    dispatch(actionSaga);
    setTimeout(() => {
      fetchSlideImg();
      onCloseModal();
    }, 100);
  };

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <div>
          {type === modalTypes.ADD ? (
            <Form.Control
              type="file"
              onChange={(e: IchangeFileEvent) =>
                setState({ ...state, file: e.target.files[0] })
              }
            />
          ) : null}
          <p className="text-danger ms-3">{state?.message}</p>
          <Form.Check
            label="isActive"
            className="mt-3"
            defaultChecked={slideImageInfo?.isActive}
            onClick={(e: IcheckBoxEvent) =>
              setState({ ...state, isActive: e.target.checked })
            }
          />
          <Form.Label className="mt-2">Description: </Form.Label>
          <Form.Control
            as="textarea"
            defaultValue={slideImageInfo?.description}
            rows={3}
            placeholder="write something description at here..."
            onChange={(e) =>
              setState({ ...state, description: e?.target?.value })
            }
          />
          <Button
            variant="contained"
            className="mt-3 w-100"
            onClick={
              type === modalTypes.ADD
                ? () => addSlideImg()
                : () => updateSlideImg()
            }
          >
            Save
          </Button>
        </div>
      ) : null}
      {type === modalTypes.DELETE ? (
        <p>
          Are you want to delete this <b>{slideImageInfo?.originName}</b>?
        </p>
      ) : null}
    </div>
  );
  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      content={content}
      nameTitle="slide image"
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ModalSlideImages);
