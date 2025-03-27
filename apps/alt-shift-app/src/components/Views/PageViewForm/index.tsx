import {Tabs} from "radix-ui";
import style from './index.module.css';
import clsx from "clsx";
import {Form} from "../../Blocks/Form";
import {CtaBlock} from "../../Blocks/CtaBlock";
import {TData, TSetData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {EPageViews} from "../../../features/PageView/usePageView.tsx";

type TProps = {
    data: TData;
    setData: TSetData;
    isAppLast: boolean;
    className?: string;
}

const Component = ({data, setData, isAppLast, className}: TProps) => {
    return (
        <Tabs.Content className={clsx(className ?? '', style.Form)} value={EPageViews.FORM}>
            <div className={'html_page-row'}>
                <Form data={data} setData={setData} />
            </div>
            {isAppLast && <CtaBlock />}
        </Tabs.Content>
    );
}

export {Component as PageViewForm};
