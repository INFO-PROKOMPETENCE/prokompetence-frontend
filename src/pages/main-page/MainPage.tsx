import { Button, Drawer, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PreviewProjectCard } from "../../components/shared/preview-project-card/PreviewProjectCard";
import {
  getRefreshTokenAsync,
  registerUserAsync,
} from "../../redux-store/actions";
import { getProjectsAsync } from "../../redux-store/actions/project.action";
import {
  projectsSelector,
  refreshTokenSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const [isOpenFiltersBar, setIsOpenFiltersBar] = useState<boolean>(false);
  const refresh = useSelector(refreshTokenSelector);
  const projects = useSelector(projectsSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  const register = useCallback(() => {
    dispatch(
      registerUserAsync({
        login: "aoaoa4",
        name: "aoaoa4",
        password: "aoaoa4",
      })
    );
  }, [dispatch]);
  const getNewToken = useCallback(() => {
    if (refresh) {
      dispatch(getRefreshTokenAsync({ refreshToken: refresh }));
    }
  }, [dispatch, refresh]);
  return (
    <div className={styles.main}>
      <button onClick={register}>register</button>
      <button onClick={getNewToken}>get new token</button>
      <div className={styles.header}>Проекты - 522</div>
      <div className={styles.controls}>
        <TextField variant="outlined" placeholder="Найти проект" fullWidth />
        <Button variant="contained" onClick={() => setIsOpenFiltersBar(true)}>
          Фильтры
        </Button>
      </div>
      <div className={styles.projects}>
        {projects.items.map((project) => (
          <PreviewProjectCard key={project.id} card={project} />
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
