import React, { useEffect, useState } from "react";
import "./index.css";
import ForbidenPage from "../../commons/forbiden";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import { Container } from "rsuite";
import { connect } from "react-redux";
import {
  IparamsFetchList,
  IstateRedux,
} from "../../../interfaces/common.interface";
import {
  IpropUserMgt,
  IrowUserTable,
} from "../../../interfaces/user.interface";
import { userActions } from "../../../store/actions";
import {
  handleDataUserTable,
  headersUserTable,
} from "../../../utils/user.util";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import AddAndSearchTable from "../../commons/add-search-table";
import HeaderTableCommon from "../../commons/header-table";
import PaginationTableCommon from "../../commons/pagination-table";
import ActionTableCommon from "../../commons/actions-table";
import TitleHeaderPage from "../../commons/title-header";
import { validateRoleSa } from "../../../utils/permission.util";
import ModalUserPage from "./modals";
import { modalTypes } from "../../../constants/constant";

const UserManagementPage = (props: IpropUserMgt) => {
  const { dispatch, listUsers = [], totalUser = 0 } = props;
  const [state, setState] = useState({
    limit: 5,
    page: 0,
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    rowData: {},
  });
  const isRoleSa = validateRoleSa();
  const columns = headersUserTable();
  const rows = handleDataUserTable(listUsers);

  const fetchUsers = (page: number, limit: number) => {
    fetchCommon({ page, limit });
  };

  const onSearch = (searchKey: string) => {
    fetchCommon({ searchKey });
  };

  const fetchCommon = (payload: IparamsFetchList) => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload,
    });
  };

  useEffect(() => {
    fetchUsers(state.page + 1, state.limit);
  }, []);

  const TableUser = (
    <TableContainer>
      <Table stickyHeader aria-label="user table">
        <HeaderTableCommon headerList={columns} />
        <TableBody>
          {rows?.map((row: IrowUserTable) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row?.code}>
                <TableCell>{row.index}</TableCell>
                <TableCell className="text-primary">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <ActionTableCommon
                    setState={setState}
                    state={state}
                    rowData={row}
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
              <TitleHeaderPage title="User management page" />
              <AddAndSearchTable
                title="Add new user"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              {TableUser}
              <PaginationTableCommon
                total={totalUser}
                limit={state.limit}
                page={state.page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchUsers(page, limit)
                }
              />
              <ModalUserPage
                type={modalTypes.ADD}
                isShowModal={state.isShowModalAdd}
                userInfo={{}}
                onCloseModal={() =>
                  setState({ ...state, isShowModalAdd: false })
                }
                fetchUsers={() => fetchUsers(state.page + 1, state.limit)}
              />
              <ModalUserPage
                type={modalTypes.UPDATE}
                isShowModal={state.isShowModalUpdate}
                userInfo={state.rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalUpdate: false })
                }
                fetchUsers={() => fetchUsers(state.page + 1, state.limit)}
              />
              <ModalUserPage
                type={modalTypes.DELETE}
                isShowModal={state.isShowModalDelete}
                userInfo={state.rowData}
                onCloseModal={() =>
                  setState({ ...state, isShowModalDelete: false })
                }
                fetchUsers={() => fetchUsers(state.page + 1, state.limit)}
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
  listUsers: state.UserReducer.listUsers,
  totalUser: state.UserReducer.totalUser,
}))(UserManagementPage);
