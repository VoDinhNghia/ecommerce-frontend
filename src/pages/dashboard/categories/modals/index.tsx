import React from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import { ImodalCategory } from "../../../../interfaces/category.interface";
import { modalTypes } from "../../../../constants/constant";
import { Button } from "@mui/material";

const ModalCategory = (props: ImodalCategory) => {
  const { isShowModal, onCloseModal, type, categoryInfo } = props;

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form>
          <Button variant="contained" className="w-100 mt-3" type="submit">
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <span>
          Are you want to delete this <b>{categoryInfo?.name}</b>?
        </span>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      content={content}
      nameTitle="category"
    />
  );
};

export default connect()(ModalCategory);
