/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-07-20 16:29:22
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-08-16 11:42:32
 * @Description: 
 */
import KeycloakProvider from "next-auth/providers/keycloak";

import NextAuth from "next-auth"
const axios = require('axios');
const jwt = require("jsonwebtoken")
const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL
const JWT_API = '/accounts/jwt/login';
const LOGOUT_API = '/accounts/logout';
const STEEDOS_TOKENS = {};

const getJWTToken = (user)=>{
  const jwtPayload = {
    iss: process.env.NEXTAUTH_URL,
    sub: "steedos-nextjs-amis",
    profile: {
      email: user.email,
      ...user      
    }
  };

  return jwt.sign(
    jwtPayload,
    process.env.STEEDOS_IDENTITY_JWT_SECRET,
    {
      expiresIn: 60
    }
  );
}

const loginSteedosProject = async (user)=>{
  if(STEEDOS_TOKENS[user.email]){
    return STEEDOS_TOKENS[user.email];
  }
  const projectRootUrl = ROOT_URL;
  const rest =  await axios({
    url: `${projectRootUrl}${JWT_API}`,
    method: 'get',
    data: {},
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getJWTToken(user)}` }
  });
  STEEDOS_TOKENS[user.email] = rest.data;
  return STEEDOS_TOKENS[user.email];
}

const logoutSteedosProject = (token)=>{
  const projectRootUrl = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL;
  axios({
    url: `${projectRootUrl}${LOGOUT_API}`,
    method: 'post',
    data: {},
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
  }).catch((e)=>{
    console.error(e);
  })
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [KeycloakProvider({
    clientId: process.env.KEYCLOAK_ID,
    clientSecret: process.env.KEYCLOAK_SECRET,
    issuer: process.env.KEYCLOAK_ISSUER,
    name: 'Steedos ID'
  })],
  callbacks: {
  //   async jwt(props) {
  //     const { token, account, user } = props;
  //     // Persist the OAuth access_token to the token right after signin
  //     // if (account) {
  //     //   token.accessToken = account.access_token
  //     // }
  //     if(user && user.steedos){
  //       token.steedos = user.steedos;
  //     }
  //     return token
  //   }, 
    async session({ session, token, user }) {
      if(session.user){
        if(token && token.steedos){
          session.steedos = token.steedos;
        }else{
          try {
            const loginResult = await loginSteedosProject(session.user);
            if(loginResult.space && loginResult.token){
              session.steedos = {
                space: loginResult.space,
                token: loginResult.token,
                userId: loginResult.user?.id,
                name: loginResult.user?.name
              }
            }
          } catch (e) {console.error(e)}
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

export default NextAuth(authOptions)