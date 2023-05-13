import { Button, Drawer, Input, TextField } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PreviewProjectCard } from "../../components/shared/preview-project-card/PreviewProjectCard";
import {
  getCurrentUserAsync,
  getRefreshTokenAsync,
  registerUserAsync,
} from "../../redux-store/actions";
import { refreshTokenSelector } from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./MainPage.module.scss";

export interface PreviewCard {
  // TO DO when get info from back --> in typing
  tags: string[];
  title: string;
  company: string;
  menthor: string;
  totalTeam: number;
  closedTeam: number;
  students: number;
}

const mockPreviewCard: PreviewCard = {
  tags: ["Инженерный", "WEB"],
  closedTeam: 2,
  company: "Альфа-Банк",
  menthor: "Силачева Яна Валерьевна",
  students: 6,
  title: "Автоматизация процесса питания в школах",
  totalTeam: 3,
};

export const MainPage: FC = () => {
  const [isOpenFiltersBar, setIsOpenFiltersBar] = useState<boolean>(false);
  const refresh = useSelector(refreshTokenSelector);

  const dispatch = useAppDispatch();
  const register = useCallback(() => {
    dispatch(
      registerUserAsync({
        login: "aoaoa4",
        name: "aoaoa4",
        password: "aoaoa4",
      })
    );
  }, [dispatch]);
  const getUser = useCallback(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);
  const getNewToken = useCallback(() => {
    if (refresh) {
      dispatch(getRefreshTokenAsync({ refreshToken: refresh }));
    }
  }, [dispatch, refresh]);
  return (
    <div className={styles.main}>
      <button onClick={register}>register</button>
      <button onClick={getUser}>get user</button>
      <button onClick={getNewToken}>get new token</button>
      <div className={styles.header}>Проекты - 522</div>
      <div className={styles.controls}>
        <TextField variant="outlined" placeholder="Найти проект" fullWidth />
        <Button variant="contained" onClick={() => setIsOpenFiltersBar(true)}>
          Фильтры
        </Button>
      </div>
      <div className={styles.projects}>
        {new Array(12).fill(mockPreviewCard).map((card, index) => (
          <PreviewProjectCard key={index} card={card} />
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
