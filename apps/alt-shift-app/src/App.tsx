import React from "react";
import './App.css';
import {PageView} from "./components/Views/PageView";
import {HeaderPortal} from "./components/Blocks/HeaderPortal";
import {usePageView} from "./features/PageView/usePageView.tsx";
import {TApplicationsContext, useApplicationsData} from "./features/ApplicationsData/useApplicationsData.tsx";
import {TViewContext} from "./features/PageView/pageView.model.ts";

export type TAppContext = TViewContext & TApplicationsContext;
export const AppContext = React.createContext<TAppContext>(null as never as TAppContext);

function App() {
    const view = usePageView();
    const applicationsContext = useApplicationsData();
    const context: TAppContext = {view, ...applicationsContext};
    return (
        <AppContext.Provider value={context}>
            <HeaderPortal/>
            <PageView view={view} />
        </AppContext.Provider>
    )
}

export {App};
