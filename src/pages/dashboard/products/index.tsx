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
import { productActions } from "../../../store/actions";
import PaginationTableCommon from "../../commons/pagination-table";

const ProductMgtPage = (props: IpropProductPage) => {
  const { dispatch, listProducts = [], totalProduct = 0 } = props;
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    isShowModalAdd: false,
    rowData: {},
    isShowModalUpdate: false,
    isShowModalDelete: false,
  });
  const isRoleSa = validateRoleSa();
  const { page, limit } = state;

  const fetchProducts = (page: number, limit: number) => {
    dispatch({
      type: productActions.GET_LIST_PRODUCT,
      payload: {
        page,
        limit,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: productActions.GET_LIST_PRODUCT,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchProducts(page + 1, limit);
  }, []);

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
              <TableContainer>
                <Table stickyHeader aria-label="product table">
                  <HeaderTableCommon headerList={headerProductTable} />
                  <TableBody>
                    {listProducts?.map((product: Iproduct, index: number) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={product?.id}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{product?.name}</TableCell>
                          <TableCell>{product?.description}</TableCell>
                          <TableCell>{product?.price}</TableCell>
                          <TableCell>{product?.quantity}</TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm">
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm">
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm">
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm">
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm">
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline-primary" size="sm">
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
              <PaginationTableCommon
                total={totalProduct}
                limit={limit}
                page={page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchProducts(page, limit)
                }
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

const mapStateToProps = (state: IstateRedux) => {
  return {
    listProducts: state.ProductReducer.listProducts,
    totalProduct: state.ProductReducer.totalProduct,
  };
};

export default connect(mapStateToProps)(ProductMgtPage);
