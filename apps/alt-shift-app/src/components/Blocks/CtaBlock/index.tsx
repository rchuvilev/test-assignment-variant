import clsx from "clsx";

import styles from "./index.module.css";
import { TypographyTitle } from "../../Atoms/TypographyTitle";
import { TypographyText } from "../../Atoms/TypographyText";
import { CtaButton } from "../../Atoms/CtaButton";

type TProps = {};

const CtaBlock = ({}: TProps) => {
  return (
    <section className={clsx("html_page-row", styles.CtaBlock)}>
      <div className={styles.Content}>
        <div className={styles.ContentTop}>
          <TypographyTitle
            className={styles.Title}
            level={1}
            size={36}
            color={"#101828"}
          >
            Hit yoar goal
          </TypographyTitle>
          <TypographyText
            className={styles.Message}
            size={18}
            color={"var(--font-color-gray)"}
          >
            Generate and send out couple more job applications today to get
            hired faster
          </TypographyText>
          <CtaButton />
        </div>
        <div className={styles.ContentCounter}></div>
      </div>
    </section>
  );
};

export { CtaBlock };
