// src/pages/shop.js
import React, { useState, useEffect } from 'react';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import wixStoresFrontend from '@wix/site-stores';
import { cart } from '@wix/site-stores';
import { formFactor } from '@wix/site-window';

const ShopPage = () => {
    const [productList, setProductList] = useState([]);
    const [collectionList, setCollectionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize Wix Client
    const wixClient = createClient({
        auth: ApiKeyStrategy({
            apiKey: process.env.NEXT_PUBLIC_WIX_API_KEY,
            siteId: process.env.NEXT_PUBLIC_WIX_SITE_ID,
            accountId: process.env.NEXT_PUBLIC_WIX_ACCOUNT_ID
        }),
        modules: {
            products,
            collections,
            cart,
            stores: wixStoresFrontend,
            formFactor
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Products
                const fetchedProducts = await wixClient.products.queryProducts().find();
                setProductList(fetchedProducts.items);

                // Fetch Collections
                const fetchedCollections = await wixClient.collections.queryCollections().find();
                setCollectionList(fetchedCollections.items);

                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = async (product) => {
        try {
            // Prepare cart item
            const cartItem = {
                productId: product._id,
                quantity: 1
            };

            // Add product to cart
            await wixClient.cart.addProducts([cartItem]);

            // Check device type before showing mini cart
            const currentFormFactor = await wixClient.formFactor();
            if (currentFormFactor !== 'Mobile') {
                await wixClient.cart.showMiniCart();
            }

            // Optional: Show success notification
            alert(`${product.name} added to cart!`);
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Loading products...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-red-500">Error loading products: {error.message || 'Unknown error'}</p>
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Shaquiel&apos;s Digital Shop</h1>

            {/* Collections Section */}
            {collectionList.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Collections</h2>
                    <div className="flex overflow-x-auto space-x-4">
                        {collectionList.map((collection) => (
                            <div key={collection._id} className="flex-shrink-0 bg-gray-100 p-4 rounded-lg">
                                {collection.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Products Grid */}
            {productList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {productList.map((product) => (
                        <div key={product._id || crypto.randomUUID()} className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow">
                            {product.media?.mainMedia?.image?.url && (
                                <img
                                    src={product.media.mainMedia.image.url}
                                    alt={product.name || 'Product'}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">${product.price?.price?.toFixed(2) || 'N/A'}</span>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No products available at the moment.</div>
            )}
        </div>
    );
};

export default ShopPage;
