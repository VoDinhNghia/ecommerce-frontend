import React from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import { IpropProductDiscount } from "../../../../interfaces/product.inteface";
import { Tab, Tabs } from "react-bootstrap";
import { productDiscountTab } from "../../../../constants/constant";

const ProductDiscount = (props: IpropProductDiscount) => {
  const { isShowModal, onCloseModal, type } = props;

  const content = (
    <Tabs defaultActiveKey={productDiscountTab.table.key} className="fs-6">
      <Tab
        eventKey={productDiscountTab.table.key}
        title={productDiscountTab.table.title}
      >
        Table discount
      </Tab>
      <Tab
        eventKey={productDiscountTab.addDiscount.key}
        title={productDiscountTab.addDiscount.title}
      >
        add discount
      </Tab>
    </Tabs>
  );
  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      nameTitle="Product Discount"
      content={content}
      size={"sm"}
    />
  );
};

export default connect()(ProductDiscount);
