import React, { useEffect, useState } from "react";
import ForbidenPage from "../../commons/forbiden";
import { validateRoleSa } from "../../../utils/permission.util";
import { Container } from "rsuite";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import TitleHeaderPage from "../../commons/title-header";
import AddAndSearchTable from "../../commons/add-search-table";
import { connect } from "react-redux";
import {
  IallStateReadMore,
  IstateRedux,
} from "../../../interfaces/common.interface";
import {
  Icategory,
  IpropCategoryMgtPage,
} from "../../../interfaces/category.interface";
import { categoryActions } from "../../../store/actions";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import HeaderTableCommon from "../../commons/header-table";
import { headerTableCategory } from "../../../utils/category.util";
import ActionTableCommon from "../../commons/actions-table";
import PaginationTableCommon from "../../commons/pagination-table";
import ReadMoreCommon from "../../commons/readmore";
import ModalCategory from "./modals";
import { modalTypes } from "../../../constants/constant";

const CategoryMgtPage = (props: IpropCategoryMgtPage) => {
  const { dispatch, listCategories = [], totalCategory = 0 } = props;
  const isRoleSa = validateRoleSa();
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    isShowModalAdd: false,
    rowData: {},
    readMore: {},
    isShowModalUpdate: false,
    isShowModalDelete: false,
  });
  const {
    page,
    limit,
    readMore,
    rowData,
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
  } = state;

  const categoryReadMore: IallStateReadMore = rowData;
  const allStateReadMore: IallStateReadMore = readMore;

  const handleReadMore = (categoryInfo: IallStateReadMore) => {
    const isReadMore = allStateReadMore[`${categoryInfo?.id}`];
    setState({
      ...state,
      readMore: { [`${categoryInfo?.id}`]: !isReadMore },
      rowData: categoryInfo,
    });
  };

  const fetchCategories = (page: number, limit: number) => {
    dispatch({
      type: categoryActions.GET_LIST_CATEGORY,
      payload: {
        limit,
        page,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: categoryActions.GET_LIST_CATEGORY,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchCategories(page + 1, limit);
  }, []);

  return (
    <div>
      {isRoleSa ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <TitleHeaderPage title="Categories Management Page" />
              <AddAndSearchTable
                title="Add Category"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              <TableContainer>
                <Table stickyHeader aria-label="category table">
                  <HeaderTableCommon headerList={headerTableCategory} />
                  <TableBody>
                    {listCategories?.map(
                      (category: Icategory, index: number) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={category?.id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="text-primary">
                              {category?.name}
                            </TableCell>
                            <TableCell>
                              <ReadMoreCommon
                                isReadMore={
                                  category.id === categoryReadMore?.id
                                    ? allStateReadMore[`${category.id}`]
                                    : false
                                }
                                setReadMore={() => handleReadMore(category)}
                                lengthSlice={40}
                              >
                                {category?.description}
                              </ReadMoreCommon>
                            </TableCell>
                            <TableCell>
                              <ActionTableCommon
                                setState={setState}
                                state={state}
                                rowData={category}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <PaginationTableCommon
                total={totalCategory}
                limit={limit}
                page={page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchCategories(page, limit)
                }
              />
              <ModalCategory
                type={modalTypes.ADD}
                isShowModal={isShowModalAdd}
                categoryInfo={{}}
                onCloseModal={() =>
                  setState({ ...state, isShowModalAdd: false })
                }
                fetchCategories={() => fetchCategories(page + 1, limit)}
              />
              <ModalCategory
                type={modalTypes.UPDATE}
                isShowModal={isShowModalUpdate}
                categoryInfo={rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
                fetchCategories={() => fetchCategories(page + 1, limit)}
              />
              <ModalCategory
                type={modalTypes.DELETE}
                isShowModal={isShowModalDelete}
                categoryInfo={rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDelete: false })
                }
                fetchCategories={() => fetchCategories(page + 1, limit)}
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
    listCategories: state.CategoryReducer.listCategories,
    totalCategory: state.CategoryReducer.totalCategory,
  };
};

export default connect(mapStateToProps)(CategoryMgtPage);
