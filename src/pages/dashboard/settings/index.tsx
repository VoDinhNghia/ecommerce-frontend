import React, { SyntheticEvent, useState } from "react";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import { Container } from "rsuite";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TitleHeaderPage from "../../commons/title-header";
import SlideImageAdvSetting from "./slide-images";

const SettingMgtPage = () => {
  const slideImage = "Show slide image";
  const [tabIndex, setTabIndex] = useState(slideImage);
  const onChangeTab = (e: SyntheticEvent, newTab: string) => {
    setTabIndex(newTab);
  };

  return (
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
                <SlideImageAdvSetting />
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Container>
      <FooterPage />
    </div>
  );
};

export default SettingMgtPage;
