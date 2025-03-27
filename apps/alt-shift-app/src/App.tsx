import React from "react";
import './App.css';
import {PageView} from "./components/Views/PageView";
import {HeaderPortal} from "./components/Blocks/HeaderPortal";
import {usePageView} from "./features/PageView/usePageView.tsx";
import {TDataContext, useApplicationsData} from "./features/ApplicationsData/useApplicationsData.tsx";
import {TViewContext} from "./features/PageView/pageView.model.ts";

export type TAppContext = TViewContext & TDataContext;
export const AppContext = React.createContext<TAppContext>(null as never as TAppContext);

function App() {
    const view = usePageView();
    const {data, dataHelper} = useApplicationsData();
    const context: TAppContext = {data, dataHelper, view};
    return (
        <AppContext.Provider value={context}>
            <HeaderPortal/>
            <PageView view={view} />
        </AppContext.Provider>
    )
}

export {App};
