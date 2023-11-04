import React from "react";
import FooterPage from "../commons/footer";
import MenuHomePage from "../menu-home";

const HomePage = () => {
  return (
    <div>
      <MenuHomePage numberCart={0} />
      <FooterPage />
    </div>
  );
};

export default HomePage;
