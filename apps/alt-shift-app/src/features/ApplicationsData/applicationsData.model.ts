export enum EDatasetStatuses {
    STARTED = 'STARTED', // new application, not all fields filled
    FILLED = 'FILLED', // all fields filled, checks passed
    PROCESSED = 'PROCESSED', // got and filled result
}

export type TData = {
    fields: {
        jobTitle: string;
        company: string;
        goodAt: string;
        details: string;
    },
    result: string;
    status: EDatasetStatuses;
};

export type TSetData = (data: TData) => void;
