import {Tabs} from "radix-ui";
import style from './index.module.css';
import clsx from "clsx";
import {CtaBlock} from "../../Blocks/CtaBlock";
import {TypographyTitle} from "../../Atoms/TypographyTitle";
import {CtaButton} from "../../Atoms/CtaButton";
import {useContext} from "react";
import {AppContext} from "../../../App.tsx";
import {CardsList} from "../../Blocks/CardsList";
import {EPageViews} from "../../../features/PageView/pageView.model.ts";

type TProps = {
    className?: string;
}

const Component = ({className}: TProps) => {
    const {data, dataHelper} = useContext(AppContext);
    const isFull = dataHelper.isDataFull;
    return (
        <Tabs.Content className={clsx(className ?? '', style.Home)} value={EPageViews.HOME}>
            <div className={clsx('html_page-row', style.Header)}>
                <TypographyTitle level={1} size={48} className={style.Title}>Applications</TypographyTitle>
                <CtaButton mode='small' />
            </div>
            <div className={clsx('html_page-row', style.Content)}>
                <CardsList dataset={data} />
            </div>
            {!isFull && <CtaBlock />}
        </Tabs.Content>
    );
}

export {Component as PageViewHome};
