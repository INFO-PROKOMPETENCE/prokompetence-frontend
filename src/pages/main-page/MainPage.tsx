import {
  Autocomplete,
  Button,
  Drawer,
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  TextField,
  useRadioGroup,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Hidder } from "../../components/shared/hidder";
import { PreviewProjectCard } from "../../components/shared/preview-project-card/PreviewProjectCard";
import {
  getKeyTechnologiesAsync,
  getLifeScenariosAsync,
} from "../../redux-store/actions/catalog.action";
import {
  getProjectsAsync,
  PROJECT_ACTIONS,
} from "../../redux-store/actions/project.action";
import {
  isLoadingByKeysSelector,
  projectsSelector,
} from "../../redux-store/selectors";
import {
  keyTechnologiesSelector,
  lifeScenariosSelector,
} from "../../redux-store/selectors/catalog.selector";
import { useAppDispatch } from "../../redux-store/store-manager";
import { useTitle } from "../../utils";
import styles from "./MainPage.module.scss";

export const MainPage: FC = () => {
  useTitle("Каталог");
  const [isOpenFiltersBar, setIsOpenFiltersBar] = useState<boolean>(false);
  const projects = useSelector(projectsSelector);
  const isLoadingProjects = useSelector(
    isLoadingByKeysSelector([PROJECT_ACTIONS.GET_PROJECTS])
  );
  const keyTechnologies = useSelector(keyTechnologiesSelector);
  const lifeScenarios = useSelector(lifeScenariosSelector);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectsAsync());
    if (!keyTechnologies) {
      dispatch(getKeyTechnologiesAsync());
    }
    if (!lifeScenarios) {
      dispatch(getLifeScenariosAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const goToProject = useCallback(
    (projectId: string) => {
      navigate(`/projects/${projectId}`);
    },
    [navigate]
  );

  return (
    <div className={styles.main}>
      <div className={styles.header}>Проекты - {projects.totalCount}</div>
      <div className={styles.controls}>
        <TextField variant="outlined" placeholder="Найти проект" fullWidth />
        <Button variant="contained" onClick={() => setIsOpenFiltersBar(true)}>
          Фильтры
        </Button>
      </div>
      <div className={styles.projects}>
        <Hidder isLoading={isLoadingProjects}>
          {projects.items.map((project) => (
            <PreviewProjectCard
              key={project.id}
              card={project}
              keyTechnologies={keyTechnologies}
              lifeScenarios={lifeScenarios}
              onClick={() => goToProject(project.id)}
            />
          ))}
        </Hidder>
      </div>
      <Drawer
        anchor={"right"}
        open={isOpenFiltersBar}
        onClose={() => setIsOpenFiltersBar(false)}
      >
        <div className={styles.filtersControl}>
          <div className={styles.title}>Фильтры</div>
          <div className={styles.filters}>
            <div className={styles.radio}>
              <RadioGroup name="use-radio-group" defaultValue="first">
                <MyFormControlLabel
                  value="first"
                  label="Показать закрытые проекты"
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value="second"
                  label="Показать заполненные проекты"
                  control={<Radio />}
                />
              </RadioGroup>
            </div>
            <div className={styles.filter}>
              <div className={styles.filterTitle}>Тип проекта</div>
              <Autocomplete
                multiple
                id="tags-standard"
                options={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Тип проекта"
                  />
                )}
                freeSolo
              />
            </div>
            <div className={styles.filter}>
              <div className={styles.filterTitle}>Заказчик</div>
              <Autocomplete
                multiple
                id="tags-standard"
                options={[]}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Заказчик" />
                )}
                freeSolo
              />
              <div className={styles.filter}>
                <div className={styles.filterTitle}>Ключевая технология</div>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Ключевая технология"
                    />
                  )}
                  freeSolo
                />
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button variant="contained" fullWidth>
              Применить
            </Button>
            <Button variant="contained" fullWidth color="secondary">
              Сбросить
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const MyFormControlLabel = (props: FormControlLabelProps) => {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <FormControlLabel checked={checked} {...props} />;
};
