import React, { SyntheticEvent, useState } from "react";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import ForbidenPage from "../../commons/forbiden";
import { Container } from "rsuite";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TitleHeaderPage from "../../commons/title-header";
import { validateRoleSa } from "../../../utils/permission.util";

const SettingMgtPage = () => {
  const slideImage = "Show slide image";
  const isRoleSa = validateRoleSa();
  const [tabIndex, setTabIndex] = useState(slideImage);
  const onChangeTab = (e: SyntheticEvent, newTab: string) => {
    setTabIndex(newTab);
  };

  return (
    <div>
      {isRoleSa ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TitleHeaderPage title="Settings management page" />
              <Box>
                <TabContext value={tabIndex}>
                  <Box>
                    <TabList
                      onChange={onChangeTab}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="setting"
                    >
                      <Tab value={slideImage} label={slideImage} />
                    </TabList>
                  </Box>
                  <TabPanel value={slideImage}>
                    <p>Slide image setting page</p>
                  </TabPanel>
                </TabContext>
              </Box>
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

export default SettingMgtPage;
