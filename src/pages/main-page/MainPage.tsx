import { Button, Drawer, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PreviewProjectCard } from "../../components/shared/preview-project-card/PreviewProjectCard";
import {
  getRefreshTokenAsync,
  loginUserAsync,
  registerUserAsync,
} from "../../redux-store/actions";
import {
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
} from "../../redux-store/actions/catalog.action";
import { getProjectsAsync } from "../../redux-store/actions/project.action";
import {
  projectsSelector,
  refreshTokenSelector,
} from "../../redux-store/selectors";
import {
  keyTechnologiesSelector,
  lifeScenariosSelector,
} from "../../redux-store/selectors/catalog.selector";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const [isOpenFiltersBar, setIsOpenFiltersBar] = useState<boolean>(false);
  const refresh = useSelector(refreshTokenSelector);
  const projects = useSelector(projectsSelector);
  const keyTechnologies = useSelector(keyTechnologiesSelector);
  const lifeScenarios = useSelector(lifeScenariosSelector);

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

  const login = useCallback(() => {
    dispatch(
      loginUserAsync({
        login: "aoaoa4",
        password: "aoaoa4",
      })
    );
  }, [dispatch]);
  const getNewToken = useCallback(() => {
    if (refresh) {
      dispatch(getRefreshTokenAsync({ refreshToken: refresh }));
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    console.log(keyTechnologies);
    console.log(lifeScenarios);
  }, [keyTechnologies, lifeScenarios]);

  return (
    <div className={styles.main}>
      <button onClick={login}>login</button>
      <button onClick={getNewToken}>get new token</button>
      <div className={styles.header}>Проекты - {projects.totalCount}</div>
      <div className={styles.controls}>
        <TextField variant="outlined" placeholder="Найти проект" fullWidth />
        <Button variant="contained" onClick={() => setIsOpenFiltersBar(true)}>
          Фильтры
        </Button>
      </div>
      <div className={styles.projects}>
        {projects.items.map((project) => (
          <PreviewProjectCard
            key={project.id}
            card={project}
            keyTechnologies={keyTechnologies}
            lifeScenarios={lifeScenarios}
          />
        ))}
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
