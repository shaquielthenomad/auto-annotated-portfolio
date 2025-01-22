import { services } from '@wix/bookings';
import { createClient, OAuthStrategy } from '@wix/sdk';

export async function listWixServices() {
    try {
        const myWixClient = createClient({
            modules: { services },
            auth: OAuthStrategy({ clientId: 'b0055c86-1053-4e5f-af7a-274142536248' })
        });

        const serviceList = await myWixClient.services.queryServices().find();

        console.log('Wix Bookings Services:');
        console.log('Total: ', serviceList.items.length);
        serviceList.items.forEach((service) => {
            console.log(`- ${service.name}`);
            console.log(`  ID: ${service.id}`);
            console.log(`  Description: ${service.description || 'No description'}`);
        });

        return serviceList.items;
    } catch (error) {
        console.error('Error in Wix Bookings Services:', error);
        return [];
    }
}

// If this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    listWixServices().catch(console.error);
}
