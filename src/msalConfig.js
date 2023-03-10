export const msalConfig = {
    auth: {
        clientId: '1150e924-2c59-4037-8aa6-2f371e3b49f1',
        authority: 'https://login.microsoftonline.com/df35d574-9fba-48ce-a073-737868d77a48',
        redirectUri: "/form-builder-studio/blank", 
        postLogoutRedirectUri: "/" //'http://localhost:3000' 
    }
}   

export const loginRequest = {
    scopes: ['User.Read', 'profile', 'openid', 'email']
}

export const activeDirectoryApiRequest = {
    scopes: ['api://0d786c0c-60fb-4996-8c20-bca3a0b4533f/All']
}

export const formBuilderApiRequest = {
    scopes: ['api://fde24d80-9fdb-44f9-9fd1-29a8a082d58f/All']
}

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}
