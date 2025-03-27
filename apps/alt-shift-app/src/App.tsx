import './App.css';
import {PageByTabsView} from "./components/Views/PageView";
import {EPageViews, getInitialDataset, TAppState} from "./models/InitialState.ts";
import {FormTab} from "./components/Views/PageViewForm";
import {HomeTab} from "./components/Views/PageViewHome";
import {HeaderPortal} from "./components/Blocks/HeaderPortal";
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
