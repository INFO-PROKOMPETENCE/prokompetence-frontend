import type { FC, PropsWithChildren } from "react";
import cx from "classnames";
import styles from "./ContentContainer.module.scss";

interface Props {
  padding?: "normal" | "small";
  widthPx?: number;
  heightPx?: number;
}

export const ContentContainer: FC<PropsWithChildren<Props>> = ({
  children,
  padding,
  heightPx,
  widthPx,
}) => {
  return (
    <div
      className={cx(styles.main, { [styles.small]: padding === "small" })}
      style={{ width: widthPx + "px", height: heightPx + "px" }}
    >
      {children}
    </div>
  );
};
