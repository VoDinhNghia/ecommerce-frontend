import React from "react";
import { connect } from "react-redux";
import { IpropModalActionReview } from "../../../../../interfaces/product.inteface";
import { productActions } from "../../../../../store/actions";
import DialogModalCommonPage from "../../../../commons/dialog-mui";

const ReviewProductActionMgtPage = (props: IpropModalActionReview) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    fetchProductDetail,
    reviewInfo,
    dispatch,
  } = props;

  const onDelete = () => {
    dispatch({
      type: productActions.DELETE_PRODUCT_REVIEW,
      id: reviewInfo?.id,
    });
    setTimeout(() => {
      fetchProductDetail();
      onCloseModal();
    }, 100);
  };

  const content = (
    <>
      Are you want to this review <b>{reviewInfo?.content}</b>?
    </>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      content={content}
      nameTitle="review"
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ReviewProductActionMgtPage);
