import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useAppState } from "../helpers/use_app_state";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(4),
});

export const Login = () => {
  const { setError, setUser } = useAppState();
  let history = useHistory();

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    axios
      .post("/auth/login", {
        email,
        password,
      })
      .then(() => {
        setUser({
          email,
        });
        history.push("/vehicles");
      });
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        password: "",
        email: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <form className="p-fluid" onSubmit={handleSubmit}>
          {/* <div className="p-field">
            <label htmlFor="email">Адрес эдектронного ящика</label>
            <span className=" p-input-icon-right">
              <InputText
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={classNames({ "p-invalid": !!errors.email })}
              />
              <i className="pi pi-envelope" />
            </span>
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>
          <div className="p-field">
            <label htmlFor="password">Пароль</label>
            <InputText
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={classNames({ "p-invalid": !!errors.password })}
            />
            {errors.password && (
              <small className="p-error">{errors.password}</small>
            )}
          </div>
          <Button type="submit" label="Войти" className="p-mt-2" /> */}
        </form>
      )}
    </Formik>
  );
};
