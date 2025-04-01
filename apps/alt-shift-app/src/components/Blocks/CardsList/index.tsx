import clsx from "clsx";
import styles from "./index.module.css";
import { TData } from "../../../features/ApplicationsData/applicationsData.model.ts";
import { utilComponentKey } from "../../../misc/utilComponentKey.ts";
import { Card } from "../../Atoms/Card";
import { useResize } from "../../../misc/useResize.tsx";
import { Carousel } from "ui-kit";

type TProps = {
  dataset: TData[];
};

const Component = ({ dataset }: TProps) => {
  const size = useResize();
  const CardsList = ({ isCarousel }: { isCarousel?: boolean }) => (
    <>
      {dataset.map((data: TData, index) => (
        <>
          <Card
            key={utilComponentKey("CardsList", index)}
            cardText={data?.result}
            maxHeightPx={240}
            passedIndex={index + 1}
            className={clsx({ embla__slide: isCarousel })}
          />
        </>
      ))}
    </>
  );
  const isMobile = size.width <= 768;
  return dataset?.length && isMobile ? (
    <Carousel className={styles.MobileCarousel}>
      <CardsList isCarousel={true} />
    </Carousel>
  ) : (
    <div className={clsx(styles.CardsList)}>
      <CardsList />
    </div>
  );
};

export { Component as CardsList };
