import React, { useEffect } from "react";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { IpropProductDetailHomePage } from "../../../../interfaces/home.interface";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { productActions } from "../../../../store/actions";

const ProductDetailHomePage = (props: IpropProductDetailHomePage) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    productId,
    productDetail,
    dispatch,
  } = props;

  const fetchProductDetail = () => {
    dispatch({
      type: productActions.GET_PRODUCT_DETAIL,
      id: productId,
    });
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const content = <div>product detail {productDetail?.name}</div>;

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      size="md"
      content={content}
      nameTitle="View product detail"
    />
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    productDetail: state.ProductReducer.productDetail,
  };
};

export default connect(mapStateToProp)(ProductDetailHomePage);
