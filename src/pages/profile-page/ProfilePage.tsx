import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { CatalogTag } from "../../components/shared/catalog-tag";
import { ContentContainer } from "../../components/shared/content-container/ContentContainer";
import { Hidder } from "../../components/shared/hidder";
import { PreviewProjectCard } from "../../components/shared/preview-project-card/PreviewProjectCard";
import { getPortfolioAsync, USER_ACTIONS } from "../../redux-store/actions";
import {
  currentUserSelector,
  isLoadingByKeysSelector,
  portfolioSelector,
} from "../../redux-store/selectors";
import { useAppDispatch } from "../../redux-store/store-manager";
import { useTitle } from "../../utils";
import styles from "./ProfilePage.module.scss";

export const ProfilePage: FC = () => {
  useTitle("Профиль");
  const portfolio = useSelector(portfolioSelector);
  const currentUser = useSelector(currentUserSelector);
  const isLoadingCurrentUser = useSelector(
    isLoadingByKeysSelector([USER_ACTIONS.GET_CURRENT_USER])
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPortfolioAsync());
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <Hidder isLoading={isLoadingCurrentUser}>
        <div className={styles.info}>
          <div className={styles.left}>
            <div className={styles.avatar}></div>
            <div className={styles.mainInfo}>
              <div className={styles.name}>{currentUser?.name}</div>
              <div className={styles.group}>{currentUser?.academicGroup}</div>
              <div className={styles.mail}>I.Ivanov@urfu.me </div>
            </div>
          </div>
          <div className={styles.rigth}>
            <div className={styles.title}>Основное</div>
            <div className={styles.info}>
              <InfoContainer title="Дата рождения" value="45.23.1902 " />
              <InfoContainer title="Телефон" value="+7 934 724 67 98 " />
              <InfoContainer
                title="Почта"
                value="sladkiy_malchik@predeinnikita.ru "
              />
              <InfoContainer
                title="Контакт для связи"
                value={currentUser?.contacts || ""}
              />
            </div>
          </div>
        </div>
      </Hidder>
      <div className={styles.competenceis}>
        <CompetenciesContainer title="Мои компетенции" />
        <CompetenciesContainer title="Желаемые компетенции" />
      </div>
      <div className={styles.projects}>
        <div className={styles.title}>Архив проектов</div>
        <div className={styles.projectsList}>
          <PreviewProjectCard
            card={{
              complexity: 2,
              curatorName: "",
              id: "asd",
              keyTechnologyId: 0,
              lifeScenarioId: 0,
              maxStudentsCountInTeam: 12,
              maxTeamsCount: 12,
              name: "asdasd",
              organizationName: "asdgfsdfg",
              recordedTeamsCount: 234,
            }}
            onClick={() => {}}
            keyTechnologies={null}
            lifeScenarios={null}
          />
          <PreviewProjectCard
            card={{
              complexity: 2,
              curatorName: "",
              id: "asd",
              keyTechnologyId: 0,
              lifeScenarioId: 0,
              maxStudentsCountInTeam: 12,
              maxTeamsCount: 12,
              name: "asdasd",
              organizationName: "asdgfsdfg",
              recordedTeamsCount: 234,
            }}
            onClick={() => {}}
            keyTechnologies={null}
            lifeScenarios={null}
          />
        </div>
      </div>
    </div>
  );
};

interface InfoContainerProps {
  title: string;
  value: string;
}

const InfoContainer: FC<InfoContainerProps> = ({ title, value }) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContainerTitle}>{title}</div>
      <div className={styles.infoContainerValue}>{value}</div>
    </div>
  );
};

interface CompetenciesContainerProps {
  title: string;
  values?: any[];
}

const CompetenciesContainer: FC<CompetenciesContainerProps> = ({
  title,
  values,
}) => {
  return (
    <div className={styles.competenciesContainer}>
      <div className={styles.competenciesContainerTitle}>{title}</div>
      <ContentContainer heightPx={290}>
        <div className={styles.competenciesContainerTags}>
          <CatalogTag label="in_progress..." type="lifeScenario" />
          <CatalogTag label="in_progress..." type="keyTechnology" />
        </div>
      </ContentContainer>
    </div>
  );
};
