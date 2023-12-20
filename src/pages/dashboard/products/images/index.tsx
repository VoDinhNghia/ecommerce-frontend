import React, { useState } from "react";
import {
  IproductImage,
  IpropProductImage,
} from "../../../../interfaces/product.inteface";
import { Tabs, Tab, Form, Carousel } from "react-bootstrap";
import { productImageTab } from "../../../../constants/constant";
import { FcPrevious, FcNext } from "react-icons/fc";
import DialogModalCommonPage from "../../../commons/dialog-mui";

const ProductImages = (props: IpropProductImage) => {
  const { isShowModal, onCloseModal, type, productInfo = {} } = props;
  const [state, setState] = useState({
    isShowBtnUpload: false,
    file: null,
    imageId: null,
    isAvatar: false,
  });

  const onSelectTab = (key: string | null) => {
    if (key === productImageTab.uploadImage.key) {
      setState({ ...state, isShowBtnUpload: true });
    } else {
      setState({ ...state, isShowBtnUpload: false });
    }
  };

  const getIndexImage = (index: number) => {
    const imageList = productInfo?.images || [];
    setState({
      ...state,
      imageId: imageList?.length > 0 ? imageList[index]?.id : null,
    });
  };

  const content = (
    <Tabs
      defaultActiveKey={productImageTab.carousel.key}
      onSelect={(key) => onSelectTab(key)}
      className="fs-6"
    >
      <Tab
        eventKey={productImageTab.carousel.key}
        title={productImageTab.carousel.title}
      >
        <Carousel
          slide={false}
          interval={null}
          prevIcon={
            productInfo?.images?.length > 0 ? (
              <FcPrevious className="IconCasoureImage" />
            ) : null
          }
          nextIcon={
            productInfo?.images?.length > 0 ? (
              <FcNext className="IconCasoureImage" />
            ) : null
          }
          onSelect={(index) => getIndexImage(index)}
        >
          {productInfo?.images?.map((image: IproductImage) => {
            return (
              <Carousel.Item key={image?.id}>
                <img src={image?.url} alt="" width="100%" height={380} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Tab>
      <Tab
        eventKey={productImageTab.uploadImage.key}
        title={productImageTab.uploadImage.title}
      >
        <div className="mt-2 ms-2">
          <Form.Control type="file" />
          <Form.Check label="isAvatar" className="mt-3" />
        </div>
      </Tab>
    </Tabs>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      nameTitle="Product Images"
      content={content}
      size={"sm"}
    />
  );
};

export default ProductImages;
