import {useEffect, useRef, useState} from "react";
import {emptyData, TData} from "./applicationsData.model.ts";
import {dataHelper} from "./applicationsData.helper.ts";
import {IS_DEV} from "../../misc/consts.ts";

export type TDataContext = {
    data: TData[];
    dataHelper: typeof dataHelper;
}

const useApplicationsData = (): TDataContext => {
    const helper = useRef(dataHelper);
    const [data, setData] = useState<TData[]>(helper.current.data ?? [emptyData]);
    useEffect(() => {
        dataHelper.init(setData);
    }, []);
    useEffect(() => {
        IS_DEV && console.log(`@useApplicationsData - updated state:`, data);
    }, [data]);
    const dataContext: TDataContext = {
        data,
        dataHelper: helper.current,
    }
    return dataContext;
}

export {useApplicationsData};
