import React, { useEffect, useState } from "react";
import { Container } from "rsuite";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import { validateRoleSa } from "../../../utils/permission.util";
import ForbidenPage from "../../commons/forbiden";
import TitleHeaderPage from "../../commons/title-header";
import AddAndSearchTable from "../../commons/add-search-table";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { connect } from "react-redux";
import {
  Iproduct,
  IpropProductPage,
} from "../../../interfaces/product.inteface";
import { IstateRedux } from "../../../interfaces/common.interface";
import HeaderTableCommon from "../../commons/header-table";
import { headerProductTable } from "../../../utils/product.util";
import { Button } from "react-bootstrap";
import ActionTableCommon from "../../commons/actions-table";
import { categoryActions, productActions } from "../../../store/actions";
import PaginationTableCommon from "../../commons/pagination-table";
import ModalProductPage from "./modals";
import { modalTypes, routes } from "../../../constants/constant";
import ProductDetail from "./detail";
import ProductImages from "./images";
import ProductDiscount from "./discounts";
import ProductReviewMgtPage from "./reviews";

const ProductMgtPage = (props: IpropProductPage) => {
  const {
    dispatch,
    listProducts = [],
    totalProduct = 0,
    listCategories = [],
  } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    isShowModalAdd: false,
    rowData: {},
    isShowModalUpdate: false,
    isShowModalDelete: false,
    isShowModalDetail: false,
    isShowModalImage: false,
    isShowModalDiscount: false,
    isShowModalReview: false,
  });
  const isRoleSa = validateRoleSa();
  const fetchCategories = () => {
    dispatch({
      type: categoryActions.GET_LIST_CATEGORY,
    });
  };
  const fetchProducts = (page: number, limit: number) => {
    fetchProductCommon({ page, limit });
  };
  const onSearch = (searchKey: string) => {
    fetchProductCommon({ searchKey });
  };
  const fetchProductCommon = (payload = {}) => {
    dispatch({
      type: productActions.GET_LIST_PRODUCT,
      payload,
    });
  };
  useEffect(() => {
    fetchProducts(state.page + 1, state.limit);
    fetchCategories();
  }, []);

  const TableProduct = (
    <TableContainer>
      <Table stickyHeader aria-label="product table">
        <HeaderTableCommon headerList={headerProductTable} />
        <TableBody>
          {listProducts?.map((product: Iproduct, index: number) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={product?.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-primary">{product?.name}</TableCell>
                <TableCell>{product?.description}</TableCell>
                <TableCell>
                  <span>{product?.price?.toLocaleString("en-US")}đ</span>
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell className="text-primary">
                  <a href={routes.category}>{product?.category?.name}</a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setState({
                        ...state,
                        isShowModalDetail: true,
                        rowData: product,
                      })
                    }
                  >
                    {product.detail ? "View" : "Add"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setState({
                        ...state,
                        isShowModalReview: true,
                        rowData: product,
                      })
                    }
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setState({
                        ...state,
                        isShowModalDiscount: true,
                        rowData: product,
                      })
                    }
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      setState({
                        ...state,
                        isShowModalImage: true,
                        rowData: product,
                      })
                    }
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <ActionTableCommon
                    state={state}
                    setState={setState}
                    rowData={product}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      {isRoleSa ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <TitleHeaderPage title="Products Management" />
              <AddAndSearchTable
                title="Add product"
                onSearch={(key: string) => onSearch(key)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              {TableProduct}
              <PaginationTableCommon
                total={totalProduct}
                limit={state.limit}
                page={state.page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchProducts(page, limit)
                }
              />
              <ModalProductPage
                isShowModal={state.isShowModalAdd}
                type={modalTypes.ADD}
                productInfo={{}}
                categories={listCategories}
                onCloseModal={() =>
                  setState({ ...state, isShowModalAdd: false })
                }
                fetchProducts={() => fetchProducts(state.page + 1, state.limit)}
              />
              <ModalProductPage
                isShowModal={state.isShowModalUpdate}
                type={modalTypes.UPDATE}
                productInfo={state.rowData}
                categories={listCategories}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
                fetchProducts={() => fetchProducts(state.page + 1, state.limit)}
              />
              <ModalProductPage
                isShowModal={state.isShowModalDelete}
                type={modalTypes.DELETE}
                productInfo={state.rowData}
                categories={listCategories}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDelete: false })
                }
                fetchProducts={() => fetchProducts(state.page + 1, state.limit)}
              />
              <ProductDetail
                isShowModal={state.isShowModalDetail}
                type={modalTypes.VIEW}
                productInfo={state.rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDetail: false })
                }
                fetchProducts={() => fetchProducts(state.page + 1, state.limit)}
              />
              <ProductImages
                isShowModal={state.isShowModalImage}
                type={modalTypes.VIEW}
                productInfo={state.rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalImage: false })
                }
                fetchProducts={() => fetchProducts(state.page + 1, state.limit)}
              />
              <ProductDiscount
                isShowModal={state.isShowModalDiscount}
                type={modalTypes.VIEW}
                productInfo={state.rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDiscount: false })
                }
              />
              <ProductReviewMgtPage
                type={modalTypes.VIEW}
                isShowModal={state.isShowModalReview}
                productInfo={state.rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalReview: false })
                }
                fetchProducts={() => fetchProducts(state.page + 1, state.limit)}
              />
            </Container>
          </Container>
          <FooterPage />
        </div>
      ) : (
        <ForbidenPage />
      )}
    </div>
  );
};

export default connect((state: IstateRedux) => ({
  listProducts: state.ProductReducer.listProducts,
  totalProduct: state.ProductReducer.totalProduct,
  listCategories: state.CategoryReducer.listCategories,
}))(ProductMgtPage);
