import { Chip } from "@mui/material";
import type { FC } from "react";
import { ContentContainer } from "../content-container/ContentContainer";
import cx from "classnames";
import styles from "./PreviewProjectCard.module.scss";
import { Project } from "../../../typing/project";

interface Props {
  card: Project;
}

export const PreviewProjectCard: FC<Props> = ({
  card: {
    complexity,
    curatorName,
    id,
    keyTechnologyId,
    lifeScenarioId,
    maxStudentsCountInTeam,
    maxTeamsCount,
    name,
    organizationName,
    recordedTeamsCount,
    shortDescription,
  },
}) => {
  return (
    <ContentContainer widthPx={336} heightPx={423}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.tags}>
            <Chip label={keyTechnologyId} />
            <Chip label={lifeScenarioId} />
          </div>
          <div className={styles.title}>{name}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <InfoContainer title="Организация:" value={organizationName} />
            <InfoContainer title="Куратор:" value={curatorName} />
          </div>
          <div className={styles.numbers}>
            <InfoContainer
              title="Команд"
              value={`${recordedTeamsCount}/${maxTeamsCount}`}
              centered
              isStrongValue
            />
            <InfoContainer
              title="Участников"
              value={maxStudentsCountInTeam.toString()}
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
