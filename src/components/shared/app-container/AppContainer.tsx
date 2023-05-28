import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
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
};

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
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

  const onCLickLogo = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const logout = useCallback(() => {
    dispatch(logoutUserAction());
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
