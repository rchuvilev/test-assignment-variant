import {Tabs} from "radix-ui";
import style from './index.module.css';
import {EPageViews} from "../../models/InitialState.ts";

type TPageViewProps = {
    children?: React.ReactNode;
}

const Home = ({children}: TPageViewProps) => {
    const TabsTrigger = ({tabValue, text}: {
        tabValue: EPageViews;
        text: string;
    }) => <Tabs.Trigger value={tabValue}>{text}</Tabs.Trigger>
    return (
        <Tabs.Root className="TabsRoot" defaultValue={EPageViews.HOME}>
            <Tabs.List className="TabsList" aria-label="Manage your account">
                <TabsTrigger tabValue={EPageViews.HOME} text="HOME" />
                <TabsTrigger tabValue={EPageViews.FORM} text="Application 1" />
            </Tabs.List>
            <div>
                {children}
            </div>
        </Tabs.Root>
    );
}

export {Home};
