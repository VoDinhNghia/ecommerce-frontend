import React from "react";
import { IpropProductDetailImageAndInfo } from "../../../../../interfaces/home.interface";
import { Row, Col, Carousel, Button, Table } from "react-bootstrap";
import { BsCartFill } from "react-icons/bs";
import { FcPrevious, FcNext } from "react-icons/fc";
import { Rating } from "react-simple-star-rating";
import { API_URL, formatDate } from "../../../../../constants/constant";
import { IproductImage } from "../../../../../interfaces/product.inteface";
import moment from "moment";
import {
  caculatorRate,
  getDiscountProduct,
} from "../../../../../utils/product.util";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

const ProductDetailImagesAndInfo = (props: IpropProductDetailImageAndInfo) => {
  const { productDetail = {}, addToCart } = props;
  const { images = [], rates = [] } = productDetail;
  const rating = caculatorRate(rates);
  const currentDiscount = getDiscountProduct(productDetail);

  return (
    <div>
      <Row>
        <Col xl={8} className="mb-2">
          <Carousel
            prevIcon={<FcPrevious className="IconImageProductDetail" />}
            nextIcon={<FcNext className="IconImageProductDetail" />}
          >
            {images?.map((image: IproductImage) => {
              return (
                <Carousel.Item key={image?.id}>
                  <img
                    src={`${API_URL}/products/${image?.url}`}
                    height="350px"
                    width="100%"
                    alt=""
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col xl={4}>
          <p className="text-center mb-3">
            <Button
              variant="outline-light"
              className="border-0"
              disabled={true}
            >
              <Rating
                // initialRating={3}
                initialValue={rating}
                allowHover={false}
                size={30}
              />
            </Button>
          </p>
          <Table>
            <tbody>
              <tr>
                <td>{t("ProductDetailHomePage")}:</td>
                <td className="text-primary">{productDetail?.name}</td>
              </tr>
              <tr>
                <td>{t("PriceDetailHomePage")}:</td>
                <td className="fw-bold fs-6">
                  {productDetail?.price?.toLocaleString("en-US")} đ
                </td>
              </tr>
              <tr>
                <td>{t("QuantityDetailHomePage")}: </td>
                <td>{productDetail?.quantity}</td>
              </tr>
              {currentDiscount ? (
                <>
                  <tr>
                    <td>{t("Sale")}:</td>
                    <td>
                      <span className="badge rounded-pill bg-primary DiscountLabel">
                        -{currentDiscount?.discount}%
                      </span>
                      <span className="DiscountProductDetail ms-1">
                        ({t("FromDetailHomePage")}{" "}
                        <span className="text-dark fw-bold">
                          {moment(currentDiscount?.startDate).format(
                            formatDate
                          )}
                        </span>{" "}
                        {t("ToDetailHomePage")}{" "}
                        <span className="text-dark fw-bold">
                          {moment(currentDiscount?.endDate).format(formatDate)}
                        </span>
                        )
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("OnlyDetailHomePage")}:</td>
                    <td className="fw-bold fs-6 text-success">
                      {productDetail?.price
                        ? Number(
                            productDetail?.price -
                              (currentDiscount?.discount *
                                productDetail?.price) /
                                100
                          ).toLocaleString("en-US")
                        : ""}{" "}
                      đ
                    </td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </Table>
          <p className="text-center">
            <Button
              className="w-100"
              variant="outline-primary"
              onClick={() => addToCart(productDetail)}
            >
              <BsCartFill /> {t("AddToCard")}
            </Button>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation()(ProductDetailImagesAndInfo);
