import style from './index.module.css';
import clsx from "clsx";
import {CtaBlock} from "../../Blocks/CtaBlock";
import {TypographyTitle} from "../../Atoms/TypographyTitle";
import {CtaButton} from "../../Atoms/CtaButton";
import {useContext} from "react";
import {AppContext} from "../../../App.tsx";
import {CardsList} from "../../Blocks/CardsList";

type TProps = {
    className?: string;
}

const Component = ({className}: TProps) => {
    const {applicationsList, isApplicationFull, doGotoNextApplication} = useContext(AppContext);
    return (
        <section className={clsx(className ?? '', style.Home)}>
            <div className={clsx('html_page-row', style.Header)}>
                <TypographyTitle level={1} size={48} className={style.Title}>Applications</TypographyTitle>
                <CtaButton handleClick={() => doGotoNextApplication()} mode='small' />
            </div>
            <div className={clsx('html_page-row', style.Content)}>
                <CardsList dataset={applicationsList} />
            </div>
            {!isApplicationFull && <CtaBlock />}
        </section>
    );
}

export {Component as PageViewHome};
