export const aiRequest = async ({onSuccess, onError, finalCb} : {
    errorCb: (error: any) => void;
    successCb: (result: any) => void;
    finalCb: () => void;
}) => {
    const simulateLongerRequest = () => new Promise(resolve => setTimeout(() => resolve('Response'), 3000));
    const loadAiResponse = async () => 'AAAAAA';
    let result: any = null;
    try {
        result = await Promise.all([
            loadAiResponse(), // goes first for [0] access
            simulateLongerRequest(),
        ]);
        const response = result[0];
        onSuccess(response);
    } catch (error) {
        onError(error);
    } finally {
        finalCb();
    }
};
