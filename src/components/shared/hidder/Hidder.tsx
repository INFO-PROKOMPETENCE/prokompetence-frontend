import { Box, CircularProgress } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

interface Props {
  show?: boolean;
  isLoading?: boolean;
}

export const Hidder: FC<PropsWithChildren<Props>> = ({
  children,
  show = true,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoading && show) {
    return <>{children}</>;
  }

  return null;
};
