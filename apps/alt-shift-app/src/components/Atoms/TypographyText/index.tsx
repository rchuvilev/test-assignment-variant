import clsx from "clsx";

import styles from "./index.module.css";
import { CSSProperties } from "react";

type TProps = {
  size: "xs" | "sm" | "md" | 14 | 16 | 18;
  color?: string;
  className?: string;
  linesLimit?: number;
  blurredEnd?: boolean;
  children: React.ReactNode;
};

const Component = ({
  size,
  color,
  className,
  linesLimit,
  blurredEnd,
  children,
}: TProps) => {
  return (
    <span
      className={clsx(
        `font-typo`,
        `font-${size}`,
        styles.Text,
        className ?? "",
        blurredEnd ? "__blurred-end" : "",
      )}
      style={{
        ...(color ? ({ ["--text-color"]: color } as CSSProperties) : {}),
        ...(linesLimit
          ? ({ ["--lines-limit"]: linesLimit } as CSSProperties)
          : {}),
      }}
    >
      {children}
    </span>
  );
};

export { Component as TypographyText };
