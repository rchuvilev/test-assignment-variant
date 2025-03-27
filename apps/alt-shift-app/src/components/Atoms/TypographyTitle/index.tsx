import React from "react";
import clsx from "clsx";

import styles from './index.module.css';

type TProps = {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
}

const Component = ({level, children}: TProps) => {
    const tag = `h${level ?? 1}`;
    const TitleTag = (props: any) => React.createElement(tag, props);
    return (
        <TitleTag className={clsx(styles.Title, styles[tag])}>
            {children}
        </TitleTag>
    );
}

export {Component as TypographyTitle};
