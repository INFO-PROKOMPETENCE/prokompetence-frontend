import { Button } from "@mui/material";
import { FC, useEffect } from "react";
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
import styles from "./MyProjectPage.module.scss";

export const MyProjectPage: FC = () => {
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

  return (
    <div className={styles.main}>
      <div className={styles.teams}>
        <div className={styles.title}>Команда</div>
        <div className={styles.teammates}>
          <ContentContainer widthPx={240}>
            <div className={styles.teammateCard}>
              <div className={styles.info}>
                <div className={styles.role}>Frontend-Разработчик</div>
                <div className={styles.name}> Предеин никита</div>
                <div className={styles.group}>РИ-300014</div>
              </div>
              <div className={styles.contacts}>
                <div className={styles.contactsTitle}>Контакты</div>
                <div className={styles.contact}>tg: @predeinnikita</div>
                <div className={styles.contact}>predein697@gmail.com</div>
              </div>
            </div>
          </ContentContainer>
        </div>
      </div>
      <div className={styles.projectContainer}>
        <div className={styles.title}>Мой проект</div>
        <div className={styles.projectContent}>
          {/* <Hidder
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
          </Hidder> */}
        </div>
      </div>
    </div>
  );
};
