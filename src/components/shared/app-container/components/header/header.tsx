import { Tabs, Tab, Divider, Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { LogoIcon } from "../../../icons";
import styles from "./header.module.scss";

interface Props {
  activeTab: number;
  changeTab: (tab: number) => void;
  name: string;
  onClickLogout: () => void;
  onClickLogo: () => void;
  onClickProfile: () => void;
}

export const Header: FC<Props> = ({
  activeTab,
  changeTab,
  name,
  onClickLogout,
  onClickLogo,
  onClickProfile,
}) => {
  const { pathname } = useLocation();
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    setIsShow(!pathname.includes("login"));
  }, [pathname]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <LogoIcon onClick={onClickLogo} />
        </div>
        {isShow && (
          <div className={styles.content}>
            <Tabs
              value={activeTab}
              onChange={(e, tab) => changeTab(tab)}
              style={{ marginTop: 8 }}
            >
              <Tab style={{ textTransform: "none" }} label="Каталог" />
              <Tab style={{ textTransform: "none" }} label="Мой проект" />
            </Tabs>
            <div className={styles.data}>
              <div className={styles.name} onClick={onClickProfile}>
                {name}
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Button variant="contained" onClick={onClickLogout}>
                Выход
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
