'use client'

import { useState, useEffect } from 'react';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { members } from '@wix/members';

export default function WixAuth() {
  const [wixClient, setWixClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initWixClient = async () => {
      try {
        const client = createClient({
          modules: { members },
          auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
            tokens: process.env.NEXT_PUBLIC_WIX_TOKENS
          })
        });
        setWixClient(client);
        setIsLoggedIn(await client.auth.isLoggedIn());
      } catch (error) {
        console.error('Wix client initialization error:', error);
      }
    };

    initWixClient();
  }, []);

  const handleLogin = async () => {
    if (wixClient) {
      try {
        await wixClient.auth.login();
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  const handleLogout = async () => {
    if (wixClient) {
      try {
        await wixClient.auth.logout();
        setIsLoggedIn(false);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}