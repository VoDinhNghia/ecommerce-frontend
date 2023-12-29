import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IpropModalProductReview } from "../../../../interfaces/product.inteface";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { productActions } from "../../../../store/actions";

const ProductReviewMgtPage = (props: IpropModalProductReview) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    productInfo,
    dispatch,
    productDetail,
  } = props;
  const fetchProductDetail = () => {
    if (productInfo?.id) {
      dispatch({
        type: productActions.GET_PRODUCT_DETAIL,
        id: productInfo?.id,
      });
    }
  };
  useEffect(() => {
    fetchProductDetail();
  }, [productInfo]);

  const content = <div>Modal product review {productDetail?.name}</div>;

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      content={content}
      nameTitle={productDetail?.name}
      size={"sm"}
    />
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    productDetail: state.ProductReducer.productDetail,
  };
};

export default connect(mapStateToProp)(ProductReviewMgtPage);
