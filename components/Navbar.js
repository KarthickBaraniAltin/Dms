import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'

export default function Navbar() {
    
  const { instance } = useMsal()

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

  const logoutButton = <Button label='logout' className='btn btn-primary mr-3' onClick={() => instance.logoutPopup()} />
  const loginButton = <Button label='Sign In' className='btn btn-primary mr-3' onClick={() => instance.loginPopup()} />
  
  return (
      <>
        <AuthenticatedTemplate>
          <Menubar className='-m-2' end={logoutButton} style={{'backgroundColor': '#004990', 'boxShadow': '0 0 11px #0003', border: 'none'}} />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Menubar className='-m-2' end={loginButton} style={{'backgroundColor': '#004990', 'boxShadow': '0 0 11px #0003', border: 'none'}} />
        </UnauthenticatedTemplate>
      </>
  )
}
