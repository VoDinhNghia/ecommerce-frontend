import React, { useState } from "react";
import "./index.css";
import { IpropProductDetailComponent } from "../../../../../interfaces/home.interface";
import { connect } from "react-redux";
import {
  formatDate,
  proDetailHomepageTab,
} from "../../../../../constants/constant";
import { Tabs, Table, Tab, Card, Button, Form } from "react-bootstrap";
import moment from "moment";
import { Rating } from "react-simple-star-rating";
import { getCurrentUser } from "../../../../../services/auth.service";
import { IproductReview } from "../../../../../interfaces/product.inteface";
import { productActions } from "../../../../../store/actions";

const ProductDetailComponent = (props: IpropProductDetailComponent) => {
  const { productDetail = {}, fetchProductDetail, dispatch, fetchProducts } = props;
  const [state, setState] = useState({
    content: "",
    message: "",
  });
  const { detail, reviews = [], rates = [] } = productDetail;
  const currentUser = getCurrentUser();

  const addRate = (rate: number) => {
    dispatch({
      type: productActions.ADD_PRODUCT_RATE,
      payload: {
        productId: productDetail?.id,
        rate,
      },
    });
    setTimeout(() => {
      fetchProductDetail();
      fetchProducts();
    }, 100);
  };

  const addReview = () => {
    if (state.content) {
      dispatch({
        type: productActions.ADD_PRODUCT_REVIEW,
        payload: {
          productId: productDetail?.id,
          content: state.content,
        },
      });
      setState({ ...state, message: "" });
    } else {
      setState({ ...state, message: "please enter review" });
    }
    setTimeout(() => {
      fetchProductDetail();
      fetchProducts();
    }, 100);
  };

  const userReview = (review: IproductReview) => {
    const findUserRateNumber = rates?.find(
      (x: { userId: string }) => x?.userId === review?.userId
    )?.rate;
    return findUserRateNumber ? (
      <Rating initialValue={findUserRateNumber} size={16} allowHover={false} />
    ) : null;
  };

  return (
    <Tabs
      defaultActiveKey={proDetailHomepageTab.detail.key}
      className="mt-3 fw-bold fs-6"
    >
      <Tab
        eventKey={proDetailHomepageTab.detail.key}
        title={proDetailHomepageTab.detail.title}
      >
        {detail ? (
          <Table className="mt-3 text-black w-60">
            <thead>
              <tr>
                <th className="bg-primary" style={{ width: "35%" }}>
                  name
                </th>
                <th className="bg-primary">specifications</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Country</td>
                <td>{detail?.country}</td>
              </tr>
              <tr>
                <td>Date of manufacture</td>
                <td>{moment(detail?.dateOfManufacture).format(formatDate)}</td>
              </tr>
              <tr>
                <td>Warranty expiration</td>
                <td>{detail?.warrantyExpiration}</td>
              </tr>
              {detail?.size ? (
                <tr>
                  <td>Size</td>
                  <td>{detail?.size}</td>
                </tr>
              ) : null}
              {detail?.color ? (
                <tr>
                  <td>Color</td>
                  <td>{detail?.color}</td>
                </tr>
              ) : null}
              {detail?.mainboard ? (
                <tr>
                  <td>Mainboard</td>
                  <td>{detail?.mainboard}</td>
                </tr>
              ) : null}
              {detail?.inputPower ? (
                <tr>
                  <td>InputPower</td>
                  <td>{detail?.inputPower}</td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        ) : null}
      </Tab>
      <Tab
        eventKey={proDetailHomepageTab.description.key}
        title={proDetailHomepageTab.description.title}
      >
        <div className="mt-3 ms-3 text-black">
          <p>{productDetail?.description}</p>
        </div>
      </Tab>
      <Tab
        eventKey={proDetailHomepageTab.reviewRate.key}
        title={proDetailHomepageTab.reviewRate.title}
      >
        <div className="mt-2">
          {reviews?.map((review: IproductReview) => {
            return (
              <Card key={review?.id} className="mb-3">
                <Card.Header>
                  <img
                    src="/images/userIcon.jpg"
                    className="AvatarImageReview"
                    alt=""
                  />{" "}
                  {`${review?.user?.lastName} ${review?.user?.middleName} ${review?.user?.firstName}`}{" "}
                  ({userReview(review)})
                  <br />
                  <span className="ReviewDateDisplay">
                    {moment(review?.createdAt).format(formatDate)}
                  </span>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{review?.content}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
          {currentUser?.id ? (
            <Card className="text-black">
              <Card.Body>
                <Card.Text>Rate product</Card.Text>
                <Card.Text>
                  <Rating
                    size={25}
                    initialValue={25}
                    onClick={(rate) => addRate(rate)}
                  />
                </Card.Text>
                <Card.Text>Content</Card.Text>
                <Card.Text>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) =>
                      setState({ ...state, content: e.target.value })
                    }
                  />
                  <span className="text-danger">{state.message}</span>
                </Card.Text>
                <Card.Text>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => addReview()}
                  >
                    Add review
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ) : null}
        </div>
      </Tab>
    </Tabs>
  );
};

export default connect()(ProductDetailComponent);
