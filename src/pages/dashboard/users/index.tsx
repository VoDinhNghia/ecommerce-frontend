import React, { useEffect, useState } from "react";
import "./index.css";
import ForbidenPage from "../../commons/forbiden";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { IpropUserMgt, IrowUserTable } from "../../../interfaces/user.interface";
import { userActions } from "../../../store/actions";
import { handleDataUserTable, headersUserTable } from "../../../utils/user.util";
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

const UserManagementPage = (props: IpropUserMgt) => {
  const { dispatch, listUsers = [], totalUser = 0 } = props;
  const [state, setState] = useState({
    limit: 5,
    page: 0,
    isShowModalAdd: false,
  });
  const isRoleSa = validateRoleSa();
  const columns = headersUserTable();
  const rows = handleDataUserTable(listUsers);
  const {
    page,
    limit,
  } = state;

  const fetchUsers = (page: number, limit: number) => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        page,
        limit,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: userActions.GET_LIST_USER,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchUsers(page + 1, limit);
  }, []);

  return (
    <div>
      {isRoleSa ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <TitleHeaderPage title="User management page"/>
              <AddAndSearchTable
                title="Add new user"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              <TableContainer>
                <Table stickyHeader aria-label="user table">
                  <HeaderTableCommon headerList={columns} />
                  <TableBody>
                    {rows?.map((row: IrowUserTable) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row?.code}
                        >
                          <TableCell>{row.index}</TableCell>
                          <TableCell className="text-primary">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.status}</TableCell>
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
              <PaginationTableCommon
                total={totalUser}
                limit={limit}
                page={page}
                setState={setState}
                state={state}
                fetchList={(page: number, limit: number) =>
                  fetchUsers(page, limit)
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
    listUsers: state.UserReducer.listUsers,
    totalUser: state.UserReducer.totalUser,
  };
};

export default connect(mapStateToProps)(UserManagementPage);
