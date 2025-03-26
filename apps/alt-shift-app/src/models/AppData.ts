import {localStorageService} from "../misc/LocalStorageService.ts";
import {CONST_LS_KEY_DATASET} from "../misc/consts.ts";

export type TDataset = {};

export class Dataset {
    static getDatasets(setState: IAppState): TDataset[] {
        localStorageService.getJSON(CONST_LS_KEY_DATASET) ?? [];
    }

    static addDataset(dataset: TDataset): void {
        localStorageService.setJSON(CONST_LS_KEY_DATASET, dataset)
    }

    static removeDataset(dataset: TDataset) {
        localStorageService.remove(CONST_LS_KEY_DATASET);
    }

    static updateDataset() {

    }
}
