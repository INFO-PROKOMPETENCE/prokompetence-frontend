import type { FC, PropsWithChildren } from "react";
import cx from "classnames";
import styles from "./ContentContainer.module.scss";

interface Props {
  padding?: "normal" | "small";
  widthPx?: number;
  heightPx?: number;
  onClick?: () => void;
}

export const ContentContainer: FC<PropsWithChildren<Props>> = ({
  children,
  padding,
  heightPx,
  widthPx,
  onClick,
}) => {
  return (
    <div
      className={cx(styles.main, { [styles.small]: padding === "small" })}
      style={{
        width: widthPx ? widthPx + "px" : "100%",
        height: heightPx + "px",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
