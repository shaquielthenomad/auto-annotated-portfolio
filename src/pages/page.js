'use client'

import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const wixClient = createClient({
    modules: { members },
    auth: OAuthStrategy({
      clientId: process.env.local.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens: JSON.parse(Cookies.get("session") || null),
    }),
  });
  


export default function Home() {

    const [member, setMember] = useState([]);
   
    async function fetchMember() {
        const { member } = wixClient.auth.loggedIn()
          ? await wixClient.members.getCurrentMember()
          : {};
        setMember(member || undefined);
      }
      
      async function login() {
        const data = wixClient.auth.generateOAuthData(
          `${window.location.origin}/login-callback`,
          window.location.href,
        );
        localStorage.setItem("oauthRedirectData", JSON.stringify(data));
        const { authUrl } = await wixClient.auth.getAuthUrl(data);
        window.location = authUrl;
      }

      async function logout() {
        const { logoutUrl } = await wixClient.auth.logout(window.location.href);
        Cookies.remove("session");
        window.location = logoutUrl;
      }
      
      useEffect(() => {
        fetchMember();
      }, []);
      

      return (
        <div>
          <h1>Wix Auth</h1>
          {member !== null && (
            <section
              onClick={() => (wixClient.auth.loggedIn() ? logout() : login())}
            >
              <h3>
                Hello{" "}
                {wixClient.auth.loggedIn()
                  ? member.profile?.nickname || member.profile?.slug || ""
                  : "visitor"}
                ,
              </h3>
              <span>{wixClient.auth.loggedIn() ? "Logout" : "Login"}</span>
            </section>
          )}
        </div>
      );