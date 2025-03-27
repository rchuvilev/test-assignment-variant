import {
    CONST_APPLICATIONS_NUMBER_MAX,
    CONST_LS_KEY_DATASET,
    CONST_LS_PREFIX,
} from "../../misc/consts.ts";
import {emptyData, TData, TSetData} from "./applicationsData.model.ts";


class ApplicationsDataHelper {
    private storage: Storage = localStorage;
    private setData: any = () => {};
    private maxDataLength: number = CONST_APPLICATIONS_NUMBER_MAX;
    private propPrefix: string = CONST_LS_PREFIX;
    private getPropName(propName: string): string {
        return this.propPrefix ? `${this.propPrefix}:${propName}` : propName;
    };
    private lsKeyDataset: string = this.getPropName(CONST_LS_KEY_DATASET);
    private getItem(prop: string): string | null {
        return this.storage.getItem(prop);
    }
    private setItem(prop: string, value: string): void {
        this.storage.setItem(prop, value);
    }
    private get key() {
        return this.lsKeyDataset;
    }
    public get data(): TData[] {
        const initialData = JSON.parse(this.getItem(this.key) ?? JSON.stringify(null));
        const data = initialData?.length ? initialData : [emptyData];
        return data;
    }
    public set data(data: TData[]) {
        this.setItem(this.key, JSON.stringify(data));
        this.setData(data);
    }
    public init(setData: TSetData) {
        this.setData = () => setData(this.data);
        this.setData(this.data);
        return this;
    }

    // UTILITY GETTERS
    get isLastItem(): boolean {
        return this.data?.length === this.maxDataLength;
    }
    get isCurrReady(): boolean {
        return Boolean(this.currentData?.result);
    }
    get isDataFull(): boolean {
        return this.isLastItem && Boolean(this.currentData?.result);
    }
    get currentData(): TData {
        return this.data?.[this.data?.length - 1];
    }
    public saveCurrentData(data: TData): void {
        const oldData = [...this.data];
        const length = oldData.length;
        const newData = [...oldData.slice(0, length - 1), data];
        this.data = newData;
    }
    public saveCurrentDataField(field: string, value: string): void {
        this.saveCurrentData({
            ...this.currentData,
            ...{fields: {
                    ...(this.currentData.fields ?? {}),
                    [field]: value,
                }},
        });
    }
    public saveCurrentDataResult(result: string): void {
        this.saveCurrentData({...this.currentData, result});
    }
    // CONSTRUCTOR
    constructor() {
    }
}

const dataHelper = new ApplicationsDataHelper();

export {dataHelper}

