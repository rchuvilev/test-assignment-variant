export const IS_DEV: boolean = window.location.hostname === "localhost";
export const CONST_APPLICATIONS_NUMBER_MAX: number = 5;

export const CONST_LS_PREFIX: string = "alt_shift_app";
export const CONST_LS_KEY_DATASET: string = "applicationsData";

export const CONST_CUSTOM_EVENT_NAME_CHANGE_VIEW: string = "update-tab-name";

export const CONST_TEXT_CTA_BUTTON_TEXT: string = "Create New";
export const CONST_TEXT_SUBMIT_BUTTON_TEXT: string = "Generate Now";
export const CONST_TEXT_CARD_ACTION_DELETE: string = "Delete";
export const CONST_TEXT_CARD_ACTION_COPY: string = "Copy to clipboard";
export const CONST_TEXT_FORM_TEXTAREA_MAX_CHARS: number = 1200;
export const CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS: number = 130;

export const CONST_API_URL = IS_DEV
  ? "http://127.0.0.1:3000"
  : "https://varianttest.fermyon.app";
