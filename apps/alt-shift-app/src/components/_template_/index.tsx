import clsx from "clsx";
import styles from './index.module.css';

type TProps = {
    children?: React.ReactNode;
};

const Component = ({children}: TProps) => {
    return (
        <div className={clsx(styles.Root)}>
            {children}
        </div>
    );
}

export {Component as Template};
