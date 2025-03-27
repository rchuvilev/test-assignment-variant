import {Tabs} from "radix-ui";
import style from './index.module.css';
import {EPageViews} from "../../../models/InitialState.ts";
import clsx from "clsx";
import {CtaBlock} from "../../Blocks/CtaBlock";

type TPageViewProps = {
    isFullData: boolean;
    className?: string;
}

const HomeTab = ({isFullData, className}: TPageViewProps) => {
    return (
        <Tabs.Content className={clsx(className ?? '', style.Home)} value={EPageViews.HOME}>
            <h2>Home tab</h2>
            {!isFullData && <CtaBlock />}
        </Tabs.Content>
    );
}

export {HomeTab};
