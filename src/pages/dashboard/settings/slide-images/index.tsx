import React, { useEffect } from "react";
import AddAndSearchTable from "../../../commons/add-search-table";
import { connect } from "react-redux";
import { IpropSlideImgAdvPage } from "../../../../interfaces/settings.interface";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { settingActions } from "../../../../store/actions";

const SlideImageAdvSetting = (props: IpropSlideImgAdvPage) => {
  const { dispatch } = props;
  const fetchSlideImg = () => {
    dispatch({
      type: settingActions.GET_SLIDE_IMAGE,
    });
  };

  useEffect(() => {
    fetchSlideImg();
  }, []);

  return (
    <div>
      <AddAndSearchTable title="Add Image" />
    </div>
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    listSlideImgAdv: state.SlideImgAdvReducer.listSlideImgAdv,
  };
};

export default connect(mapStateToProp)(SlideImageAdvSetting);
