import React from "react";
import './App.css';
import {PageView} from "./components/Views/PageView";
import {HeaderPortal} from "./components/Blocks/HeaderPortal";
import {EPageViews, usePageView} from "./features/PageView/usePageView.tsx";
import {useApplicationData, useApplicationIndex} from "./features/ApplicationsData/useApplicationsData.tsx";
import {PageViewForm} from "./components/Views/PageViewForm";
import {PageViewHome} from "./components/Views/PageViewHome";
import {TData} from "./features/ApplicationsData/applicationsData.model.ts";

export type TAppContext = {
    index: number;
    setIndex: (index: number) => void;
    isFull: boolean;
    isLast: boolean;
    isEmpty: boolean;
    data: TData;
    allData: TData[];
    setData: (data: TData) => void;
}
export const AppContext = React.createContext<TAppContext>(null as never as TAppContext);

function App() {
    const view = usePageView();
    const {index, setIndex, isFull, isLast, isEmpty} = useApplicationIndex();
    const {data, setData, allData} = useApplicationData(index);
    const context = {view, index, setIndex, isFull, isLast, isEmpty, data, allData, setData};
    return (
        <AppContext.Provider value={context}>
            <HeaderPortal />
            <PageView view={view}>
                {view === EPageViews.FORM ? (
                    <PageViewForm data={data} setData={setData} isAppLast={isLast}/>
                ) : (
                    <PageViewHome data={data} isAppFull={isFull}/>
                )}
            </PageView>
        </AppContext.Provider>
    )
}

export {App};
