import { Button } from "@mui/material";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { CatalogTag } from "../../components/shared/catalog-tag";
import { ContentContainer } from "../../components/shared/content-container/ContentContainer";
import { Hidder } from "../../components/shared/hidder";
import { ProjectAddInfoContainer } from "../../components/shared/project-add-info-container";
import { ProjectDescriptionContainer } from "../../components/shared/project-description-container";
import {
  PROJECT_ACTIONS,
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
  getProjectAsync,
  getProjectInfoAsync,
} from "../../redux-store/actions";
import {
  currentProjectSelector,
  currentProjectInfoSelector,
  isLoadingByKeysSelector,
  keyTechnologiesSelector,
  lifeScenariosSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./MyProjectPage.module.scss";

export const MyProjectPage: FC = () => {
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
                  <ProjectDescriptionContainer
                    title="Цель проекта"
                    value={projectInfo.finalProject}
                    isStrongHeader
                  />
                  <ProjectDescriptionContainer
                    title="Описание проекта"
                    value={projectInfo.description}
                    isStrongHeader
                  />
                  <ProjectDescriptionContainer
                    title="Ожидаемые результаты"
                    value="Ожидаемые результаты"
                    isStrongHeader
                  />
                  <ProjectDescriptionContainer
                    title="Стек"
                    value={projectInfo.stack}
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
                    <ProjectDescriptionContainer
                      title="Организация:"
                      value={project.organizationName}
                      smallGap
                    />
                    <ProjectDescriptionContainer
                      title="Куратор:"
                      value={project.curatorName}
                      smallGap
                    />
                    <ProjectDescriptionContainer
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
                    <ProjectAddInfoContainer
                      title="Ссылка на репозиторий:"
                      name=""
                      onChange={() => {}}
                      value=""
                    />
                    <ProjectAddInfoContainer
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
