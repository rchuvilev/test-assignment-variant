import {useState} from "react";
import {emptyData, TData} from "./applicationsData.model.ts";
import {applicationsDataHelper} from "./applicationsData.helper.ts";

export type TApplicationsContext = {
    applicationsList: TData[],
    currApplicationIndex: number,
    currApplicationData: TData,
    doCurrApplicationUpdate: (data: Partial<TData>, doUpdateState: boolean) => void,
    doGotoNextApplication: () => void,
    doGotoXApplicationEdit: (index: number, isSubscriber: boolean) => void,
    doRemoveApplication: () => void,
    isApplicationFull: boolean,
    isApplicationLast: boolean,
};

export type TCheckUserIsSubscriberFunc = (...args: any) => boolean;

const useApplicationsData = (): TApplicationsContext => {
    const storedDataset: TData[] | null = applicationsDataHelper.data;
    const initialDataset: TData[] = storedDataset ?? new Array(applicationsDataHelper.maxDataLength).fill(emptyData) ;
    const getCurrIndex = (dataset: TData[]): number => dataset.findIndex((data: TData) => !data.result) ?? 0; // find first empty application
    const [dataset, setDataset] = useState<TData[]>(initialDataset);
    const [currentApplicationIndex, setCurrentApplicationIndex] = useState<number>(getCurrIndex(dataset));

    const isApplicationFull = !!dataset[currentApplicationIndex].result;
    const isApplicationLast = currentApplicationIndex === applicationsDataHelper.maxDataLength - 1;

    const currDataGet = () => ({...dataset[currentApplicationIndex]});
    const currDataSet = (data: Partial<TData>, doUpdateState: boolean = true) => {
        const currentData = currDataGet();
        const updatedData = {...currentData, ...data};
        const newDataset = [...dataset];
        newDataset[currentApplicationIndex] = updatedData;
        applicationsDataHelper.data = newDataset;
        doUpdateState && setDataset(newDataset);
    }
    const doGotoNextApplication = () => {
        if (!isApplicationFull) return console.log('Application is not full');
        if (isApplicationLast) return console.log('Application is last');
        const nextIndex = currentApplicationIndex + 1;
        const nextApplication = dataset?.[nextIndex];
        if (!nextApplication) return console.log('Application is not found, sorry');
        setCurrentApplicationIndex(nextIndex);
    }
    const doGotoXApplicationEdit = (
        // TODO: use to motivate user to subscribe and work on existing applications without starting new ones from scratch
        index: number,
        isSubscriber: boolean | TCheckUserIsSubscriberFunc
    ) => {
        if (!isSubscriber) return alert('Please subscribe to our product!');
        if (index < 0 || index >= applicationsDataHelper.maxDataLength) return alert(`Couldn't find this application... =(`);
        setCurrentApplicationIndex(index);
    }
    const doRemoveApplication = () => {
        const newDataset = [...dataset].slice(currentApplicationIndex, 1);
        newDataset.push(emptyData);
        setDataset(newDataset);
    }

    const applicationsContext: TApplicationsContext = {
        applicationsList: dataset,
        currApplicationIndex: currentApplicationIndex,
        currApplicationData: currDataGet(),
        doCurrApplicationUpdate: currDataSet,
        doGotoNextApplication,
        doGotoXApplicationEdit,
        doRemoveApplication,
        isApplicationFull,
        isApplicationLast,
    }
    return applicationsContext;
}

export {useApplicationsData};
