import { useEffect, useState } from "react";
import { useAccount, useMsal } from "@azure/msal-react"
import axios from "axios";

export const useAccessToken = () => {
    const { instance, accounts } = useMsal()
    const account = useAccount(accounts[0] || {})

    const getAccessToken = async (request) => {
        instance.acquireTokenSilent({
            ...request,
            account: account
        }).then(async (response) => {
            const { accessToken } = response
            return accessToken
        }).catch((error) => {
            console.log('Auth Error : ', error)
        })
    }

    return { getAccessToken }
}
