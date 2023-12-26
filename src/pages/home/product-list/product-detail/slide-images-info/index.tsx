import React from "react";
import "./index.css";
import { IpropProductDetailImageAndInfo } from "../../../../../interfaces/home.interface";
import { Row, Col, Carousel, Button, Table } from "react-bootstrap";
import { BsCartFill } from "react-icons/bs";
import { FcPrevious, FcNext } from "react-icons/fc";
import { Rating } from "react-simple-star-rating";
import { API_URL, formatDate } from "../../../../../constants/constant";
import { IproductImage } from "../../../../../interfaces/product.inteface";
import moment from "moment";
import { getDiscountProduct } from "../../../../../utils/product.util";

const ProductDetailImagesAndInfo = (props: IpropProductDetailImageAndInfo) => {
  const { productDetail = {}, addToCart } = props;
  const { images = [], rates = [] } = productDetail;
  const rating =
    rates?.reduce(
      (pre: number, next: { rate: number }) => pre + next?.rate,
      0
    ) / rates?.length;
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
            <Rating
              // initialRating={3}
              initialValue={rating}
              allowHover={false}
              size={30}
            />
          </p>
          <Table>
            <tbody>
              <tr>
                <td>Product:</td>
                <td className="text-primary">{productDetail?.name}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td className="fw-bold fs-6 text-danger">
                  {productDetail?.price?.toLocaleString("en-US")} đ
                </td>
              </tr>
              <tr>
                <td>Quantity: </td>
                <td>{productDetail?.quantity}</td>
              </tr>
              {currentDiscount ? (
                <>
                  <tr>
                    <td>Discount:</td>
                    <td>
                      <span className="text-danger fw-bold">
                        {currentDiscount?.discount} %
                      </span>{" "}
                      <i className="DiscountProductDetail">
                        (from{" "}
                        <span className="text-danger fw-bold">
                          {moment(currentDiscount?.startDate).format(
                            formatDate
                          )}
                        </span>{" "}
                        to{" "}
                        <span className="text-danger fw-bold">
                          {moment(currentDiscount?.endDate).format(formatDate)}
                        </span>
                        )
                      </i>
                    </td>
                  </tr>
                  <tr>
                    <td>Only:</td>
                    <td className="fw-bold fs-6 text-danger">
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
              <BsCartFill /> Add to cart
            </Button>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailImagesAndInfo;
