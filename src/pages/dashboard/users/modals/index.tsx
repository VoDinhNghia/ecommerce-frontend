import React from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { IpropModalUser } from "../../../../interfaces/user.interface";
import { connect } from "react-redux";
import { modalTypes } from "../../../../constants/constant";
import { Button } from "@mui/material";

const ModalUserPage = (props: IpropModalUser) => {
  const { type, isShowModal, onCloseModal, userInfo } = props;

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form>
          <Button type="submit" variant="contained" className="w-100 mt-3">
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <span>
          Are you want to delete this <b>{userInfo?.name}</b>?
        </span>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      content={content}
      onCloseModal={() => onCloseModal()}
      nameTitle="user"
    />
  );
};

export default connect()(ModalUserPage);
