import { Tabs, Tab } from "@mui/material";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import styles from "./AppContainer.module.scss";
import { ContentAppContainer } from "./components/content-app-container/ContentAppContainer";

const routes: { [key: number | string]: string } = {
  // TO DO
  0: "/",
};

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(-1);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    Object.keys(routes).forEach((key) => {
      if (routes[key] === pathname) {
        setActiveTab(+key);
        return;
      }
    });
  }, [pathname]);

  const changePage = useCallback(
    (tab: number) => {
      setActiveTab(tab);
      navigate(routes[tab]);
    },
    [navigate]
  );

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.content}>
          <Tabs value={activeTab} onChange={(e, tab) => changePage(tab)}>
            <Tab style={{ textTransform: "none" }} label="Каталог" />
            <Tab style={{ textTransform: "none" }} label="Мой проект" />
          </Tabs>
        </div>
      </div>
      <ContentAppContainer>{children}</ContentAppContainer>
    </div>
  );
};
