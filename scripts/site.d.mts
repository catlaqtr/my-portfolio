export const PRODUCTION_URL: string;
export const LEGACY_HOSTS: string[];
export function siteSettings(env?: Record<string, string | undefined>): { siteUrl: string; indexable: boolean };
