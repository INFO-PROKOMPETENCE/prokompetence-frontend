import { Box, CircularProgress } from "@mui/material";
import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ROUTES } from "../../config/routes";

export const Routing: FC = () => {
  const AppContainer = lazy(() => import("../shared/app-container/index"));
  const MainPage = lazy(() => import("../../pages/main-page/index"));
  const ProjectPage = lazy(() => import("../../pages/project-page/index"));
  const LoginPage = lazy(() => import("../../pages/login-page/index"));
  const ProfilePage = lazy(() => import("../../pages/profile-page/index"));
  const NotFoundPage = lazy(() => import("./components/not-found-page/index"));

  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      }
    >
      <AppContainer>
        <Routes>
          <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
          <Route path={ROUTES.PROJECT_PAGE} element={<ProjectPage />} />
          <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
          <Route path={ROUTES.PROFILE_PAGE} element={<ProfilePage />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </AppContainer>
    </Suspense>
  );
};
