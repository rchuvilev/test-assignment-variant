import { useState } from "react";
import { emptyData, TData } from "./applicationsData.model.ts";
import { applicationsDataHelper } from "./applicationsData.helper.ts";

export type TApplicationsContext = {
  applicationsList: TData[];
  currApplicationIndex: number;
  currApplicationData: TData;
  doCurrApplicationUpdate: (
    data: Partial<TData>,
    doUpdateState: boolean,
  ) => void;
  doGotoNextApplication: () => void;
  doGotoXApplicationEdit: (index: number, isSubscriber: boolean) => void;
  doRemoveApplication: (index: number) => void;
  isApplicationFull: boolean;
  isApplicationLast: boolean;
};

export type TCheckUserIsSubscriberFunc = (...args: any) => boolean;

const useApplicationsData = (): TApplicationsContext => {
  const storedDataset: TData[] | null = applicationsDataHelper.data;
  const initialDataset: TData[] =
    storedDataset ??
    new Array(applicationsDataHelper.maxDataLength).fill(emptyData);
  const getCurrIndex = (dataset: TData[]): number => {
    const foundIndex = dataset.findIndex((data: TData) => !data.result);
    return foundIndex >= 0
      ? foundIndex
      : applicationsDataHelper.maxDataLength - 1;
  };
  const [dataset, setDataset] = useState<TData[]>(initialDataset);
  const [currentApplicationIndex, setCurrentApplicationIndex] =
    useState<number>(getCurrIndex(dataset));

  const isApplicationFull = !!dataset[currentApplicationIndex]?.result;
  const isApplicationLast =
    currentApplicationIndex === applicationsDataHelper.maxDataLength - 1 &&
    isApplicationFull;

  const currDataGet = () => ({ ...dataset[currentApplicationIndex] });
  const currDataSet = (
    data: Partial<TData>,
    doUpdateState: boolean = true,
    gotoNext: boolean = false,
  ) => {
    const currentData = currDataGet();
    const updatedData = { ...currentData, ...data };
    const newDataset = [...dataset];
    newDataset[currentApplicationIndex] = updatedData;
    applicationsDataHelper.data = newDataset;
    (doUpdateState || gotoNext) && setDataset(newDataset);
    gotoNext && doGotoNextApplication();
  };
  const doGotoNextApplication = () => {
    if (!isApplicationFull) return console.log("Application is not full");
    if (isApplicationLast) return console.log("Application is last");
    const nextIndex = currentApplicationIndex + 1;
    if (nextIndex >= applicationsDataHelper.maxDataLength)
      return console.log("Last application filled!");
    const nextApplication = dataset?.[nextIndex];
    if (!nextApplication) return console.log("Application is not found, sorry");
    applicationsDataHelper.data = [...dataset];
    setCurrentApplicationIndex(
      currentApplicationIndex >= applicationsDataHelper.maxDataLength - 1
        ? currentApplicationIndex
        : nextIndex,
    );
  };
  const doGotoXApplicationEdit = (
    // TODO: use to motivate user to subscribe and work on existing applications without starting new ones from scratch
    index: number,
    isSubscriber: boolean | TCheckUserIsSubscriberFunc,
  ) => {
    if (!isSubscriber) return alert("Please subscribe to our product!");
    if (index < 0 || index >= applicationsDataHelper.maxDataLength) {
      return alert(`Couldn't find this application... =(`);
    }
    setCurrentApplicationIndex(index);
  };
  const doRemoveApplication = (index: number) => {
    const newDataset = [...dataset];
    newDataset.splice(index, 1);
    newDataset.push(emptyData);
    applicationsDataHelper.data = newDataset;
    setDataset(newDataset);
    setCurrentApplicationIndex(getCurrIndex(newDataset));
  };

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
  };
  return applicationsContext;
};

export { useApplicationsData };
