import React, { useEffect, useState } from "react";
import AddAndSearchTable from "../../../commons/add-search-table";
import { connect } from "react-redux";
import { IpropSlideImgAdvPage } from "../../../../interfaces/settings.interface";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { settingActions } from "../../../../store/actions";
import {
  TableBody,
  TableContainer,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import HeaderTableCommon from "../../../commons/header-table";
import { headerSlideImageTable } from "../../../../utils/settings.util";
import ActionTableCommon from "../../../commons/actions-table";
import { API_URL, modalTypes } from "../../../../constants/constant";
import ModalSlideImages from "./modals";

const SlideImageAdvSetting = (props: IpropSlideImgAdvPage) => {
  const { dispatch, listSlideImgAdv = [] } = props;
  const [state, setState] = useState({
    isShowModalAdd: false,
    rowData: {},
    isShowModalUpdate: false,
    isShowModalDelete: false,
  });

  const { isShowModalAdd, isShowModalDelete, isShowModalUpdate, rowData } =
    state;

  const fetchSlideImg = () => {
    dispatch({
      type: settingActions.GET_SLIDE_IMAGE,
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: settingActions.GET_SLIDE_IMAGE,
      payload: {
        searchKey,
      },
    });
  };

  useEffect(() => {
    fetchSlideImg();
  }, []);

  return (
    <div>
      <AddAndSearchTable
        title="Add Image"
        disableSearch={false}
        onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
        onSearch={(e: string) => onSearch(e)}
      />
      <TableContainer>
        <Table stickyHeader arial-label="slide image table">
          <HeaderTableCommon headerList={headerSlideImageTable} />
          <TableBody>
            {listSlideImgAdv?.map((slide, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={slide?.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={`${API_URL}/${slide?.url}`}
                      width={180}
                      height={120}
                    />
                  </TableCell>
                  <TableCell>{slide?.isActive?.toString()}</TableCell>
                  <TableCell>{slide?.description}</TableCell>
                  <TableCell>
                    <ActionTableCommon
                      state={state}
                      setState={setState}
                      rowData={slide}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalSlideImages
        isShowModal={isShowModalAdd}
        type={modalTypes.ADD}
        slideImageInfo={{}}
        fetchSlideImg={() => fetchSlideImg()}
        onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
      />
      <ModalSlideImages
        isShowModal={isShowModalUpdate}
        type={modalTypes.UPDATE}
        slideImageInfo={rowData}
        fetchSlideImg={() => fetchSlideImg()}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
      />
      <ModalSlideImages
        isShowModal={isShowModalDelete}
        type={modalTypes.DELETE}
        slideImageInfo={rowData}
        fetchSlideImg={() => fetchSlideImg()}
        onCloseModal={() => setState({ ...state, isShowModalDelete: false })}
      />
    </div>
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    listSlideImgAdv: state.SlideImgAdvReducer.listSlideImgAdv,
  };
};

export default connect(mapStateToProp)(SlideImageAdvSetting);
