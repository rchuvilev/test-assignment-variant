import {CONST_LS_KEY_DATASET, CONST_LS_PREFIX, IS_DEV} from "./consts.ts";
import {TAppState} from "../models/InitialState.ts";

class LocalStorage {
    name: string = 'LocalStorageService';
    storage: Storage;
    propPrefix: string;
    getPropName(propName: string): string {
        return this.propPrefix ? `${this.propPrefix}:${propName}` : propName;
    };

    constructor(lsPropPrefix: string) {
        this.storage = window.localStorage;
        this.propPrefix = lsPropPrefix;
    }

    get(prop: string): string | null {
        return this.storage.getItem(this.getPropName(prop));
    }

    set(prop: string, value: string): void {
        this.storage.setItem(this.getPropName(prop), value);
    }

    getJSON(prop: string): any {
        const propName = this.getPropName(prop);
        const propValue = this.get(propName);
        if (!propValue) return null;
        let output = null;
        try {
            output = JSON.parse(propValue);
        } catch (e) {
            console.error(`@${this.name}: Error reading JSON from localStorage: ${e}`, {[propName]: propValue});
        }
        return output;
    }

    setJSON(prop: string, value: any): void {
        const propName = this.getPropName(prop);
        try {
            this.set(propName, JSON.stringify(value));
        } catch (e) {
            console.error(`@${this.name}: Error saving JSON for localStorage: ${e}`, {[propName]: value});
        }
    }

    saveAppData(value: any): void {
        console.log(`@${this.name}: Saved appState.dataset into localStorage!`);
        this.setJSON(CONST_LS_KEY_DATASET, value);
    }

    getAppData(): TAppState {
        const loadedData = this.getJSON(CONST_LS_KEY_DATASET);
        console.log(`@${this.name}: ${loadedData ? 'Loaded' : 'Failed to load'} appState.dataset into localStorage!`);
        IS_DEV && console.log({loadedData});
        return loadedData;
    }
}

export const localStorageService = new LocalStorage(CONST_LS_PREFIX);
