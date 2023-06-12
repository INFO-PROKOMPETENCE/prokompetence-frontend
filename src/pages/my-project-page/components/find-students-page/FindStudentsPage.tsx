import { Button, TextField } from "@mui/material";
import type { FC } from "react";
import { StudentContainer } from "../student-container";
import styles from "./FindStudentsPage.module.scss";

interface Props {}

export const FindStudentsPage: FC<Props> = () => {
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
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
        <StudentContainer
          name="Предеин Никита"
          role="Frontend-Разработчик"
          group="РИ-300014"
          primaryButtonText="Добавить в команду"
          onClickPrimaryButton={() => {}}
        />
      </div>
    </div>
  );
};
