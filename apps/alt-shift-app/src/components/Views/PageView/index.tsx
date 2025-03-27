import {Tabs} from "radix-ui";
import style from './index.module.css';
import clsx from "clsx";
import {PageViewForm} from "../PageViewForm";
import {PageViewHome} from "../PageViewHome";
import {EPageViews} from "../../../features/PageView/pageView.model.ts";

type TProps = {
    view: EPageViews;
}

const Component = ({view}: TProps) => {
    const ActiveView = () => {
        switch (view) {
            case EPageViews.FORM:
                return <PageViewForm/>;
                break;
            default:
                return <PageViewHome/>;
                break;
        }
    };
    return (
        <Tabs.Root
            className={clsx(style.PageView)}
            activationMode="automatic"
            value={view ?? EPageViews.HOME}
        >
            <ActiveView/>
        </Tabs.Root>
    );
}

export {Component as PageView};
