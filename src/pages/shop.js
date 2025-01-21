// pages/shop.js
import React from 'react';
import Layout from '../components/layouts/Layout';
import { WixClient } from '../wix-apis/store'; // Assuming you have a Wix client setup

const ShopPage = ({ products }) => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Shaquiel's Digital Shop</h1>

                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow">
                                {product.image && <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />}
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
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

export async function getServerSideProps() {
    try {
        // Use Wix client to fetch products
        const wixClient = new WixClient();
        const products = await wixClient.getProducts();

        return {
            props: {
                products: products || []
            }
        };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return {
            props: {
                products: []
            }
        };
    }
}

//
