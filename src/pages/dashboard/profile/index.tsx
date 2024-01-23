import React, { useState } from "react";
import "./index.css";
import { Container } from "rsuite";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
import { BsPencilSquare } from "react-icons/bs";
import DashboardModalPage from "../modals";
import { modalTypes } from "../../../constants/constant";
import TitleHeaderPage from "../../commons/title-header";
import { getCurrentUser } from "../../../services/auth.service";

const ProfileDashboardPage = () => {
  const [state, setState] = useState({
    isShowModalUpdate: false,
    isShowModalUpdatePassword: false,
    isShowModalUpdateProfile: false,
  });
  const userInfo = getCurrentUser();

  return (
    <Container className="p-3 fs-6">
      <TitleHeaderPage title="User infomation management" />
      <Card variant="outlined" className="border border-primary">
        <CardHeader title="General Info" />
        <CardContent>
          <p>Email: {userInfo?.email}</p>
          <p>Role: {userInfo?.role}</p>
        </CardContent>
        <CardActions className="ProfileActions">
          <Button
            variant="outlined"
            color="success"
            startIcon={<BsPencilSquare />}
            onClick={() => setState({ ...state, isShowModalUpdate: true })}
            size="small"
          >
            Update Info
          </Button>
          <Button
            variant="outlined"
            color="success"
            startIcon={<BsPencilSquare />}
            onClick={() =>
              setState({ ...state, isShowModalUpdatePassword: true })
            }
            size="small"
          >
            Update password
          </Button>
        </CardActions>
      </Card>
      <Card variant="outlined" className="border border-primary mt-2">
        <CardHeader title="Profile" className="bg-success text-white" />
        <CardContent>
          <p>LastName: {userInfo?.lastName}</p>
          <p>MiddleName: {userInfo?.middleName}</p>
          <p>FirstName: {userInfo?.firstName}</p>
          <p>Code: {userInfo?.code}</p>
          <p>Gender: {userInfo?.gender}</p>
          <p>Mobile: {userInfo?.mobile}</p>
        </CardContent>
        <CardActions className="ProfileActions">
          <Button
            variant="outlined"
            color="success"
            startIcon={<BsPencilSquare />}
            onClick={() =>
              setState({ ...state, isShowModalUpdateProfile: true })
            }
            size="small"
          >
            Update profile
          </Button>
        </CardActions>
      </Card>
      <DashboardModalPage
        type={modalTypes.UPDATE}
        isShowModal={state.isShowModalUpdate}
        onCloseModal={() => setState({ ...state, isShowModalUpdate: false })}
        userInfo={userInfo}
      />
      <DashboardModalPage
        type={modalTypes.UPDATE_PASSWORD}
        isShowModal={state.isShowModalUpdatePassword}
        onCloseModal={() =>
          setState({ ...state, isShowModalUpdatePassword: false })
        }
        userInfo={userInfo}
      />
      <DashboardModalPage
        type={modalTypes.UPDATE_PROFILE}
        isShowModal={state.isShowModalUpdateProfile}
        onCloseModal={() =>
          setState({ ...state, isShowModalUpdateProfile: false })
        }
        userInfo={userInfo}
      />
    </Container>
  );
};

export default ProfileDashboardPage;
