import { TData } from "../features/ApplicationsData/applicationsData.model.ts";
import spinJson from "../../../spin-api/openai-request/package.json";

export const IS_DEV: boolean = window.location.hostname === "localhost";
export const CONST_APPLICATIONS_NUMBER_MAX: number = 5;

export const CONST_LS_PREFIX: string = "alt_shift_app";
export const CONST_LS_KEY_DATASET: string = "applicationsData";

export const CONST_CUSTOM_EVENT_NAME_CHANGE_VIEW: string = "update-tab-name";

export const CONST_TEXT_CTA_BUTTON_TEXT: string = "Create New";
export const CONST_TEXT_SUBMIT_BUTTON_TEXT: string = "Generate Now";
export const CONST_TEXT_SUBMIT_BUTTON_DONE_TEXT: string = "Try Again";
export const CONST_TEXT_CARD_ACTION_DELETE: string = "Delete";
export const CONST_TEXT_CARD_ACTION_COPY: string = "Copy to clipboard";
export const CONST_TEXT_FORM_TEXTAREA_MAX_CHARS: number = 1200;
export const CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS: number = 130;

export const CONST_API_URL = IS_DEV
  ? "http://localhost:3000"
  : `https://${spinJson.name}.fermyon.app`;

export const CONST_FALLBACK_LETTER_TEMPLATE = ({
  Company,
  Job_title,
  I_am_good_at,
  Additional_details,
}: TData) =>
  `
        Dear ${Company} Team,
        I am writing to express my interest in the ${Job_title} position.
        My experience in the realm combined with my skills in ${I_am_good_at} make me a strong candidate for this role.
        ${Additional_details}
        I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.
        Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further."
`
    .trim()
    .split("\n")
    .filter((line) => !!line.trim())
    .map((line) => line.trim())
    .join(`\n\t`);
