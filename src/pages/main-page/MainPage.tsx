import { Button, Drawer, Input, TextField } from "@mui/material";
import { FC, useState } from "react";
import { PreviewProjectCard } from "../../components/shared/preview-project-card/PreviewProjectCard";
import styles from "./MainPage.module.scss";

export interface PreviewCard {
  // TO DO when get info from back --> in typing
  tags: string[];
  title: string;
  company: string;
  menthor: string;
  totalTeam: number;
  closedTeam: number;
  students: number;
}

const mockPreviewCard: PreviewCard = {
  tags: ["Инженерный", "WEB"],
  closedTeam: 2,
  company: "Альфа-Банк",
  menthor: "Силачева Яна Валерьевна",
  students: 6,
  title: "Автоматизация процесса питания в школах",
  totalTeam: 3,
};

export const MainPage: FC = () => {
  const [isOpenFiltersBar, setIsOpenFiltersBar] = useState<boolean>(false);
  return (
    <div className={styles.main}>
      <div className={styles.header}>Проекты - 522</div>
      <div className={styles.controls}>
        <TextField variant="outlined" placeholder="Найти проект" fullWidth />
        <Button variant="contained" onClick={() => setIsOpenFiltersBar(true)}>
          Фильтры
        </Button>
      </div>
      <div className={styles.projects}>
        {new Array(12).fill(mockPreviewCard).map((card, index) => (
          <PreviewProjectCard key={index} card={card} />
        ))}
      </div>
      <Drawer
        anchor={"right"}
        open={isOpenFiltersBar}
        onClose={() => setIsOpenFiltersBar(false)}
      >
        <div className={styles.filtersControl}>Фильтры</div>
      </Drawer>
    </div>
  );
};
