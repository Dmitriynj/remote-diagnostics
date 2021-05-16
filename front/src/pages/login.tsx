import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppState } from "../helpers/use_app_state";
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { instance } from "../helpers/axios_defaults";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 35,
  },
}));

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(4),
});

export const Login = () => {
  const classes = useStyles();
  const { setUser, user } = useAppState();

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    instance
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("login success", response.data);
        const { accessToken, avatar } = response.data;
        setUser({
          email,
          accessToken,
          isAuth: true,
          avatar,
        });
      });
  };

  if (user.isAuth) {
    return <Redirect to="/vehicles" />;
  }

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
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            label="Электронная почта"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email && touched.email}
            helperText={touched.email && errors.email}
          />
          <TextField
            variant="outlined"
            label="Пароль"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password && touched.password}
            helperText={touched.password && errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disableElevation
          >
             Войти
          </Button>
        </form>
      )}
    </Formik>
  );
};
