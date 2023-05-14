import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { CatalogTag } from "../../components/shared/catalog-tag";
import { ContentContainer } from "../../components/shared/content-container/ContentContainer";
import { Hidder } from "../../components/shared/hidder";
import {
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
  getProjectAsync,
  getProjectInfoAsync,
  PROJECT_ACTIONS,
} from "../../redux-store/actions";
import {
  currentProjectInfoSelector,
  currentProjectSelector,
  isLoadingByKeysSelector,
  keyTechnologiesSelector,
  lifeScenariosSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import cx from "classnames";
import styles from "./ProjectPage.module.scss";
import { Button, TextField } from "@mui/material";

export const ProjectPage: FC = () => {
  const { projectId } = useParams();
  const project = useSelector(currentProjectSelector);
  const projectInfo = useSelector(currentProjectInfoSelector);
  const isLoadingProject = useSelector(
    isLoadingByKeysSelector([PROJECT_ACTIONS.GET_PROJECT])
  );
  const isLoadingProjectInfo = useSelector(
    isLoadingByKeysSelector([PROJECT_ACTIONS.GET_PROJECT_INFO])
  );
  const keyTechnologies = useSelector(keyTechnologiesSelector);
  const lifeScenarios = useSelector(lifeScenariosSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!keyTechnologies) {
      dispatch(getKeyTechnologiesAsync());
    }
    if (!lifeScenarios) {
      dispatch(getLifeScenariosAsync());
    }
    if (projectId) {
      dispatch(getProjectAsync(projectId));
      dispatch(getProjectInfoAsync(projectId));
    }
  }, [dispatch, keyTechnologies, lifeScenarios, projectId]);

  return (
    <div className={styles.main}>
      <Hidder
        isLoading={isLoadingProject || isLoadingProjectInfo}
        show={!!project && !!projectInfo}
      >
        {project && projectInfo && (
          <>
            <div className={styles.mainContent}>
              <div className={styles.header}>
                <div className={styles.tags}>
                  <CatalogTag
                    label={
                      lifeScenarios?.find(
                        (item) => item.id === project.lifeScenarioId
                      )?.name || ""
                    }
                    type="lifeScenario"
                  />
                  <CatalogTag
                    label={
                      keyTechnologies?.find(
                        (item) => item.id === project.keyTechnologyId
                      )?.name || ""
                    }
                    type="keyTechnology"
                  />
                </div>
                <div className={styles.title}>{project.name}</div>
              </div>
              <ContentContainer>
                <div className={styles.description}>
                  <DescriptionContainer
                    title="Цель проекта"
                    value={projectInfo.finalProject}
                    isStrongHeader
                  />
                  <DescriptionContainer
                    title="Описание проекта"
                    value={projectInfo.description}
                    isStrongHeader
                  />
                  <DescriptionContainer
                    title="Ожидаемые результаты"
                    value="Ожидаемые результаты"
                    isStrongHeader
                  />
                  <DescriptionContainer
                    title="Стек"
                    value="Стек"
                    isStrongHeader
                  />
                </div>
              </ContentContainer>
            </div>
            <div className={styles.sideContent}>
              <div className={styles.wrapper}>
                <ContentContainer>
                  <div className={styles.container}>
                    <div className={styles.sideTitle}>Информация</div>
                    <DescriptionContainer
                      title="Организация:"
                      value={project.organizationName}
                      smallGap
                    />
                    <DescriptionContainer
                      title="Куратор:"
                      value={project.curatorName}
                      smallGap
                    />
                    <DescriptionContainer
                      title="Контакты:"
                      value="contacts"
                      smallGap
                    />
                  </div>
                </ContentContainer>
              </div>
              <div className={styles.wrapper}>
                <ContentContainer>
                  <div className={styles.container}>
                    <div className={styles.sideTitle}>
                      Дополнительная информация
                    </div>
                    <DescriptionInputContainer
                      title="Ссылка на репозиторий:"
                      name=""
                      onChange={() => {}}
                      value=""
                    />
                    <DescriptionInputContainer
                      title="Ссылка на Систему управления проектами(Trello, Jira и т.п):"
                      name=""
                      onChange={() => {}}
                      value=""
                    />
                    <Button variant="contained" fullWidth>
                      Сохранить
                    </Button>
                  </div>
                </ContentContainer>
              </div>
            </div>
          </>
        )}
      </Hidder>
    </div>
  );
};

interface DescriptionContainerProps {
  title: string;
  value: string;
  isStrongHeader?: boolean;
  smallGap?: boolean;
}

const DescriptionContainer: FC<DescriptionContainerProps> = ({
  title,
  value,
  isStrongHeader,
  smallGap,
}) => {
  return (
    <div
      className={cx(styles.descriptionContainer, {
        [styles.smallGap]: smallGap,
      })}
    >
      <div className={cx(styles.title, { [styles.strong]: isStrongHeader })}>
        {title}
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

interface DescriptionInputContainerProps {
  title: string;
  name: string;
  value: string;
  onChange: (e: any, v: any) => void;
}

const DescriptionInputContainer: FC<DescriptionInputContainerProps> = ({
  title,
  value,
}) => {
  return (
    <div className={styles.descriptionInputContainer}>
      <div className={styles.title}>{title}</div>
      <TextField placeholder="Ссылка" size="small" />
    </div>
  );
};
