import { Button, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Hidder } from "../../../../components/shared/hidder";
import {
  getStudentsAsync,
  TEAM_ACTIONS,
} from "../../../../redux-store/actions";
import {
  isLoadingByKeysSelector,
  studentsSelector,
} from "../../../../redux-store/selectors";
import { useAppDispatch } from "../../../../redux-store/store-manager";
import { StudentContainer } from "../student-container";
import styles from "./FindStudentsPage.module.scss";

interface Props {}

export const FindStudentsPage: FC<Props> = () => {
  const students = useSelector(studentsSelector);
  const isLoading = useSelector(
    isLoadingByKeysSelector([TEAM_ACTIONS.GET_STUDENTS])
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStudentsAsync());
  }, [dispatch]);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Студенты</div>
        <div className={styles.searchContainer}>
          <TextField fullWidth />
          <Button variant="contained">Поиск</Button>
        </div>
      </div>
      <div className={styles.studentList}>
        <Hidder isLoading={isLoading}>
          {students &&
            students.items.map(({ name }) => (
              <StudentContainer
                name={name}
                role="Frontend-Разработчик MOCK"
                group="РИ-300014 MOCK"
                primaryButtonText="Добавить в команду"
                onClickPrimaryButton={() => {}}
              />
            ))}
        </Hidder>
      </div>
    </div>
  );
};
