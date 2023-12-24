import React from "react";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../../commons/dialog-mui";
import { IpropModalSlideImgAdv } from "../../../../../interfaces/settings.interface";
import { Button } from "@mui/material";
import { modalTypes } from "../../../../../constants/constant";

const ModalSlideImages = (props: IpropModalSlideImgAdv) => {
  const { isShowModal, onCloseModal, type, slideImageInfo } = props;
  const onDelete = () => {
    alert("This is fcn delete slide image");
  };
  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form>
          <Button variant="contained" className="mt-3 w-100" type="submit">
            Save
          </Button>
        </form>
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
