import { Chip } from "@mui/material";
import type { FC } from "react";
import { ContentContainer } from "../content-container/ContentContainer";
import cx from "classnames";
import styles from "./PreviewProjectCard.module.scss";
import { PreviewCard } from "../../../pages/main-page/MainPage";

interface Props {
  card: PreviewCard;
}

export const PreviewProjectCard: FC<Props> = ({
  card: { closedTeam, company, menthor, students, tags, title, totalTeam },
}) => {
  return (
    <ContentContainer widthPx={336} heightPx={423}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.tags}>
            {tags.map((title) => (
              <Chip key={title} label={title} />
            ))}
          </div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <InfoContainer title="Организация:" value={company} />
            <InfoContainer title="Куратор:" value={menthor} />
          </div>
          <div className={styles.numbers}>
            <InfoContainer
              title="Команд"
              value={`${closedTeam}/${totalTeam}`}
              centered
              isStrongValue
            />
            <InfoContainer
              title="Участников"
              value={students.toString()}
              centered
              isStrongValue
            />
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

interface InfoContainerProps {
  title: string;
  value: string;
  isStrongValue?: boolean;
  centered?: boolean;
}

const InfoContainer: FC<InfoContainerProps> = ({
  title,
  value,
  isStrongValue,
  centered,
}) => {
  return (
    <div className={cx(styles.infoContainer, { [styles.centered]: centered })}>
      <div className={styles.title}>{title}</div>
      <div className={cx(styles.value, { [styles.strong]: isStrongValue })}>
        {value}
      </div>
    </div>
  );
};
