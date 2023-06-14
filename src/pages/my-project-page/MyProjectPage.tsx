import {
  Badge,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { createSearchParams } from "react-router-dom";
import { CatalogTag } from "../../components/shared/catalog-tag";
import { ContentContainer } from "../../components/shared/content-container/ContentContainer";
import { Hidder } from "../../components/shared/hidder";
import { DeleteIcon } from "../../components/shared/icons";
import { ProjectAddInfoContainer } from "../../components/shared/project-add-info-container";
import { ProjectDescriptionContainer } from "../../components/shared/project-description-container";
import {
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
  getMyTeamAsync,
  getProjectAsync,
  getProjectInfoAsync,
  PROJECT_ACTIONS,
  TEAM_ACTIONS,
} from "../../redux-store/actions";
import {
  currentProjectInfoSelector,
  currentProjectSelector,
  invitationsSelector,
  isLoadingByKeysSelector,
  keyTechnologiesSelector,
  lifeScenariosSelector,
  myTeamSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import { useTitle } from "../../utils";
import { EmptyTeamPage } from "./components/empty-team-page";
import { FindStudentsPage } from "./components/find-students-page";
import { InvitationsContainer } from "./components/invitations-container";
import { StudentContainer } from "./components/student-container";
import styles from "./MyProjectPage.module.scss";

enum MyProjectTabs {
  team,
  senden_invities,
  invities,
  find_students,
}

export const MyProjectPage: FC = () => {
  useTitle("Мой проект");

  const [activeTab, setActiveTab] = useState<MyProjectTabs>(MyProjectTabs.team);

  const myTeam = useSelector(myTeamSelector);
  const myProject = useSelector(currentProjectSelector);
  const myProjectInfo = useSelector(currentProjectInfoSelector);
  const isLoadingMyTeam = useSelector(
    isLoadingByKeysSelector([TEAM_ACTIONS.GET_MY_TEAM])
  );
  const isLoadingMyProject = useSelector(
    isLoadingByKeysSelector([PROJECT_ACTIONS.GET_PROJECT])
  );
  const isLoadingMyProjectInfo = useSelector(
    isLoadingByKeysSelector([PROJECT_ACTIONS.GET_PROJECT_INFO])
  );
  const keyTechnologies = useSelector(keyTechnologiesSelector);
  const lifeScenarios = useSelector(lifeScenariosSelector);
  const invitations = useSelector(invitationsSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

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
    if (myTeam && myTeam.projectId) {
      dispatch(getProjectAsync(myTeam.projectId));
      dispatch(getProjectInfoAsync(myTeam.projectId));
    }
  }, [dispatch, myTeam]);

  const changeTab = useCallback(
    (tab: number) => {
      setActiveTab(tab);
      navigate({
        search: `?${createSearchParams({
          tab: MyProjectTabs[tab],
        })}`,
      });
    },
    [navigate]
  );

  useEffect(() => {
    const tab = search.slice(1).split("=");

    if (tab[0] === "tab" && Object.keys(MyProjectTabs).includes(tab[1])) {
      changeTab(+MyProjectTabs[tab[1] as unknown as number]);
    } else {
      changeTab(0);
    }
  }, [changeTab, search]);

  const isExistTeam = useMemo(() => {
    return !!myTeam;
  }, [myTeam]);

  return (
    <div className={styles.wrapperComponent}>
      {isLoadingMyTeam && (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      )}
      <Hidder show={!isLoadingMyTeam}>
        <div className={styles.main}>
          <Hidder show={activeTab !== MyProjectTabs.find_students}>
            <div className={styles.pageHeader}>
              <div className={styles.content}>
                <Tabs
                  value={activeTab}
                  onChange={(e, tab) => changeTab(tab)}
                  style={{ marginTop: 8 }}
                >
                  <Tab
                    style={{ textTransform: "none" }}
                    label="Команда"
                    value={MyProjectTabs.team}
                  />
                  {isExistTeam && (
                    <Tab
                      style={{ textTransform: "none" }}
                      label={<div>Отправленные заявки</div>}
                      value={MyProjectTabs.senden_invities}
                    />
                  )}
                  {!isExistTeam && (
                    <Tab
                      style={{ textTransform: "none" }}
                      value={MyProjectTabs.invities}
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
                            {invitations.length}
                          </div>
                        </div>
                      }
                    />
                  )}
                </Tabs>
                {isExistTeam && (
                  <div className={styles.button}>
                    <Button
                      variant="contained"
                      onClick={() => changeTab(MyProjectTabs.find_students)}
                    >
                      Добавить участника
                    </Button>
                  </div>
                )}
              </div>
              <Divider />
            </div>
          </Hidder>
          <Hidder show={activeTab === MyProjectTabs.team && !isExistTeam}>
            <EmptyTeamPage />
          </Hidder>
          <Hidder show={activeTab === MyProjectTabs.team && isExistTeam}>
            <div className={styles.teams}>
              <div className={styles.teammates}>
                {myTeam?.students.map(
                  ({
                    studentName,
                    studentId,
                    studentAcademicGroup,
                    studentContacts,
                    roleId,
                  }) => (
                    <ContentContainer widthPx={240} key={studentId}>
                      <div className={styles.teammateCard}>
                        <div className={styles.info}>
                          <div className={styles.role}>{roleId}</div>
                          <div className={styles.name}>{studentName}</div>
                          <div className={styles.group}>
                            {studentAcademicGroup}
                          </div>
                        </div>
                        <div className={styles.contacts}>
                          <div className={styles.contactsTitle}>Контакты</div>
                          <div className={styles.contact}>
                            {studentContacts}
                          </div>
                        </div>
                      </div>
                    </ContentContainer>
                  )
                )}
              </div>
            </div>
            <Hidder
              show={
                !myProject && !(isLoadingMyProject || isLoadingMyProjectInfo)
              }
            >
              У вас еще нет проекта :(
            </Hidder>
            <Hidder
              show={!!myProject}
              isLoading={isLoadingMyProject || isLoadingMyProjectInfo}
            >
              <div className={styles.projectContainer}>
                <div className={styles.title}>Мой проект</div>
                <div className={styles.projectContent}>
                  {myProject && myProjectInfo && (
                    <>
                      <div className={styles.mainContent}>
                        <div className={styles.header}>
                          <div className={styles.tags}>
                            <CatalogTag
                              label={
                                lifeScenarios?.find(
                                  (item) => item.id === myProject.lifeScenarioId
                                )?.name || ""
                              }
                              type="lifeScenario"
                            />
                            <CatalogTag
                              label={
                                keyTechnologies?.find(
                                  (item) =>
                                    item.id === myProject.keyTechnologyId
                                )?.name || ""
                              }
                              type="keyTechnology"
                            />
                          </div>
                          <div className={styles.title}>{myProject.name}</div>
                        </div>
                        <ContentContainer>
                          <div className={styles.description}>
                            <ProjectDescriptionContainer
                              title="Цель проекта"
                              value={myProjectInfo.finalProject}
                              isStrongHeader
                            />
                            <ProjectDescriptionContainer
                              title="Описание проекта"
                              value={myProjectInfo.description}
                              isStrongHeader
                            />
                            <ProjectDescriptionContainer
                              title="Ожидаемые результаты"
                              value="Ожидаемые результаты"
                              isStrongHeader
                            />
                            <ProjectDescriptionContainer
                              title="Стек"
                              value={myProjectInfo.stack}
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
                                value={myProject.organizationName}
                                smallGap
                              />
                              <ProjectDescriptionContainer
                                title="Куратор:"
                                value={myProject.curatorName}
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
                </div>
              </div>
            </Hidder>
          </Hidder>
          <Hidder show={activeTab === MyProjectTabs.senden_invities}>
            <div className={styles.teams}>
              <div className={styles.teammates}>
                IN_PROGRESS
                {myTeam?.students.map(
                  ({
                    studentName,
                    studentId,
                    roleId,
                    studentAcademicGroup,
                    studentContacts,
                  }) => (
                    <ContentContainer widthPx={240} key={studentId}>
                      <div className={styles.teammateCard}>
                        <div className={styles.deleteIcon}>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                        <div className={styles.info}>
                          <div className={styles.role}>{roleId}</div>
                          <div className={styles.name}>{studentName}</div>
                          <div className={styles.group}>
                            {studentAcademicGroup}
                          </div>
                        </div>
                        <div className={styles.contacts}>
                          <div className={styles.contactsTitle}>Контакты</div>
                          <div className={styles.contact}>
                            {studentContacts}
                          </div>
                        </div>
                      </div>
                    </ContentContainer>
                  )
                )}
              </div>
            </div>
          </Hidder>
          <Hidder show={activeTab === MyProjectTabs.invities}>
            <InvitationsContainer />
          </Hidder>
          <Hidder show={activeTab === MyProjectTabs.find_students}>
            <FindStudentsPage />
          </Hidder>
        </div>
      </Hidder>
    </div>
  );
};
