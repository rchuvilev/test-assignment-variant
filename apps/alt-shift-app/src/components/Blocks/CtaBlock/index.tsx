import clsx from "clsx";

import styles from './index.module.css';

type TProps = {

}

const CtaBlock = ({}: TProps) => {
    return (
        <section className={clsx('html_page-row', styles.CtaBlock)}>
            <div className={styles.Content}>
                <div className={styles.ContentTop}>

                </div>
                <div className={styles.ContentCounter}>

                </div>
            </div>
        </section>
    );
}

export {CtaBlock};
