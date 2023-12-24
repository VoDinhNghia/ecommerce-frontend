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
} from "../../../../../interfaces/common.interface";

const ModalSlideImages = (props: IpropModalSlideImgAdv) => {
  const { isShowModal, onCloseModal, type, slideImageInfo } = props;
  const [state, setState] = useState({
    file: null,
    isActive: true,
    description: "",
    message: "",
  });

  const addSlideImg = () => {
    alert("Add slide image");
  };

  const updateSlideImg = () => {
    alert("Update slide image");
  };

  const onDelete = () => {
    alert("This is fcn delete slide image");
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
            defaultChecked={slideImageInfo?.isActive || true}
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
