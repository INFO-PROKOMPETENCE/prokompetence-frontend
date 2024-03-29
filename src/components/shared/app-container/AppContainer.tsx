import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  clearProjectDataAction,
  clearTeamDataAction,
  getCurrentUserAsync,
  logoutUserAction,
} from "../../../redux-store/actions";
import { currentUserSelector } from "../../../redux-store/selectors";
import { useAppDispatch } from "../../../redux-store/store-manager";
import styles from "./AppContainer.module.scss";
import { ContentAppContainer } from "./components/content-app-container/ContentAppContainer";
import { Header } from "./components/header";

const routes: { [key: number | string]: string } = {
  // TO DO
  0: "/",
  1: "/my-project",
};

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number | boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = useSelector(currentUserSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pathname.includes("login")) {
      dispatch(getCurrentUserAsync());
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    let tab: number | boolean = false;
    Object.keys(routes).forEach((key) => {
      if (routes[key] === pathname) {
        tab = +key;
        return;
      }
    });
    setActiveTab(tab);
  }, [pathname]);

  const changePage = useCallback(
    (tab: number) => {
      setActiveTab(tab);
      navigate({
        pathname: routes[tab],
      });
    },
    [navigate]
  );

  const onCLickLogo = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const logout = useCallback(() => {
    dispatch(logoutUserAction());
    dispatch(clearTeamDataAction());
    dispatch(clearProjectDataAction());
    navigate("/login");
  }, [dispatch, navigate]);

  const profile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  return (
    <div className={styles.main}>
      <Header
        activeTab={activeTab}
        changeTab={changePage}
        name={currentUser?.name || "User"}
        onClickLogout={logout}
        onClickLogo={onCLickLogo}
        onClickProfile={profile}
      />
      <ContentAppContainer>{children}</ContentAppContainer>
    </div>
  );
};
