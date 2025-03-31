import { TData } from "../ApplicationsData/applicationsData.model.ts";
import { getApiKey } from "./aiAPIKey.ts";
import { CONST_API_URL } from "../../misc/consts.ts";

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
  const loadAiResponse = async () =>
    fetch(CONST_API_URL, {
      method: "POST",
    });
  let result: any = null;
  try {
    result = await Promise.all([
      loadAiResponse(), // goes first for [0] access
      simulateLongerRequest(),
    ]);
    const response = result[0];
    onSuccess?.(response);
  } catch (error) {
    onError?.(error);
  } finally {
    onFinally?.();
  }
};
