import {Dispatch, SetStateAction} from "react";

export type TData = {
    fields: {
        Job_title: string;
        Company: string;
        I_am_good_at: string;
        Additional_details: string;
    },
    result: string;
};

export type TSetData = Dispatch<SetStateAction<TData[]>>

export const emptyData: TData = {
    fields: {
        Job_title: '',
        Company: '',
        I_am_good_at: '',
        Additional_details: '',
    },
    result: '',
};
