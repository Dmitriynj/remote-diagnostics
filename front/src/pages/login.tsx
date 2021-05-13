import React, { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppState } from "../helpers/use_app_state";
import "./login.css";

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string(),
});

export const Login = () => {
  const { setPageName } = useAppState();

  useEffect(() => {
    setPageName("Вход в систему");
  }, []);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        console.log("something", values);
      }}
      initialValues={{
        password: "",
        email: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Адрес электронной почты</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ввведите адрес"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Никогда не сообщайте никому свой адрес электронной почты.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Пароль"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Сохранить пароль?" />
          </Form.Group>
          <Button size="lg" block variant="primary" type="submit">
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};
