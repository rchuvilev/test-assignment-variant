import {IS_DEV} from "./consts.ts";

export const utilDevLogger = (...messages: Array<string | any>) => IS_DEV && console.log(...messages);
