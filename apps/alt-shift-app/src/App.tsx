import './App.css';
import {PageByTabsView} from "./components/PageView";
import {EPageViews, getInitialDataset, TAppState} from "./models/InitialState.ts";
import {FormTab} from "./components/PageViewForm";
import {HomeTab} from "./components/PageViewHome";
import {HeaderPortal} from "./components/HeaderPortal";
import {AppStateContextProvider} from "./features/AppStateContext/useAppStateContext.tsx";

export const initialState: TAppState = {
    pageView: EPageViews.HOME,
    datasets: getInitialDataset(),
}

function App() {
    return (
        <AppStateContextProvider>
            <HeaderPortal/>
            <PageByTabsView>
                <HomeTab/>
                <FormTab/>
            </PageByTabsView>
        </AppStateContextProvider>
    )
}

export {App};
