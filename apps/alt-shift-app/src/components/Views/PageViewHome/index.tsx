import {Tabs} from "radix-ui";
import style from './index.module.css';
import clsx from "clsx";
import {CtaBlock} from "../../Blocks/CtaBlock";
import {TData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {EPageViews} from "../../../features/PageView/usePageView.tsx";
import {TypographyTitle} from "../../Atoms/TypographyTitle";

type TProps = {
    data: TData;
    isAppFull: boolean;
    className?: string;
}

const Component = ({isAppFull, className}: TProps) => {
    return (
        <Tabs.Content className={clsx(className ?? '', style.Home)} value={EPageViews.HOME}>
            <div className={clsx('html_page-row', style.Header)}>
                <TypographyTitle level={1} size={48} className={style.Title}>Applications</TypographyTitle>
            </div>
            <div className={clsx('html_page-row', style.Content)}>
                {/*<CardList data={data} />*/}
            </div>
            {!isAppFull && <CtaBlock />}
        </Tabs.Content>
    );
}

export {Component as PageViewHome};
