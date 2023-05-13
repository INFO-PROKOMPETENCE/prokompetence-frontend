import { Tabs, Tab, Divider, Button } from "@mui/material";
import { FC } from "react";
import { LogoIcon } from "../../../icons";
import styles from "./header.module.scss";

interface Props {
  activeTab: number;
  changeTab: (tab: number) => void;
  name: string;
  onClickLogout: () => void;
}

export const Header: FC<Props> = ({
  activeTab,
  changeTab,
  name,
  onClickLogout,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <LogoIcon />
        <div className={styles.content}>
          <Tabs value={activeTab} onChange={(e, tab) => changeTab(tab)}>
            <Tab style={{ textTransform: "none" }} label="Каталог" />
            <Tab style={{ textTransform: "none" }} label="Мой проект" />
          </Tabs>
          <div className={styles.data}>
            <div className={styles.name}>{name}</div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button variant="contained" onClick={onClickLogout}>
              Выход
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
