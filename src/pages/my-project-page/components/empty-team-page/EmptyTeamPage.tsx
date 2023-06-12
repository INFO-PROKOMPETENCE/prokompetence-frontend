import { Button } from "@mui/material";
import { FC } from "react";
import { ContentContainer } from "../../../../components/shared/content-container/ContentContainer";
import styles from "./EmptyTeamPage.module.scss";

export const EmptyTeamPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <ContentContainer>
          <div className={styles.content}>
            <div className={styles.title}>Ваша команда</div>
            <div className={styles.caption}>
              Создайте свою команду, чтобы начать работу над проектами
            </div>
            <Button variant="contained" size="large">
              Создать команду
            </Button>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
};
