// pages/shop.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';

const ShopPage = () => {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const wixClient = createClient({
                    auth: ApiKeyStrategy({
                        apiKey: process.env.NEXT_PUBLIC_WIX_API_KEY,
                        siteId: process.env.NEXT_PUBLIC_WIX_SITE_ID,
                        accountId: process.env.NEXT_PUBLIC_WIX_ACCOUNT_ID
                    }),
                    modules: { products }
                });

                const fetchedProducts = await wixClient.products.queryProducts().find();
                setProductList(fetchedProducts.items);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err);
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        // Placeholder for cart functionality
        console.log('Added to cart:', product);
        alert(`${product.name} added to cart!`);
    };

    if (isLoading)
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl">Loading products...</p>
                </div>
            </Layout>
        );

    if (error)
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl text-red-500">Error loading products: {error.message}</p>
                </div>
            </Layout>
        );

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Shaquiel&apos;s Digital Shop</h1>

                {productList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {productList.map((product) => (
                            <div key={product._id} className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow">
                                {product.media?.mainMedia?.image?.url && (
                                    <img src={product.media.mainMedia.image.url} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
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
        </Layout>
    );
};

export default ShopPage;
