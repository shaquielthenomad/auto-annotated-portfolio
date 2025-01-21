import { useEffect, useState } from 'react';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import { currentCart } from '@wix/ecom';
import { redirects } from '@wix/redirects';

const myWixClient = createClient({
    auth: ApiKeyStrategy({
        apiKey: process.env.WIX_API_KEY,
        siteId: process.env.WIX_SITE_ID,
        accountId: process.env.WIX_ACCOUNT_ID
    }),
    modules: {
        products,
        currentCart,
        redirects
    }
});

export default function Store() {
    const [productList, setProductList] = useState([]);
    const [cart, setCart] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchProducts() {
        try {
            console.log('Fetching products...');
            console.log('Client Details:', {
                apiKey: !!process.env.WIX_API_KEY,
                siteId: process.env.WIX_SITE_ID,
                accountId: process.env.WIX_ACCOUNT_ID
            });

            const productList = await myWixClient.products.queryProducts().find();
            console.log('Products fetched:', productList.items);
            setProductList(productList.items);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Products</h2>
            {productList.length === 0 ? <p>No products found</p> : productList.map((product) => <div key={product._id}>{product.name}</div>)}
        </div>
    );
}
