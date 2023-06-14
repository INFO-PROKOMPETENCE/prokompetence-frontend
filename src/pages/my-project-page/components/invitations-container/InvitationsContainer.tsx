import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Hidder } from "../../../../components/shared/hidder";
import {
  acceptInviteToTeamAsync,
  getInvitationsAsync,
  TEAM_ACTIONS,
} from "../../../../redux-store/actions";
import {
  invitationsSelector,
  isLoadingByKeysSelector,
} from "../../../../redux-store/selectors";
import { useAppDispatch } from "../../../../redux-store/store-manager";
import { StudentContainer } from "../student-container";
import styles from "./InvitationsContainer.module.scss";

interface Props {}

export const InvitationsContainer: FC<Props> = () => {
  const invitations = useSelector(invitationsSelector);
  const isLoading = useSelector(
    isLoadingByKeysSelector([TEAM_ACTIONS.GET_INVITATIONS])
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInvitationsAsync());
  }, [dispatch]);

  const acceptInvite = useCallback(
    (teamId: string) => {
      dispatch(acceptInviteToTeamAsync(teamId));
    },
    [dispatch]
  );

  return (
    <div className={styles.main}>
      <div className={styles.title}>Вас пригласили в команду</div>
      <div className={styles.invitiesList}>
        <Hidder isLoading={isLoading}>
          {invitations.map(({ teamId, students }) => {
            const teamLead = students.find(({ isTeamLead }) => isTeamLead);

            return (
              <StudentContainer
                key={teamId}
                group={teamLead?.studentAcademicGroup || ""}
                name={teamLead?.studentName || ""}
                primaryButtonText="Принять"
                seconaryButtonText="Отклонить"
                onClickPrimaryButton={() => acceptInvite(teamId)}
              />
            );
          })}
        </Hidder>
      </div>
    </div>
  );
};
