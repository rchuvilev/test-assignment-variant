import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./index.module.css";

type TProps = {
  className?: string;
  children?: React.ReactNode;
};

const Component = ({ className, children }: TProps) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    // loop: true,
    containScroll: "trimSnaps",
    align: "start",
  });

  return (
    <div
      ref={emblaRef}
      className={clsx("embla", styles.Carousel, className ?? "")}
    >
      <div className={clsx("embla__container", styles.Container)}>
        {children}
      </div>
    </div>
  );
};

export { Component as Carousel };
