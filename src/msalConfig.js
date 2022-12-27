import * as msal from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: 'ebdc5772-1367-452a-bebd-a4ab62fc9748',
        authority: 'https://login.microsoftonline.com/df35d574-9fba-48ce-a073-737868d77a48',
        redirectUri: "/snap-admin/blank", // 'snap-admin/blank'
        postLogoutRedirectUri: "/" //'http://localhost:3000' 
    }
}   

export const loginRequest = {
    scopes: ['Group.Read.All', 'User.Read.All','User.Read', 'profile', 'openid', 'email']
}

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}


