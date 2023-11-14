import React from "react";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { ImodalProductPage } from "../../../../interfaces/product.inteface";
import { modalTypes } from "../../../../constants/constant";
import { Button } from "@mui/material";
import { productActions } from "../../../../store/actions";

const ModalProductPage = (props: ImodalProductPage) => {
  const { isShowModal, type, onCloseModal, productInfo = {}, dispatch } = props;

  const onDelete = () => {
    dispatch({
      type: productActions.DELETE_PRODUCT,
      id: productInfo?.id,
    });
  };

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form>
          <Button variant="contained" className="mt-3 w-100" type="submit">
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <span>
          Are you want to delete this <b>{productInfo?.name}</b>?
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
      onDelete={() => onDelete()}
      nameTitle="product"
    />
  );
};

export default connect()(ModalProductPage);
