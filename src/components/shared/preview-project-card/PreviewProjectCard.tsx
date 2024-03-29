import type { FC } from "react";
import { ContentContainer } from "../content-container/ContentContainer";
import cx from "classnames";
import { Project } from "../../../typing/project";
import { KeyTechnologies, LifeScenarios } from "../../../typing/catalog";
import { CatalogTag } from "../catalog-tag";
import styles from "./PreviewProjectCard.module.scss";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  card: Project;
  lifeScenarios: LifeScenarios | null;
  keyTechnologies: KeyTechnologies | null;
  onClick: () => void;
}

export const PreviewProjectCard: FC<Props> = ({
  card: {
    curatorName,
    keyTechnologyId,
    lifeScenarioId,
    maxStudentsCountInTeam,
    maxTeamsCount,
    name,
    organizationName,
    recordedTeamsCount,
    id,
  },
  keyTechnologies,
  lifeScenarios,
  onClick,
}) => {
  const matches = useMediaQuery("(min-width: 1280px)");

  return (
    <ContentContainer
      widthPx={matches ? 302 : 325}
      heightPx={423}
      // onClick={onClick}
    >
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.tags}>
            <CatalogTag
              label={
                lifeScenarios?.find((item) => item.id === lifeScenarioId)
                  ?.name || ""
              }
              type="lifeScenario"
            />
            <CatalogTag
              label={
                keyTechnologies?.find((item) => item.id === keyTechnologyId)
                  ?.name || ""
              }
              type="keyTechnology"
            />
          </div>
          <Link to={`/projects/${id}`} className={styles.title}>
            {name}
          </Link>
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
