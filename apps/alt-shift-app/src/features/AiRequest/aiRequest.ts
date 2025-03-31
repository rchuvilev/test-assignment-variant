import { TData } from "../ApplicationsData/applicationsData.model.ts";
import {
  CONST_API_URL,
  CONST_FALLBACK_LETTER_TEMPLATE,
} from "../../misc/consts.ts";

export const aiRequest = async ({
  reqData,
  onSuccess,
  onError,
  onFinally,
}: {
  reqData: TData;
  onSuccess: (result: any) => void;
  onError: (error: any) => void;
  onFinally: () => void;
}) => {
  const simulateLongerRequest = () =>
    new Promise((resolve) => setTimeout(() => resolve("Response"), 3000));
  console.log("aiRequest", reqData);
  const loadAiResponse = async () => {
    const body = JSON.stringify({
      ...reqData,
    });
    const res = await fetch(CONST_API_URL, {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    }).catch(console.error);
    return res;
  };
  let result: any = null;
  try {
    result = await Promise.all([
      loadAiResponse(), // goes first for [0] access
      simulateLongerRequest(),
    ]);
    const response = result?.[0];
    const responseMsg = await response?.text();
    const responseText =
      responseMsg?.msg || CONST_FALLBACK_LETTER_TEMPLATE(reqData);
    onSuccess?.(responseText);
  } catch (error) {
    console.error("aiRequest error", error);
    onError?.(error);
  } finally {
    onFinally?.();
  }
};
