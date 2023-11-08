import React, { useState } from "react";
import { Nav, Sidebar, Sidenav } from "rsuite";
import NavToggleMenuPage from "./nav-toggle";
import LogOutIcon from "@rsuite/icons/legacy/SignOut";
import { getCurrentUser, logOut } from "../../../services/auth.service";
import { moduleNames, routes } from "../../../constants/constant";
import "./index.css";
import UserMgtIcon from "@rsuite/icons/legacy/Group";
import SettingIcon from "@rsuite/icons/legacy/GearCircle";
import { validateRoleSa } from "../../../utils/permission.util";

const MenuPage = () => {
  const isRoleSa = validateRoleSa();
  const [expand, setExpand] = useState(true);
  const userInfo = getCurrentUser();
  const userName = `${userInfo?.lastName} ${userInfo?.middleName} ${userInfo?.firstName}`;

  const logOutHandle = () => {
    logOut();
    setTimeout(() => {
      window.location.href = routes.login;
    }, 70);
  };

  return (
    <Sidebar
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
      width={expand ? 300 : 70}
      collapsible
    >
      <Sidenav.Header>
        <div
          style={{
            padding: 18,
            fontSize: 16,
            height: 56,
            background: "blue",
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <a href={routes.dashboard} className="text-white">
            <img src="/images/userIcon.jpg" alt="" className="UserAvatar" />
            <span>{expand ? userName : null}</span>
          </a>
        </div>
      </Sidenav.Header>
      <Sidenav expanded={expand} appearance="subtle">
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              eventKey={moduleNames.HOME_PAGE}
              icon={<SettingIcon />}
              className="ItemMenuPage"
              href={routes.home}
            >
              {moduleNames.HOME_PAGE}
            </Nav.Item>
            {isRoleSa ? (
              <Nav.Item
                eventKey={moduleNames.USER_MANAGEMENT}
                icon={<UserMgtIcon />}
                className="ItemMenuPage"
                href={routes.userMgt}
              >
                {moduleNames.USER_MANAGEMENT}
              </Nav.Item>
            ) : null}
            {isRoleSa ? (
              <Nav.Item
                eventKey={moduleNames.CATEGORY}
                icon={<UserMgtIcon />}
                className="ItemMenuPage"
                href={routes.category}
              >
                {moduleNames.CATEGORY}
              </Nav.Item>
            ) : null}
            {isRoleSa ? (
              <Nav.Item
                eventKey={moduleNames.PRODUCT}
                icon={<UserMgtIcon />}
                className="ItemMenuPage"
                href={routes.product}
              >
                {moduleNames.PRODUCT}
              </Nav.Item>
            ) : null}
            {isRoleSa ? (
              <Nav.Item
                eventKey={moduleNames.SETTINGS}
                icon={<SettingIcon />}
                className="ItemMenuPage"
                href={routes.settings}
              >
                {moduleNames.SETTINGS}
              </Nav.Item>
            ) : null}
            <Nav.Item
              eventKey="LOGOUT"
              icon={<LogOutIcon />}
              className="ItemMenuPage"
              onClick={() => logOutHandle()}
            >
              LogOut
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggleMenuPage expand={expand} setExpand={() => setExpand(!expand)} />
    </Sidebar>
  );
};

export default MenuPage;
