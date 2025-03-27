import {Tabs} from "radix-ui";
import style from './index.module.css';
import clsx from "clsx";
import {Form} from "../../Blocks/Form";
import {CtaBlock} from "../../Blocks/CtaBlock";
import {Card} from "../../Atoms/Card";
import {useContext} from "react";
import {AppContext} from "../../../App.tsx";
import {EPageViews} from "../../../features/PageView/pageView.model.ts";

type TProps = {}

const Component = ({}: TProps) => {
    const {dataHelper} = useContext(AppContext);
    const currData = dataHelper.currentData;
    if (!currData) return null;
    const fields = currData?.fields;
    const cardText = currData?.result;
    const isLast = dataHelper.isLastItem;
    return (
        <Tabs.Content className={clsx(style.Form)} value={EPageViews.FORM}>
            <div className={'html_page-row'}>
                <Form fieldsData={fields} />
                <Card cardText={cardText} />
            </div>
            {!isLast && <CtaBlock />}
        </Tabs.Content>
    );
}

export {Component as PageViewForm};
