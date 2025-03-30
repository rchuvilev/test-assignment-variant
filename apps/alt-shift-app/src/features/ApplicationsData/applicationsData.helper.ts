import {
    CONST_APPLICATIONS_NUMBER_MAX,
    CONST_LS_KEY_DATASET,
    CONST_LS_PREFIX,
} from "../../misc/consts.ts";
import {TData} from "./applicationsData.model.ts";


class ApplicationsDataHelper {
    private storage: Storage = localStorage;
    public maxDataLength: number = CONST_APPLICATIONS_NUMBER_MAX;
    private propPrefix: string = CONST_LS_PREFIX;
    private getPropName(propName: string): string {
        return this.propPrefix ? `${this.propPrefix}:${propName}` : propName;
    };
    private lsKeyDataset: string = this.getPropName(CONST_LS_KEY_DATASET);
    private get key() {
        return this.lsKeyDataset;
    }
    public get data(): TData[] | null {
        try {
            const data = JSON.parse(this.storage.getItem(this.key) ?? JSON.stringify(null));
            return data;
        } catch (e) {
            console.error('Error parsing data from ls', e);
            this.storage.removeItem(this.key);
            return null;
        }
    }
    public set data(data: TData[]) {
        try {
            this.storage.setItem(this.key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving data to ls', e);
        }
    }
    constructor() {
    }
}

const applicationsDataHelper = new ApplicationsDataHelper();

export {applicationsDataHelper}

