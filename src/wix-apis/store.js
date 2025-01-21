import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import { currentCart } from '@wix/ecom';
import { redirects } from '@wix/redirects';

const myWixClient = createClient({
    modules: { products, currentCart, redirects },
    auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || '{"accessToken": {}, "refreshToken": {}}')
    })
});

export default function Store() {
    const [productList, setProductList] = useState([]);
    const [cart, setCart] = useState({});

    async function fetchProducts() {
        const productList = await myWixClient.products.queryProducts().find();
        setProductList(productList.items);
    }

    async function fetchCart() {
        try {
            setCart(await myWixClient.currentCart.getCurrentCart());
        } catch {}
    }

    async function addToCart(product) {
        const options = product.productOptions.reduce(
            (selected, option) => ({
                ...selected,
                [option.name]: option.choices[0].description
            }),
            {}
        );
        const { cart } = await myWixClient.currentCart.addToCurrentCart({
            lineItems: [
                {
                    catalogReference: {
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        catalogItemId: product._id,
                        options: { options }
                    },
                    quantity: 1
                }
            ]
        });
        setCart(cart);
    }

    async function clearCart() {
        const { cart } = await myWixClient.currentCart.deleteCurrentCart();
        setCart(cart);
    }

    async function createRedirect() {
        const { checkoutId } = await myWixClient.currentCart.createCheckoutFromCurrentCart({
            channelType: currentCart.ChannelType.WEB
        });
        const redirect = await myWixClient.redirects.createRedirectSession({
            ecomCheckout: { checkoutId },
            callbacks: { postFlowUrl: window.location.href }
        });
        window.location = redirect.redirectSession.fullUrl;
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>
            <div>
                <h2>Choose Products:</h2>
                {productList.map((product) => {
                    return (
                        <div key={product._id} onClick={() => addToCart(product)}>
                            {product.name}
                        </div>
                    );
                })}
            </div>
            <div>
                <h2>Cart:</h2>
                {cart.lineItems?.length > 0 && (
                    <>
                        <div onClick={() => createRedirect()}>
                            <h3>
                                {cart.lineItems.length} items ({cart.subtotal.formattedAmount})
                            </h3>
                            <span>Checkout</span>
                        </div>
                        <div onClick={() => clearCart()}>
                            <span>Clear cart</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
