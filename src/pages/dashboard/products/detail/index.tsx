import React from "react";
import { connect } from "react-redux";
import { IpropProductDetail } from "../../../../interfaces/product.inteface";
import DialogModalCommonPage from "../../../commons/dialog-mui";

const ProductDetail = (props: IpropProductDetail) => {
  const { isShowModal, onCloseModal, type, productInfo } = props;

  const content = (
    <div>Product detail</div>
  )

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      type={type}
      content={content}
      nameTitle="product"
      size={productInfo?.detail ? "sm" : 'xs'}
    />
  );
};

export default connect()(ProductDetail);
