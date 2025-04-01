import clsx from "clsx";
import styles from "./index.module.css";
import { utilComponentKey } from "../../../misc/utilComponentKey.ts";
import { useContext } from "react";
import { AppContext } from "../../../App.tsx";
import { CONST_APPLICATIONS_NUMBER_MAX } from "../../../misc/consts.ts";

type TProps = {
  isCta?: boolean;
};

const Component = ({ isCta }: TProps) => {
  const { currApplicationIndex, isApplicationLast } = useContext(AppContext);
  const maxApplications = CONST_APPLICATIONS_NUMBER_MAX;
  const isEmpty = currApplicationIndex === 0;
  const isFull = isApplicationLast;
  const count = isApplicationLast ? maxApplications : currApplicationIndex;
  const counterText = !isCta
    ? `${count} / ${maxApplications} applications generated`
    : `${count} out of ${maxApplications}`;
  return (
    <div
      className={clsx(styles.CounterContainer, {
        [styles.__empty]: isEmpty,
        [styles.__cta]: isCta,
      })}
    >
      <p className={clsx(styles.CounterText, "font-m")}>{counterText}</p>
      {isFull && (
        <img
          className={styles.FullIcon}
          src={"./icons/checkbox.svg"}
          alt="Full"
        />
      )}
      <div className={styles.CounterDots}>
        {new Array(maxApplications).fill(null).map((_, i) => (
          <div
            key={utilComponentKey("HeaderApplicationsCounter", i)}
            className={clsx(styles.CounterDot, {
              [styles.CounterDotActive]: count > i || count === maxApplications,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export { Component as Counter };
