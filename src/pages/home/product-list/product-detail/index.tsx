import React, { useEffect } from "react";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { IpropProductDetailHomePage } from "../../../../interfaces/home.interface";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { productActions } from "../../../../store/actions";
import ProductDetailImagesAndInfo from "./slide-images-info";
import { Iproduct } from "../../../../interfaces/product.inteface";
import ProductDetailComponent from "./detail";

const ProductDetailHomePage = (props: IpropProductDetailHomePage) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    productId,
    productDetail,
    dispatch,
    addToCart,
    fetchProducts,
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

  const content = (
    <div>
      <ProductDetailImagesAndInfo
        productDetail={productDetail}
        addToCart={(product: Iproduct) => addToCart(product)}
      />
      <ProductDetailComponent
        productDetail={productDetail}
        fetchProducts={() => fetchProducts()}
        fetchProductDetail={() => fetchProductDetail()}
      />
    </div>
  );

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

export default connect((state: IstateRedux) => ({
  productDetail: state.ProductReducer.productDetail,
}))(ProductDetailHomePage);
