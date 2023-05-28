import { FC } from "react";
import cx from "classnames";
import styles from "./ProjectDescriptionContainer.module.scss";

interface Props {
  title: string;
  value: string;
  isStrongHeader?: boolean;
  smallGap?: boolean;
}

export const ProjectDescriptionContainer: FC<Props> = ({
  title,
  value,
  isStrongHeader,
  smallGap,
}) => {
  return (
    <div
      className={cx(styles.main, {
        [styles.smallGap]: smallGap,
      })}
    >
      <div className={cx(styles.title, { [styles.strong]: isStrongHeader })}>
        {title}
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
