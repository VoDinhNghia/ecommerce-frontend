import React from "react";
import { Row, Col } from "react-bootstrap";
import { routes } from "../../../constants/constant";
import "./index.css";
import { withTranslation } from "react-i18next";
import { IpropFooterPage } from "../../../interfaces/common.interface";

const FooterPage = (props: IpropFooterPage) => {
  const { t } = props;

  return (
    <div>
      <div className="FooterPage mt-2 p-3 fs-6">
        <Row>
          <Col xl={3}>
            <h5>{t("About us")}</h5>
            <div className="mt-2">
              <p>Store name</p>
              <p>Address: </p>
              <p>Mobile: </p>
              <p>Fax: </p>
              <p>Email: </p>
            </div>
          </Col>
          <Col xl={3}>
            <h5>{t("Other activities")}</h5>
            <div className="mt-2">
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Community activities
                </a>
              </p>
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Business connection
                </a>
              </p>
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Volunteer student
                </a>
              </p>
            </div>
          </Col>
          <Col xl={3}>
            <h5>{t("Expended infomation")}</h5>
            <div className="mt-2">
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Collections
                </a>
              </p>
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Soft skills
                </a>
              </p>
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Services student
                </a>
              </p>
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Explore the University
                </a>
              </p>
            </div>
          </Col>
          <Col xl={3}>
            <h5>{t("Utilities")}</h5>
            <div className="mt-2">
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Regulations
                </a>
              </p>
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Training form
                </a>
              </p>
              <p>
                <a href={routes.dashboard} className="text-muted">
                  Science
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="text-center p-3 bg-primary text-white fs-6">
        @{t("Copyright")} 2023
      </div>
    </div>
  );
};

export default withTranslation()(FooterPage);
