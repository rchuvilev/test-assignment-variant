import {Tabs} from "radix-ui";
import style from './index.module.css';
import clsx from "clsx";
import {EPageViews} from "../../../features/PageView/usePageView.tsx";

type TProps = {
    view: EPageViews;
    children: React.ReactNode;
}

const Component = ({view, children}: TProps) => {
    return (
        <Tabs.Root className={clsx(style.PageView)} activationMode="automatic" value={view ?? EPageViews.HOME}>
            {children}
        </Tabs.Root>
    );
}

export {Component as PageView};
