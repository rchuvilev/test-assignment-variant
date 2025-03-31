import { Dispatch, SetStateAction } from "react";

export type TData = {
  Job_title: string;
  Company: string;
  I_am_good_at: string;
  Additional_details: string;
  result: string;
};

const placeholderData: Partial<TData> = {
  Job_title: "Product manager",
  Company: "Apple",
  I_am_good_at: "HTML, CSS and doing things in time",
  Additional_details: "Describe why you are a great fit or paste your bio",
};

export const getPlaceholder = (key: keyof TData) =>
  placeholderData?.[key] ?? "";

export type TSetData = Dispatch<SetStateAction<TData[]>>;

export const emptyData: TData = {
  Job_title: "",
  Company: "",
  I_am_good_at: "",
  Additional_details: "",
  result: "",
};
