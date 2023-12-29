import React, { useEffect, useState } from "react";
import "./index.css";
import {
  IproductImage,
  IpropProductImage,
} from "../../../../interfaces/product.inteface";
import { Tabs, Tab, Form, Carousel, Button } from "react-bootstrap";
import { API_URL, productImageTab } from "../../../../constants/constant";
import { FcPrevious, FcNext } from "react-icons/fc";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import {
  IchangeFileEvent,
  IcheckBoxEvent,
  IformDataType,
  IstateRedux,
} from "../../../../interfaces/common.interface";
import { connect } from "react-redux";
import { productActions } from "../../../../store/actions";

const ProductImages = (props: IpropProductImage) => {
  const {
    isShowModal,
    onCloseModal,
    type,
    productInfo = {},
    dispatch,
    productDetail = {},
  } = props;
  const [state, setState] = useState({
    file: null,
    imageId: null,
    isAvatar: false,
    message: "",
    activeKey: productImageTab.carousel.key,
  });

  const getIndexImage = (index: number) => {
    const imageList = productDetail?.images || [];
    setState({
      ...state,
      imageId: imageList?.length > 0 ? imageList[index]?.id : null,
    });
  };

  const uploadImage = () => {
    if (state?.file) {
      const formData: IformDataType = new FormData();
      formData.append("file", state?.file);
      formData.append("productId", productDetail?.id);
      formData.append("isAvatar", state?.isAvatar);
      dispatch({
        type: productActions.UPLOAD_PRODUCT_IMAGE,
        payload: formData,
      });
      onSelectTab(productImageTab.carousel.key);
      setTimeout(() => {
        fetchProductDetail();
      }, 100);
      setState({
        ...state,
        message: "",
      });
    } else {
      setState({ ...state, message: "please choose file to upload" });
    }
  };

  const deleteImage = () => {
    dispatch({
      type: productActions.DELETE_PRODUCT_IMAGE,
      id: state?.imageId,
    });
    setTimeout(() => {
      fetchProductDetail();
    }, 100);
  };

  const onSelectTab = (key: string | null) => {
    setState({ ...state, activeKey: key || "" });
  };

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
  }, []);

  const content = (
    <Tabs
      activeKey={state.activeKey}
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
            productDetail?.images?.length > 0 ? (
              <FcPrevious className="IconCasoureImage" />
            ) : null
          }
          nextIcon={
            productDetail?.images?.length > 0 ? (
              <FcNext className="IconCasoureImage" />
            ) : null
          }
          onSelect={(index) => getIndexImage(index)}
        >
          {productDetail?.images?.map((image: IproductImage) => {
            const imgId = image?.id || "";
            return (
              <Carousel.Item key={imgId}>
                <img
                  src={`${API_URL}/products/${image?.url}`}
                  alt=""
                  width="100%"
                  height={380}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
        <p className="text-end mt-2">
          <Button variant="danger" size="sm" onClick={() => deleteImage()}>
            Delete
          </Button>
        </p>
      </Tab>
      <Tab
        eventKey={productImageTab.uploadImage.key}
        title={productImageTab.uploadImage.title}
      >
        <div className="mt-2 ms-2">
          <Form.Control
            type="file"
            onChange={(e: IchangeFileEvent) =>
              setState({ ...state, file: e.target.files[0] })
            }
          />
          <p className="text-danger ms-3">{state?.message}</p>
          <Form.Check
            label="isAvatar"
            className="mt-3"
            onClick={(e: IcheckBoxEvent) =>
              setState({ ...state, isAvatar: e.target.checked })
            }
          />
          <p className="text-end">
            <Button className="mt-3" onClick={() => uploadImage()}>
              Upload
            </Button>
          </p>
        </div>
      </Tab>
    </Tabs>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      nameTitle={productDetail?.name}
      content={content}
      size={"sm"}
    />
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    productDetail: state.ProductReducer.productDetail,
  };
};

export default connect(mapStateToProp)(ProductImages);
