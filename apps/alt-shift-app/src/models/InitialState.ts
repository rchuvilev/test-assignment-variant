import {TDataset} from "./AppData.ts";

export enum EPageViews {
    HOME = 'Home',
    FORM = 'Create New',
}

export interface TAppState {
    pageView: EPageViews;
    datasets: TDataset[];
}
