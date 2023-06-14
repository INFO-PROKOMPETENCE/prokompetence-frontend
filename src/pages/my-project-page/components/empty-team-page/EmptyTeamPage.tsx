import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FC, useCallback, useMemo } from "react";
import { ContentContainer } from "../../../../components/shared/content-container/ContentContainer";
import { createTeamAsync } from "../../../../redux-store/actions";
import { useAppDispatch } from "../../../../redux-store/store-manager";
import styles from "./EmptyTeamPage.module.scss";

export const EmptyTeamPage: FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
    },
    validate: ({ name }) => {
      if (name.length === 0) {
        return { name: "error" };
      }
    },
    onSubmit: () => {},
  });

  const hasError = useMemo(() => {
    return values.name.length === 0;
  }, [values]);

  const createTeam = useCallback(() => {
    if (values.name.length) {
      dispatch(createTeamAsync({ name: values.name }));
    }
  }, [dispatch, values.name]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <ContentContainer>
          <div className={styles.content}>
            <div className={styles.title}>Ваша команда</div>
            <div className={styles.caption}>
              Создайте свою команду, чтобы начать работу над проектами
            </div>
            <TextField
              name="name"
              fullWidth
              placeholder="Название команды"
              onChange={handleChange}
              error={!!errors.name}
            />
            <Button
              variant="contained"
              size="large"
              disabled={hasError}
              onClick={createTeam}
            >
              Создать команду
            </Button>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};
