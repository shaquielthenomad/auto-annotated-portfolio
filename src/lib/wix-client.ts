import { createClient, WixClient } from '@wix/sdk';
import { OAuthStrategy } from '@wix/sdk';
import { stores } from '@wix/stores';
import { site } from '@wix/site-stores';
import { account } from '@wix/account';

// Improved type safety for environment variables
function getRequiredEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

// Safely log environment variables without exposing sensitive data
function logEnvConfig(): void {
    if (process.env.NODE_ENV !== 'production') {
        console.log({
            clientIdPresent: !!process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
            siteIdPresent: !!process.env.NEXT_PUBLIC_WIX_SITE_ID,
            apiKeyPresent: !!process.env.NEXT_PUBLIC_WIX_API_KEY,
            accountIdPresent: !!process.env.NEXT_PUBLIC_WIX_ACCOUNT_ID
        });
    }
}

// Declare a variable to store the client
let _wixClient: WixClient | null = null;

// Initialize Wix client with comprehensive error handling
export function initializeWixClient(): WixClient {
    // Prevent re-initialization
    if (_wixClient) return _wixClient;

    try {
        logEnvConfig();
        
        _wixClient = createClient({
            modules: [stores, site, account],
            auth: OAuthStrategy({
                clientId: getRequiredEnvVar('NEXT_PUBLIC_WIX_CLIENT_ID'),
                tokens: {
                    accessToken: getRequiredEnvVar('NEXT_PUBLIC_WIX_API_KEY'),
                    refreshToken: getRequiredEnvVar('NEXT_PUBLIC_WIX_API_KEY')
                }
            }),
            site: {
                id: getRequiredEnvVar('NEXT_PUBLIC_WIX_SITE_ID')
            },
            account: {
                id: getRequiredEnvVar('NEXT_PUBLIC_WIX_ACCOUNT_ID')
            }
        });

        return _wixClient;
    } catch (error) {
        console.error('Failed to initialize Wix client:', error);
        throw error;
    }
}

// Getter for the Wix client
export function getWixClient(): WixClient {
    if (!_wixClient) {
        return initializeWixClient();
    }
    return _wixClient;
}

// Comprehensive error handling utility
export async function safeWixRequest<T>(
    requestFn: (client: WixClient) => Promise<T>, 
    errorMessage = 'Wix API request failed'
): Promise<T | null> {
    try {
        const client = getWixClient();
        return await requestFn(client);
    } catch (error) {
        console.error(errorMessage, error);
        return null;
    }
}

// Validate client configuration
export function validateWixClientConfig(): boolean {
    try {
        const client = getWixClient();
        // Add more specific validation checks if needed
        return !!client;
    } catch (error) {
        console.error('Wix client configuration invalid:', error);
        return false;
    }
}
