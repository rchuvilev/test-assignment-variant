import {CONST_LS_PREFIX} from "./consts.ts";

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

    remove(prop: string): void {
        this.storage.removeItem(this.getPropName(prop));
    }

    update(prop: string, value: string): void {
        this.set(this.getPropName(prop), value);
    }

    clear(): void {
        this.storage.clear();
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
}

export const localStorageService = new LocalStorage(CONST_LS_PREFIX);
