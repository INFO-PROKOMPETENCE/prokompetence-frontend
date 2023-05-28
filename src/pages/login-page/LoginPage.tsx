import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container/ContentContainer";
import { LogoIcon } from "../../components/shared/icons";
import { loginUserAsync, registerUserAsync } from "../../redux-store/actions";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./LoginPage.module.scss";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, handleChange, submitForm, errors } = useFormik<{
    login: string;
    password: string;
  }>({
    initialValues: {
      login: "",
      password: "",
    },
    validate: ({ login, password }) => {
      let errors: { [key: string]: string } = {};

      if (login.length === 0) {
        errors["login"] = "Необходимо ввести логин";
      }
      if (password.length === 0) {
        errors["password"] = "Необходимо ввести пароль";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const res = (
        await dispatch(
          registerUserAsync({
            ...values,
            name: "test",
          })
        )
      ).payload;
      if (res) {
        const res = (await dispatch(loginUserAsync(values))).payload;
        if (res) {
          navigate("/");
        }
      } else {
        const res = (await dispatch(loginUserAsync(values))).payload;
        if (res) {
          navigate("/");
        }
      }
    },
  });

  const hasError = useMemo(() => {
    return (
      Object.keys(errors).length !== 0 ||
      !values.login.length ||
      !values.password.length
    );
  }, [errors, values.login, values.password]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <ContentContainer>
          <div className={styles.content}>
            <LogoIcon classname={styles.logo} />
            <div className={styles.caption}>
              Введите почту, чтобы войти или зарегистрироваться
            </div>
            <TextField
              name="login"
              size="small"
              fullWidth
              placeholder="Логин"
              onChange={handleChange}
              error={!!errors["login"]}
            />
            <TextField
              size="small"
              name="password"
              fullWidth
              placeholder="Пароль"
              type={"password"}
              onChange={handleChange}
              error={!!errors["password"]}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={submitForm}
              disabled={hasError}
            >
              Продолжить
            </Button>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};
