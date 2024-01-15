import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  IproductReview,
  IpropModalProductReview,
} from "../../../../interfaces/product.inteface";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import {
  IallStateReadMore,
  IstateRedux,
} from "../../../../interfaces/common.interface";
import { productActions } from "../../../../store/actions";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import HeaderTableCommon from "../../../commons/header-table";
import { headerReviewTable } from "../../../../utils/product.util";
import moment from "moment";
import { formatDate, modalTypes } from "../../../../constants/constant";
import ActionTableCommon from "../../../commons/actions-table";
import ReadMoreCommon from "../../../commons/readmore";
import ReviewProductActionMgtPage from "./action";

const ProductReviewMgtPage = (props: IpropModalProductReview) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    productInfo,
    dispatch,
    productDetail,
  } = props;
  const [state, setState] = useState({
    isShowModalDelete: false,
    rowData: {},
    readMore: {},
  });

  const reviewReadMore: IallStateReadMore = state.rowData;
  const allStateReadMore: IallStateReadMore = state.readMore;

  const handleReadMore = (reviewInfo: IallStateReadMore) => {
    const isReadMore = allStateReadMore[`${reviewInfo?.id}`];
    setState({
      ...state,
      readMore: { [`${reviewInfo?.id}`]: !isReadMore },
      rowData: reviewInfo,
    });
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
  }, [productInfo]);

  const content = (
    <TableContainer>
      <Table stickyHeader aria-label="Review table">
        <HeaderTableCommon headerList={headerReviewTable} />
        <TableBody>
          {productDetail?.reviews?.length > 0 ? (
            productDetail?.reviews?.map(
              (review: IproductReview, index: number) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={review?.id}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <ReadMoreCommon
                        isReadMore={
                          review.id === reviewReadMore?.id
                            ? allStateReadMore[`${review.id}`]
                            : false
                        }
                        setReadMore={() => handleReadMore(review)}
                        lengthSlice={35}
                      >
                        {review?.content}
                      </ReadMoreCommon>
                    </TableCell>
                    <TableCell>
                      {moment(review?.createdAt).format(formatDate)}
                    </TableCell>
                    <TableCell className="text-primary">{`${review?.user?.lastName} ${review?.user?.middleName} ${review?.user?.firstName}`}</TableCell>
                    <TableCell>
                      <ActionTableCommon
                        state={state}
                        setState={setState}
                        disableBtnUpdate={true}
                        rowData={review}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )
          ) : (
            <TableRow>
              <TableCell className="mt-4 text-center fw-bold fs-5">
                No review
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <DialogModalCommonPage
        type={type}
        isShowModal={isShowModal}
        onCloseModal={() => onCloseModal()}
        content={content}
        nameTitle={productDetail?.name}
        size={"md"}
      />
      <ReviewProductActionMgtPage
        type={modalTypes.DELETE}
        isShowModal={state.isShowModalDelete}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
        fetchProductDetail={() => fetchProductDetail()}
        reviewInfo={state.rowData}
      />
    </>
  );
};

export default connect((state: IstateRedux) => ({
  productDetail: state.ProductReducer.productDetail,
}))(ProductReviewMgtPage);
