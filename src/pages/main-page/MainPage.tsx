import { Button, Drawer, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Hidder } from "../../components/shared/hidder";
import { PreviewProjectCard } from "../../components/shared/preview-project-card/PreviewProjectCard";
import {
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
} from "../../redux-store/actions/catalog.action";
import {
  getProjectsAsync,
  PROJECT_ACTIONS,
} from "../../redux-store/actions/project.action";
import {
  isLoadingByKeysSelector,
  projectsSelector,
} from "../../redux-store/selectors";
import {
  keyTechnologiesSelector,
  lifeScenariosSelector,
} from "../../redux-store/selectors/catalog.selector";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const [isOpenFiltersBar, setIsOpenFiltersBar] = useState<boolean>(false);
  const projects = useSelector(projectsSelector);
  const isLoadingProjects = useSelector(
    isLoadingByKeysSelector([PROJECT_ACTIONS.GET_PROJECTS])
  );
  const keyTechnologies = useSelector(keyTechnologiesSelector);
  const lifeScenarios = useSelector(lifeScenariosSelector);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectsAsync());
    if (!keyTechnologies) {
      dispatch(getKeyTechnologiesAsync());
    }
    if (!lifeScenarios) {
      dispatch(getLifeScenariosAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const goToProject = useCallback(
    (projectId: string) => {
      navigate(`/projects/${projectId}`);
    },
    [navigate]
  );

  return (
    <div className={styles.main}>
      <div className={styles.header}>Проекты - {projects.totalCount}</div>
      <div className={styles.controls}>
        <TextField variant="outlined" placeholder="Найти проект" fullWidth />
        <Button variant="contained" onClick={() => setIsOpenFiltersBar(true)}>
          Фильтры
        </Button>
      </div>
      <div className={styles.projects}>
        <Hidder isLoading={isLoadingProjects}>
          {projects.items.map((project) => (
            <PreviewProjectCard
              key={project.id}
              card={project}
              keyTechnologies={keyTechnologies}
              lifeScenarios={lifeScenarios}
              onClick={() => goToProject(project.id)}
            />
          ))}
        </Hidder>
      </div>
      <Drawer
        anchor={"right"}
        open={isOpenFiltersBar}
        onClose={() => setIsOpenFiltersBar(false)}
      >
        <div className={styles.filtersControl}>Фильтры</div>
      </Drawer>
    </div>
  );
};
