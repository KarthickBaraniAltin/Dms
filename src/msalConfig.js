import * as msal from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: 'd238bbfd-7db0-4d14-bfe0-c7e47aa3c2c9',
        authority: 'https://login.microsoftonline.com/df35d574-9fba-48ce-a073-737868d77a48',
        redirectUri: "/component-library/blank", 
        postLogoutRedirectUri: "/" //'http://localhost:3000' 
    }
}   

export const loginRequest = {
    scopes: ['Group.Read.All', 'User.Read.All','User.Read', 'profile', 'openid', 'email']
}


export const activeDirectoryApiRequest = {
    scopes: ['api://0d786c0c-60fb-4996-8c20-bca3a0b4533f/All']
}

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}


