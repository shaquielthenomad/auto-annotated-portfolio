import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { members } from '@wix/members';

const myWixClient = createClient({
    modules: { members },
    auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID,
        tokens: JSON.parse(Cookies.get('session') || null)
    })
});

export default function LoginBar() {
    const [member, setMember] = useState(null);

    async function fetchMember() {
        const { member } = myWixClient.auth.loggedIn() ? await myWixClient.members.getCurrentMember() : {};
        setMember(member || undefined);
    }

    async function login() {
        const data = myWixClient.auth.generateOAuthData(`${window.location.origin}/login-callback`, window.location.href);
        localStorage.setItem('oauthRedirectData', JSON.stringify(data));
        const { authUrl } = await myWixClient.auth.getAuthUrl(data);
        window.location = authUrl;
    }

    async function logout() {
        const { logoutUrl } = await myWixClient.auth.logout(window.location.href);
        Cookies.remove('session');
        window.location = logoutUrl;
    }

    useEffect(() => {
        fetchMember();
    }, []);

    return (
        <div className="login-bar">
            {member !== null && (
                <section onClick={() => (myWixClient.auth.loggedIn() ? logout() : login())} className="cursor-pointer">
                    <h3>Hello {myWixClient.auth.loggedIn() ? member.profile?.nickname || member.profile?.slug || '' : 'visitor'},</h3>
                    <span>{myWixClient.auth.loggedIn() ? 'Logout' : 'Login'}</span>
                </section>
            )}
        </div>
    );
}
