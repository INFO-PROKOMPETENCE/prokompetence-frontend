import type { FC } from "react";
import cx from "classnames";
import logo from "./img/logo-for-light.svg";
import styles from "./icons.module.scss";

interface Props {
  isActive?: boolean;
  onClick?: () => void;
}

export const DirectoryIcon: FC<Props> = ({ isActive }) => {
  return (
    <svg
      className={cx(styles.book, {
        [styles.active]: isActive,
      })}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.4 3C2.28021 3 2.17233 3.04605 2.09897 3.11579C2.0295 3.18183 2 3.26092 2 3.333V12.667C2 12.738 2.02975 12.8188 2.09963 12.8858C2.17167 12.954 2.27872 13 2.4 13H13.6C13.7209 13 13.8276 12.9543 13.8996 12.8865C13.9712 12.8173 14 12.7367 14 12.667V5.333C14 5.26196 13.9702 5.18116 13.9003 5.11411C13.8283 5.046 13.7213 5 13.6 5H7.3C6.97369 5 6.6679 4.84079 6.48077 4.57346L5.37934 3H2.4ZM0.721033 1.66621C1.17367 1.23595 1.77779 1 2.4 1H5.9C6.22631 1 6.5321 1.15921 6.71923 1.42654L7.82066 3H13.6C14.2203 3 14.825 3.23369 15.279 3.66521L15.2803 3.66652C15.734 4.09935 16 4.69826 16 5.333V12.667C16 13.3029 15.7332 13.8997 15.2818 14.3321L15.279 14.3348C14.825 14.7663 14.2203 15 13.6 15H2.4C1.77965 15 1.17499 14.7663 0.721033 14.3348L0.719656 14.3335C0.266049 13.9007 0 13.3017 0 12.667V3.333C0 2.69908 0.264499 2.10017 0.721033 1.66621Z"
        fill="white"
      />
    </svg>
  );
};

export const LogoIcon: FC<Props> = ({ onClick }) => {
  return <img src={logo} alt="" onClick={onClick} />;
};
