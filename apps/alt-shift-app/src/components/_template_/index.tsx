import clsx from "clsx";
import styles from './index.module.css';

type TProps = {
}

const Component = ({}: TProps) => {
    return (
        <div className={clsx(styles.Root)}>
            {children}
        </div>
    );
}

export {Component as Template};
