import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import axios from 'axios'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useMsal } from "@azure/msal-react"
import { loginRequest } from '../src/msalConfig'
import { Menubar } from 'primereact/menubar'
import useRoles from '../hooks/useRoles'
import { Button } from 'primereact/button'


export default function Navbar() {

  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [apiData, setApiData] = useState(null)
  
  // For Navbar documentation please go: https://www.primefaces.org/primereact/menubar/
  const authenticatedItems = [
    {
      label: 'Logout',
      command: () => instance.logoutPopup()
    }
  ]

  const unauthenticatedItems = [
    {
      label: 'Login',
      command: () => instance.loginPopup()
    }
  ]

  const start = <Logo />
  const logoutButton = <Button label='logout' className='btn btn-primary mr-3' onClick={() => instance.logoutPopup()} />
  const loginButton = <Button label='Sign In' className='btn btn-primary mr-3' onClick={() => instance.loginPopup()} />
  
  return (
      <>
        <AuthenticatedTemplate>
          <Menubar className='-m-2' start={<Logo />} end={logoutButton} style={{'backgroundColor': '#004990', 'boxShadow': '0 0 11px #0003', border: 'none'}} />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Menubar className='-m-2' start={<Logo />} end={loginButton} style={{'backgroundColor': '#004990', 'boxShadow': '0 0 11px #0003', border: 'none'}} />
        </UnauthenticatedTemplate>
      </>
  )
}
