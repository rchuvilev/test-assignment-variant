export function (hostname: string) {
    const API_KEY = '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';
    return hostname.includes('rchuvilev.github.io') || hostname.includes('localhost') ? API_KEY : null;
}
