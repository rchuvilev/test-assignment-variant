import './App.css';
import {PageByTabsView} from "./components/PageView";
import {EPageViews, TAppState} from "./models/InitialState.ts";
import {FormTab} from "./components/PageViewForm";
import {HomeTab} from "./components/PageViewHome";
import {HeaderPortal} from "./components/HeaderPortal";
import {AppStateContextProvider} from "./features/AppStateContext/useAppStateContext.tsx";
import {localStorageService} from "./misc/LocalStorageService.ts";
import {Dataset} from "./models/AppData.ts";

export const initialState: TAppState = {
    pageView: EPageViews.HOME,
    datasets: Dataset.getDatasets() ?? [],
}

function App() {
    return (
        <>
            <HeaderPortal/>
            <AppStateContextProvider>
                <PageByTabsView>
                    <HomeTab/>
                    <FormTab/>
                </PageByTabsView>
            </AppStateContextProvider>
        </>
    )
}

export {App};
