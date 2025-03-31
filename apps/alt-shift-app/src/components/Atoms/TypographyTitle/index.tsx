import React, { CSSProperties } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

type THLevels = 1 | 2; // | 3 | 4 | 5 | 6; - not used in this project
type THSizes = 36 | 48;

type TProps = {
  level: THLevels;
  size?: THSizes;
  className?: string;
  color?: string;
  children: React.ReactNode;
};

const Component = ({ level, size, className, color, children }: TProps) => {
  const tag = `h${level ?? 1}`;
  const TitleTag = (props: any) => React.createElement(tag, props);
  return (
    <TitleTag
      className={clsx(
        `font-typo`,
        size ? `font-${size}` : "",
        `font-${level}`,
        `__bold`,
        styles.Title,
        className ?? "",
      )}
      style={color ? ({ ["--text-color"]: color } as CSSProperties) : {}}
    >
      {children}
    </TitleTag>
  );
};

export { Component as TypographyTitle };
