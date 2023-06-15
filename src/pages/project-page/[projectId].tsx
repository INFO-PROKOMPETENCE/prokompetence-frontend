import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { CatalogTag } from "../../components/shared/catalog-tag";
import { ContentContainer } from "../../components/shared/content-container/ContentContainer";
import { Hidder } from "../../components/shared/hidder";
import {
  clearProjectDataAction,
  enrollToProjectAsync,
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
  getMyTeamAsync,
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
import styles from "./ProjectPage.module.scss";
import { ProjectDescriptionContainer } from "../../components/shared/project-description-container";
import { useTitle } from "../../utils";
import { Backdrop, Button, Fade, Modal } from "@mui/material";
import { Team } from "../../typing/team";

interface ModalError {
  isShow: boolean;
  error: {
    title: string;
    caption: string;
    nameButton: string;
    href?: string;
  } | null;
}

export const ProjectPage: FC = () => {
  const [showErrorModal, setShowErrorModal] = useState<ModalError>({
    error: null,
    isShow: false,
  });
  const [documentTitle, setDocumentTitle] = useState("Проект");
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
  const navigate = useNavigate();

  useTitle(documentTitle);

  //@ts-ignore
  useEffect(() => {
    return () => dispatch(clearProjectDataAction());
  }, [dispatch]);

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

  useEffect(() => {
    if (project) {
      setDocumentTitle(project.name);
    }
  }, [project]);

  const enrollToProject = useCallback(async () => {
    if (project?.id) {
      const team = (await dispatch(getMyTeamAsync())).payload as Team | boolean;
      console.log(team);
      if (!team) {
        setShowErrorModal({
          isShow: true,
          error: {
            title: "У вас нет команды",
            caption:
              "Вы не можете записаться на проект без команды. Найдите команду или создайте ее",
            nameButton: "Закрыть",
          },
        });
        return;
      }
      if (!!(team as Team)?.projectId) {
        setShowErrorModal({
          isShow: true,
          error: {
            title: "У вас уже есть проект",
            caption: "Вы уже записаны на проект",
            nameButton: "Закрыть",
          },
        });
        return;
      }
      await dispatch(enrollToProjectAsync(project.id));
      if (projectId) {
        dispatch(getProjectAsync(projectId));
        dispatch(getProjectInfoAsync(projectId));
      }
    }
  }, [dispatch, project, projectId]);

  const closeModal = useCallback(() => {
    setShowErrorModal({ error: null, isShow: false });
  }, []);

  return (
    <>
      <Hidder
        isLoading={isLoadingProject || isLoadingProjectInfo}
        show={!!project && !!projectInfo}
      >
        {project && projectInfo && (
          <div className={styles.mainContent}>
            <div className={styles.header}>
              <div className={styles.info}>
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
              <div className={styles.enrollContainer}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ height: 56, borderRadius: 12 }}
                  onClick={enrollToProject}
                  disabled={
                    project?.recordedTeamsCount === project?.maxTeamsCount
                  }
                >
                  Записаться на проект
                </Button>
              </div>
            </div>
            <div className={styles.content}>
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
              </div>
            </div>
            <div className={styles.teams}>
              <div className={styles.title}>
                <div className={styles.text}>Команды</div>
                <CounterContainer
                  total={project.maxTeamsCount}
                  current={project.recordedTeamsCount}
                />
              </div>
              <div className={styles.teamList}>
                {projectInfo.teams.map(({ name, students, teamId }) => (
                  <ContentContainer key={teamId}>
                    <div className={styles.teamItem}>
                      <div className={styles.nameContainer}>
                        <div className={styles.name}>{name}</div>
                        <CounterContainer
                          total={project.maxStudentsCountInTeam}
                          current={students.length}
                        />
                      </div>
                      <div className={styles.status}>Зарегистрирована</div>
                    </div>
                  </ContentContainer>
                ))}
              </div>
            </div>
          </div>
        )}
      </Hidder>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showErrorModal.isShow}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
        style={{ outline: "none" }}
      >
        <Fade in={showErrorModal.isShow}>
          <div className={styles.modal}>
            <ContentContainer>
              <div className={styles.modalContent}>
                <div className={styles.modalTitle}>
                  {showErrorModal.error?.title}
                </div>
                <div className={styles.modalCaption}>
                  {showErrorModal.error?.caption}
                </div>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (showErrorModal.error?.href) {
                      navigate(showErrorModal.error.href);
                    }
                    closeModal();
                  }}
                >
                  {showErrorModal.error?.nameButton}
                </Button>
              </div>
            </ContentContainer>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

interface CounterContainerProps {
  total: number;
  current: number;
}

const CounterContainer: FC<CounterContainerProps> = ({ current, total }) => {
  return (
    <div className={styles.counterContainer}>
      {current}/{total}
    </div>
  );
};
