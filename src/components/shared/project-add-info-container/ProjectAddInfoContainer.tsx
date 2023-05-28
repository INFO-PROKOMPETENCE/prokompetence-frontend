import { TextField } from "@mui/material";
import { FC } from "react";
import styles from "./ProjectAddInfoContainer.module.scss";

interface Props {
  title: string;
  name: string;
  value: string;
  onChange: (e: any, v: any) => void;
}

export const ProjectAddInfoContainer: FC<Props> = ({ title, value }) => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>{title}</div>
      <TextField placeholder="Ссылка" size="small" />
    </div>
  );
};
