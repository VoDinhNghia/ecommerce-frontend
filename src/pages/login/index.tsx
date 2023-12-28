/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import "./index.css";
import { login } from "../../services/auth.service";
import { routes } from "../../constants/constant";
import { TextField } from "@mui/material";
import {
  registerSchemaLoginForm,
  IregisterInputLoginForm,
} from "../../utils/login.util";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MenuHome from "../menu-home";
import FooterPage from "../commons/footer";
import { getCart } from "../../services/cart.service";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterInputLoginForm>({
    resolver: zodResolver(registerSchemaLoginForm),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandlerLogin: SubmitHandler<IregisterInputLoginForm> = async (
    values
  ): Promise<void> => {
    const payload = {
      email: values?.email,
      password: values?.password,
    };
    const res = await login(payload);
    if (res?.statusCode === 200) {
      NotificationManager.success(res?.message, "Login", 4000);
      setTimeout(() => {
        navigate(routes.dashboard);
      }, 200);
    } else {
      NotificationManager.error(res?.message, "Login", 4000);
    }
  };

  return (
    <div>
      <MenuHome numberCart={getCart()?.length || 0} />
      <div className="LoginPage">
        <Row>
          <Col xl={6}>
            <img
              src="/images/store-login.png"
              className="ImgLoginPage"
              height="420"
            />
          </Col>
          <Col xl={6} className="p-4">
            <p className="text-center">
              <img
                src="/images/icon-login.jpg"
                alt=""
                className="IconLoginPage"
              />
            </p>
            <h3 className="text-center">{t("LoginTitle")}</h3>
            <div className="p-4">
              <form onSubmit={handleSubmit(onSubmitHandlerLogin)}>
                <p className="mt-3">{t("EmailLogin")}: </p>
                <TextField
                  fullWidth={true}
                  size="small"
                  type="email"
                  className="border border-white"
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
                <p className="mt-2">{t("PasswordLogin")}: </p>
                <TextField
                  fullWidth={true}
                  size="small"
                  type="password"
                  className="border border-white"
                  error={!!errors["password"]}
                  helperText={
                    errors["password"] ? errors["password"].message : ""
                  }
                  {...register("password")}
                />
                <Button
                  type="submit"
                  variant="light"
                  className="mt-3 mb-2 w-100 text-primary fs-5"
                >
                  {t("LoginTitle")}
                </Button>
              </form>
              <a href="/" className="text-decoration-none text-white">
                {t("Forget password")} ?
              </a>
            </div>
          </Col>
        </Row>
      </div>
      <FooterPage />
    </div>
  );
};

export default withTranslation()(LoginPage);
