import React, { useEffect, useState } from "react";
import { Container } from "rsuite";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import TitleHeaderPage from "../../commons/title-header";
import AddAndSearchTable from "../../commons/add-search-table";
import { connect } from "react-redux";
import {
  IallStateReadMore,
  IparamsFetchList,
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
  const [state, setState] = useState({
    page: 0,
    limit: 5,
    isShowModalAdd: false,
    rowData: {},
    readMore: {},
    isShowModalUpdate: false,
    isShowModalDelete: false,
  });

  const categoryReadMore: IallStateReadMore = state.rowData;
  const allStateReadMore: IallStateReadMore = state.readMore;

  const handleReadMore = (categoryInfo: IallStateReadMore) => {
    const isReadMore = allStateReadMore[`${categoryInfo?.id}`];
    setState({
      ...state,
      readMore: { [`${categoryInfo?.id}`]: !isReadMore },
      rowData: categoryInfo,
    });
  };

  const fetchCategories = (page: number, limit: number) => {
    fetchCategoryCommon({ limit, page });
  };

  const onSearch = (searchKey: string) => {
    fetchCategoryCommon({ searchKey });
  };

  const fetchCategoryCommon = (payload: IparamsFetchList) => {
    dispatch({
      type: categoryActions.GET_LIST_CATEGORY,
      payload,
    });
  };

  useEffect(() => {
    fetchCategories(state.page + 1, state.limit);
  }, []);

  const TableCategories = (
    <TableContainer>
      <Table stickyHeader aria-label="category table">
        <HeaderTableCommon headerList={headerTableCategory} />
        <TableBody>
          {listCategories?.map((category: Icategory, index: number) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={category?.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-primary">{category?.name}</TableCell>
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
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
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
          {TableCategories}
          <PaginationTableCommon
            total={totalCategory}
            limit={state.limit}
            page={state.page}
            setState={setState}
            state={state}
            fetchList={(page: number, limit: number) =>
              fetchCategories(page, limit)
            }
          />
          <ModalCategory
            type={modalTypes.ADD}
            isShowModal={state.isShowModalAdd}
            categoryInfo={{}}
            onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
            fetchCategories={() => fetchCategories(state.page + 1, state.limit)}
          />
          <ModalCategory
            type={modalTypes.UPDATE}
            isShowModal={state.isShowModalUpdate}
            categoryInfo={state.rowData}
            onCloseModal={() =>
              setState({ ...state, isShowModalUpdate: false })
            }
            fetchCategories={() => fetchCategories(state.page + 1, state.limit)}
          />
          <ModalCategory
            type={modalTypes.DELETE}
            isShowModal={state.isShowModalDelete}
            categoryInfo={state.rowData}
            onCloseModal={() =>
              setState({ ...state, isShowModalDelete: false })
            }
            fetchCategories={() => fetchCategories(state.page + 1, state.limit)}
          />
        </Container>
      </Container>
      <FooterPage />
    </div>
  );
};

export default connect((state: IstateRedux) => ({
  listCategories: state.CategoryReducer.listCategories,
  totalCategory: state.CategoryReducer.totalCategory,
}))(CategoryMgtPage);
