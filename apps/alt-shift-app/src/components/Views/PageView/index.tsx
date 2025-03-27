import {Tabs} from "radix-ui";
import style from './index.module.css';
import {EPageViews} from "../../../models/InitialState.ts";
import {useContext, useEffect} from "react";
import {AppStateContext} from "../../../features/AppStateContext/useAppStateContext.tsx";
import clsx from "clsx";

type TPageViewProps = {
    children?: React.ReactNode;
}

export const EVENT_TAB_SET_NAME = 'update-tab-name';

const PageByTabsView = ({children}: TPageViewProps) => {
    const {appState, setAppState} = useContext(AppStateContext);
    const triggerTabChange = (ev: CustomEvent) => {
        const pageView = ev?.detail as EPageViews;
        pageView && setAppState({pageView});
    };
    useEffect(() => {
        window.addEventListener(EVENT_TAB_SET_NAME as any, triggerTabChange);
        return () => {
            window.removeEventListener(EVENT_TAB_SET_NAME as any, triggerTabChange);
        };
    }, []);
    return (
        <Tabs.Root className={clsx(style.PageView)} activationMode="automatic" value={appState.pageView ?? EPageViews.HOME}>
            {children}
        </Tabs.Root>
    );
}

export {PageByTabsView};
