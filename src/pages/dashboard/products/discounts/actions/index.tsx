import React from "react";
import DialogModalCommonPage from "../../../../commons/dialog-mui";
import { connect } from "react-redux";
import { IpropActionDiscount } from "../../../../../interfaces/product.inteface";
import moment from "moment";
import { formatDate } from "../../../../../constants/constant";
import { productActions } from "../../../../../store/actions";

const ProductDiscountAction = (props: IpropActionDiscount) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    discountInfo,
    dispatch,
    fetchProducts,
  } = props;
  const onDelete = () => {
    dispatch({
      type: productActions.DELETE_PRODUCT_DISCOUNT,
      id: discountInfo?.id,
    });
    setTimeout(() => {
      fetchProducts();
      onCloseModal();
    }, 100);
  };

  const content = (
    <div>
      Are you want to delete this discount {discountInfo?.discount}% start from{" "}
      <b>{moment(discountInfo?.startDate).format(formatDate)}</b> to{" "}
      <b>{moment(discountInfo?.endDate).format(formatDate)}</b>?
    </div>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      nameTitle="discount"
      content={content}
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ProductDiscountAction);
