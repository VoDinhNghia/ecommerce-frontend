import React from "react";
import AddAndSearchTable from "../../../commons/add-search-table";
import { connect } from "react-redux";

const SlideImageAdvSetting = () => {
  return (
    <div>
      <AddAndSearchTable title="Add Image" />
    </div>
  );
};

export default connect()(SlideImageAdvSetting);
