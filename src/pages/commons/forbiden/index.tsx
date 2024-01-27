import React from "react";
import MenuHome from "../../menu-home";
import { getCart } from "../../../services/cart.service";
import Footer from "../footer";

const ForbidenPage = () => {
  return (
    <div>
      <MenuHome numberCart={getCart()?.length || 0} />
      <div className="ForbidenPage mt-2">
        <p>
          <img src="/images/forbiden.jpg" width="100%" />
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ForbidenPage;
