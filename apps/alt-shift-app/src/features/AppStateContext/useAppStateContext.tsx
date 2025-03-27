import {createContext, ReactNode, useEffect, useState} from "react";
import {initialState} from "../../App.tsx";
import {localStorageService} from "../../misc/LocalStorageService.ts";
import {TAppState} from "../../models/InitialState.ts";
import {IS_DEV} from "../../misc/consts.ts";
import {a} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

type TAppContext = {
    appState: TAppState;
    setAppState: (state: Partial<TAppState>) => void;
};

const AppStateContext: React.Context<TAppContext> = createContext({
    appState: {} as TAppState,
    setAppState: (state: Partial<TAppState>) => IS_DEV && console.log(`Updating state: ${state}`),
});

let STATE_UPDATE_DEBOUNCE_TO: any = null;
const STATE_UPDATE_DEBOUNCE_MS: number = 10;
const STATE_UPDATE_EVENT_NAME: string = `APP_STATE_UPDATE_${new Date().getTime()}`;

const useAppState = (appStateInitial: TAppState) => {
    let STATE_UPDATE_QUEUE: TAppState = {...appStateInitial};
    const [appState, setAppState] = useState<TAppState>(appStateInitial);
    const stateUpdate = (state: Partial<TAppState>) => window.dispatchEvent(
        new CustomEvent(STATE_UPDATE_EVENT_NAME, {detail: {...state}})
    );
    const stateUpdateHandler = (e: Event) => {
        STATE_UPDATE_QUEUE = {...STATE_UPDATE_QUEUE, ...(e as CustomEvent).detail};
        if (STATE_UPDATE_QUEUE === appState) return;
        if (STATE_UPDATE_DEBOUNCE_TO) clearTimeout(STATE_UPDATE_DEBOUNCE_TO);
        STATE_UPDATE_DEBOUNCE_TO = setTimeout(() => {
            const updatedState = {...appState, ...STATE_UPDATE_QUEUE};
            localStorageService.saveAppData(updatedState);
            setAppState(updatedState);
        }, STATE_UPDATE_DEBOUNCE_MS);
    }
    useEffect(() => {
        stateUpdate(appState); // initial state update
        window.addEventListener(STATE_UPDATE_EVENT_NAME, stateUpdateHandler);
        return () => {
            window.removeEventListener(STATE_UPDATE_EVENT_NAME, stateUpdateHandler);
        }
    }, []);
    return {appState, setAppState};
}

const AppStateContextProvider = ({children}: {children?: ReactNode}) => {
    const {appState, setAppState} = useAppState(initialState);
    return children && (
        <AppStateContext.Provider value={{appState, setAppState}}>
            {children}
        </AppStateContext.Provider>
    );
};

export {AppStateContext, type TAppContext, useAppState, AppStateContextProvider};
