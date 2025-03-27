import {Tabs} from "radix-ui";
import style from './index.module.css';
import {EPageViews} from "../../../models/InitialState.ts";
import clsx from "clsx";
import {Form} from "../../Blocks/Form";
import {CtaBlock} from "../../Blocks/CtaBlock";
import {useContext} from "react";
import {AppStateContext} from "../../../features/AppStateContext/useAppStateContext.tsx";
import {EDatasetStatuses, TDataset} from "../../../models/AppData.ts";
import {CONST_APPLICATIONS_NUMBER_MAX} from "../../../misc/consts.ts";

type TPageViewProps = {
    className?: string;
}

const FormTab = ({className}: TPageViewProps) => {
    const {appState, setAppState} = useContext(AppStateContext);
    const datasets: TDataset[] = appState?.datasets;
    const data: TDataset = datasets?.[datasets.length - 1] ?? null;
    return (
        <Tabs.Content className={clsx(className ?? '', style.Form)} value={EPageViews.FORM}>
            <div className={'html_page-row'}>
                <Form data={data} setData={setData} />
                <AppCard />
            </div>
            <div className={'html_page-row'}>
                <CtaBlock />
            </div>
        </Tabs.Content>
    );
}

export {FormTab};
