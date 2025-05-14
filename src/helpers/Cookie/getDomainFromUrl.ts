export function getDomainFromUrl(url: string): string | undefined {
    try {
        const { hostname } = new URL(url);
        return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
    } catch {
        return undefined;
    }
}
