import { Button } from "@mui/material";
import { FC } from "react";
import { ContentContainer } from "../../../../components/shared/content-container/ContentContainer";
import styles from "./StudentContainer.module.scss";

interface Props {
  name: string;
  group: string;
  role?: string;
  primaryButtonText?: string;
  seconaryButtonText?: string;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
}

export const StudentContainer: FC<Props> = ({
  group,
  name,
  onClickPrimaryButton,
  onClickSecondaryButton,
  primaryButtonText,
  role,
  seconaryButtonText,
}) => {
  return (
    <ContentContainer>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.name}>{name}</div>
          {role && <div className={styles.role}>{role}</div>}
          <div className={styles.group}>{group}</div>
        </div>
        <div className={styles.buttons}>
          {primaryButtonText && (
            <Button variant="contained" onClick={onClickPrimaryButton}>
              {primaryButtonText}
            </Button>
          )}
          {seconaryButtonText && (
            <Button variant="outlined" onClick={onClickSecondaryButton}>
              {seconaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </ContentContainer>
  );
};
