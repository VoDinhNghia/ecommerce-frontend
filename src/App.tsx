/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationContainer } from "react-notifications";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { routes } from "./constants/constant";
import store from "./store";
import { Provider } from "react-redux";
import DashboardPage from "./pages/dashboard";
import ProtectedAdminRoutes from "./utils/protected-route-admin.util";
import NotfoundPage from "./pages/notfound";
import UserManagementPage from "./pages/dashboard/users";
import SettingMgtPage from "./pages/dashboard/settings";
import ProtectedRoutes from "./utils/protected-route.util";
import HomePage from "./pages/home";
import in18 from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";
import CategoryMgtPage from "./pages/dashboard/categories";
import ProductMgtPage from "./pages/dashboard/products";
import CartDetailPage from "./pages/carts";
import SignUpPage from "./pages/signup";

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={in18}>
        <BrowserRouter>
          <Routes>
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.register} element={<SignUpPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.cartDetail} element={<CartDetailPage />} />
            <Route
              path={routes.dashboard}
              element={
                <ProtectedRoutes>
                  <DashboardPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path={routes.userMgt}
              element={
                <ProtectedAdminRoutes>
                  <UserManagementPage />
                </ProtectedAdminRoutes>
              }
            />
            <Route
              path={routes.settings}
              element={
                <ProtectedAdminRoutes>
                  <SettingMgtPage />
                </ProtectedAdminRoutes>
              }
            />
            <Route
              path={routes.category}
              element={
                <ProtectedAdminRoutes>
                  <CategoryMgtPage />
                </ProtectedAdminRoutes>
              }
            />
            <Route
              path={routes.product}
              element={
                <ProtectedAdminRoutes>
                  <ProductMgtPage />
                </ProtectedAdminRoutes>
              }
            />
            <Route path="*" element={<NotfoundPage />} />
          </Routes>
          <NotificationContainer />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
