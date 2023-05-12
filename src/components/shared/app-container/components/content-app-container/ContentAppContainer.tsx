import type { FC, PropsWithChildren } from "react";
import styles from "./ContentAppContainer.module.scss";

export const ContentAppContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};
