import {Tabs} from "radix-ui";
import style from './index.module.css';
import {EPageViews} from "../../models/InitialState.ts";
import clsx from "clsx";

type TPageViewProps = {
    className?: string;
}

const HomeTab = ({className}: TPageViewProps) => {
    return (
        <Tabs.Content className={clsx(className ?? '', style.Home)} value={EPageViews.HOME}>
            <h2>Home tab</h2>
        </Tabs.Content>
    );
}

export {HomeTab};
