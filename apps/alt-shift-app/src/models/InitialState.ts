import {TDataset} from "./AppData.ts";
import {localStorageService} from "../misc/LocalStorageService.ts";

export enum EPageViews {
    HOME = 'Home',
    FORM = 'Create New',
}

export interface TAppState {
    pageView: EPageViews;
    datasets: TDataset[];
}

export const getInitialDataset = () => localStorageService.getAppData()?.datasets ?? [];
