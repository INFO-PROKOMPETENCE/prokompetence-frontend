import { Chip } from "@mui/material";
import type { FC } from "react";
import { DirectoryIcon } from "../icons";
import styles from "./CatalogTag.module.scss";

interface Props {
  label: string;
  type: "lifeScenario" | "keyTechnology";
}

export const CatalogTag: FC<Props> = ({ label, type }) => {
  return (
    <Chip
      label={label}
      icon={
        <div className={styles.main}>
          <DirectoryIcon />
        </div>
      }
      style={{
        backgroundColor: type === "keyTechnology" ? "#FCC068" : "#2FAD96",
        color: "#FFFFFF",
        fontWeight: 500,
      }}
    />
  );
};
