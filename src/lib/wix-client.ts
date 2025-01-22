import { createClient, WixClient } from '@wix/sdk';
import { members } from '@wix/members';
import { redirects } from '@wix/redirects';

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
            accessTokenPresent: !!process.env.WIX_ACCESS_TOKEN,
            refreshTokenPresent: !!process.env.WIX_REFRESH_TOKEN
        });
    }
}

// Declare a variable to store the client
let _wixClient: WixClient | null = null;

type AccessToken = string;

// Initialize Wix client with comprehensive error handling
export function initializeWixClient(): WixClient {
    // Prevent re-initialization
    if (_wixClient) return _wixClient;

    try {
        logEnvConfig();
        
        _wixClient = createClient({
            modules: {
                members,
                redirects
            },
            auth: {
                accessToken: getRequiredEnvVar('WIX_ACCESS_TOKEN') as AccessToken,
                refreshToken: getRequiredEnvVar('WIX_REFRESH_TOKEN') as string
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
