import clsx from "clsx";

import styles from './index.module.css';

type TProps = {
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

const Component = ({level}: TProps) => {
    const tag = `h${level ?? 1}`;
    const TitleTag = React.createElement(tag);
    return (
        <TitleTag className={clsx(styles.Title, styles[tag])}>
            {children}
        </TitleTag>
    );
}

export {Component as TypographyTitle};
