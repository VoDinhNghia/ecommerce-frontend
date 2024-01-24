import React from "react";
import MenuHome from "../menu-home";
import { getCart } from "../../services/cart.service";
import Footer from "../commons/footer";

const NotfoundPage = () => {
  return (
    <>
      <MenuHome numberCart={getCart()?.length || 0} />
      <div className="NotFoundPage fs-6 container">
        <img src="/images/notfound.jpg" width="100%" height="400px" />
      </div>
      <Footer />
    </>
  );
};

export default NotfoundPage;
