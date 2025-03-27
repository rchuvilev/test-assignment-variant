import {Tabs} from "radix-ui";
import style from './index.module.css';
import {EPageViews} from "../../../models/InitialState.ts";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {CtaButton} from "ui-kit";
import {CONST_TEXT_CTA_BUTTON_TEXT, consts} from "../../../misc/consts.ts";
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
            <Tabs.List className="TabsList" aria-label="Manage your account">
                {Object.values({...EPageViews}).map((name: string) => {
                    const componentName = "PageByTabsView-Trigger";
                    return <TabsTrigger
                        tabValue={name as EPageViews}
                        onClick={() => setAppState({...appState, pageView: name as EPageViews})}
                        key={utilComponentKey(componentName, name)}
                    />
                })}
            </Tabs.List>
            {children}
        </Tabs.Root>
    );
}

const TabsTrigger = ({tabValue, text, onClick}: {
    tabValue: EPageViews;
    text?: string;
    onClick?: () => void;
} & React.ComponentProps<any>) => (
    <Tabs.Trigger value={tabValue} asChild={true} onClick={() => onClick?.()}>
        <CtaButton>{text ?? CONST_TEXT_CTA_BUTTON_TEXT}</CtaButton>
    </Tabs.Trigger>
);

export {PageByTabsView, TabsTrigger};
