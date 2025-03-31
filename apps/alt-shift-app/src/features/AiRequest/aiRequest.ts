import { TData } from "../ApplicationsData/applicationsData.model.ts";

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
  const loadAiResponse = async () => Object.values(reqData).join("\n");
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
