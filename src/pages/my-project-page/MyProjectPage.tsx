import {
  Badge,
  Button,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CatalogTag } from "../../components/shared/catalog-tag";
import { ContentContainer } from "../../components/shared/content-container/ContentContainer";
import { Hidder } from "../../components/shared/hidder";
import { ProjectAddInfoContainer } from "../../components/shared/project-add-info-container";
import { ProjectDescriptionContainer } from "../../components/shared/project-description-container";
import {
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
  getMyTeamAsync,
  TEAM_ACTIONS,
} from "../../redux-store/actions";
import {
  isLoadingByKeysSelector,
  keyTechnologiesSelector,
  lifeScenariosSelector,
  myTeamSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import { EmptyTeamPage } from "./components/empty-team-page";
import styles from "./MyProjectPage.module.scss";

export const MyProjectPage: FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const myTeam = useSelector(myTeamSelector);
  const isLoadingMyTeam = useSelector(
    isLoadingByKeysSelector([TEAM_ACTIONS.GET_MY_TEAM])
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

    dispatch(getMyTeamAsync());
  }, [dispatch, keyTechnologies, lifeScenarios]);

  useEffect(() => {
    if (myTeam) {
      // запросить проект
    }
  }, [myTeam]);

  const changeTab = useCallback((tab: any) => {}, []);

  return (
    <div className={styles.wrapperComponent}>
      {isLoadingMyTeam && (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      )}
      <Hidder show={!isLoadingMyTeam && !myTeam}>
        <EmptyTeamPage />
      </Hidder>
      <Hidder show={!isLoadingMyTeam && !!myTeam}>
        <div className={styles.main}>
          <div className={styles.pageHeader}>
            <div className={styles.content}>
              <Tabs
                value={activeTab}
                onChange={(e, tab) => changeTab(tab)}
                style={{ marginTop: 8 }}
              >
                <Tab style={{ textTransform: "none" }} label="Команда" />
                <Tab
                  style={{ textTransform: "none" }}
                  label={<div>Отправленные заявки</div>}
                />
                <Tab
                  style={{ textTransform: "none" }}
                  label={
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Приглашения
                      </div>
                      <div
                        style={{
                          borderRadius: 50,
                          background: "#8DDA71",
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                        }}
                      >
                        4
                      </div>
                    </div>
                  }
                />
              </Tabs>
              <div className={styles.button}>
                <Button variant="contained">Добавить участника</Button>
              </div>
            </div>
            <Divider flexItem orientation="horizontal" />
          </div>
          <div className={styles.teams}>
            <div className={styles.title}>Команда</div>
            <div className={styles.teammates}>
              {myTeam?.students.map(({ studentName, studentId }) => (
                <ContentContainer widthPx={240} key={studentId}>
                  <div className={styles.teammateCard}>
                    <div className={styles.info}>
                      <div className={styles.role}>nothing yet</div>
                      <div className={styles.name}>{studentName}</div>
                      <div className={styles.group}>nothing yet</div>
                    </div>
                    <div className={styles.contacts}>
                      <div className={styles.contactsTitle}>Контакты</div>
                      <div className={styles.contact}>nothing yet</div>
                      <div className={styles.contact}>nothing yet</div>
                    </div>
                  </div>
                </ContentContainer>
              ))}
            </div>
          </div>
          {/* <div className={styles.projectContainer}>
            <div className={styles.title}>Мой проект</div>
            <div className={styles.projectContent}>
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
          </div> */}
        </div>
      </Hidder>
    </div>
  );
};
