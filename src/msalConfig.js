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

export const apiRequest = {
    scopes: ['api://b8d6006d-0e78-4712-ba03-081458acbb8e/Write', 'api://b8d6006d-0e78-4712-ba03-081458acbb8e/read']
}

export const studentApiRequest = {
    scopes: ['api://13969674-1894-435a-a8ab-e084aff23049/All']
}

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}


