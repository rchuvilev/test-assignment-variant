import {CONST_APPLICATIONS_NUMBER_MAX, CONST_LS_KEY_APPLICATIONS_INDEX, CONST_LS_KEY_DATASET} from "../../misc/consts.ts";
import {useState} from "react";
import {TData} from "./applicationsData.model.ts";

const useApplicationIndex = () => {
    const lsKeyIndex = CONST_LS_KEY_APPLICATIONS_INDEX;

    const initialIndexLoaded = localStorage.getItem(lsKeyIndex);
    const initialIndex = initialIndexLoaded ? parseInt(initialIndexLoaded) : 0;

    const [currentApplicationIndex, setCurrentApplicationIndex] = useState<number>(initialIndex);
    const updateIndex = (index: number) => {
        localStorage.setItem(CONST_LS_KEY_APPLICATIONS_INDEX, index.toString());
        setCurrentApplicationIndex(index);
    };

    return {
        index: currentApplicationIndex,
        isFull: currentApplicationIndex >= CONST_APPLICATIONS_NUMBER_MAX,
        isLast: currentApplicationIndex === CONST_APPLICATIONS_NUMBER_MAX - 1,
        isEmpty: currentApplicationIndex === 0,
        setIndex: updateIndex,
    };
}

const useApplicationData = (index: number) => {
    const lsKeyData = (index: number) => `${CONST_LS_KEY_DATASET}_${index}`;
    const initialDataRead = localStorage.getItem(lsKeyData(index));
    const initialData: TData = initialDataRead ? JSON.parse(initialDataRead) : {};
    const [data, setData] = useState<TData>(initialData);
    const updateData = (data: TData) => {
        localStorage.setItem(lsKeyData(index), JSON.stringify(data));
        setData(data);
    };
    const allData = Array.from({length: CONST_APPLICATIONS_NUMBER_MAX}, (_, i) => {
        const dataRead = localStorage.getItem(lsKeyData(i));
        return dataRead ? JSON.parse(dataRead) : {};
    }).filter(item => !!item);
    return {data, setData: updateData, allData};
}

export {useApplicationIndex, useApplicationData};
