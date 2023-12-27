import React from "react";
import { connect } from "react-redux";
import { IpropModalProductReview } from "../../../../interfaces/product.inteface";
import DialogModalCommonPage from "../../../commons/dialog-mui";

const ProductReviewMgtPage = (props: IpropModalProductReview) => {
  const { isShowModal, type, onCloseModal } = props;
  const content = <div>Modal product review</div>;

  return (
    <DialogModalCommonPage
      type={type}
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      content={content}
      nameTitle="View product review"
      size={"sm"}
    />
  );
};

export default connect()(ProductReviewMgtPage);
