import React from "react";
import "./index.css";
import { IpropMenuHomePage } from "../../interfaces/menu-home-page";
import HeaderMenuPage from "./header-menu";
import { getCurrentUser } from "../../services/auth.service";
import { FaBlogger } from "react-icons/fa";
import { MdOutlineContactPage } from "react-icons/md";
import { withTranslation } from "react-i18next";
import { routes } from "../../constants/constant";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BsCartFill, BsInfoCircle } from "react-icons/bs";
import { BiSolidUserAccount, BiCategory } from "react-icons/bi";

const MenuHomePage = (props: IpropMenuHomePage) => {
  const { numberCart = 0, t } = props;
  const currentUser = getCurrentUser();

  return (
    <div>
      <HeaderMenuPage />
      <div className="MenuPage bg-primary">
        <Navbar collapseOnSelect expand="sm" className="p-3 NavbarHeader">
          <Container>
            <Navbar.Brand>
              <a href={routes.home}>
                <img src="/D-logo.png" alt="" className="LogoMenu" />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="reponsive-navbar-nav"
              className="IconMenuResponsive"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="gap-2 TextMenuHeader">
                <Nav.Link className="RightMenu" href={routes.home}>
                  <BiCategory /> {t("Shop")}
                </Nav.Link>
                <Nav.Link className="RightMenu" href={routes.aboutUs}>
                  <BsInfoCircle /> {t("AboutUs")}
                </Nav.Link>
                <Nav.Link className="RightMenu" href={routes.blogs}>
                  <FaBlogger /> {t("Tutorials")}
                </Nav.Link>
                <Nav.Link className="RightMenu" href={routes.contactQuestion}>
                  <BiSolidUserAccount /> {t("Contact&Question")}
                </Nav.Link>
                {currentUser?.role ? (
                  <Nav.Link className="RightMenu" href={routes.dashboard}>
                    <MdOutlineContactPage /> {t("Dashboard")}
                  </Nav.Link>
                ) : null}
                <Nav.Link className="RightMenu" href={routes.cartDetail}>
                  <BsCartFill />{" "}
                  <span className="NumberCartMenu">{numberCart}</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default withTranslation()(MenuHomePage);
