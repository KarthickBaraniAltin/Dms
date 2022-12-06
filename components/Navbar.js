import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import axios from 'axios'
import { getAllStudentGroupMembers, setAuthorizationHeader } from '../api/apiCalls'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useMsal } from "@azure/msal-react"
import { loginRequest } from '../src/msalConfig'
import { Menubar } from 'primereact/menubar'
import useRoles from '../hooks/useRoles'
import { Button } from 'primereact/button'


export default function Navbar() {

  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] || {})
  const [apiData, setApiData] = useState(null)

  const roles = useRoles();

  useEffect(() => {
    if (account) {
      instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      }).then(async (response) => {
        if (response) {
          setAuthorizationHeader(response.accessToken);
        }

        try {
          const res = await getAllStudentGroupMembers();
        } catch(err) {
          console.log(err);
        }
      
      }).catch((error) => {

      })
    } else {
      delete axios.defaults.headers['Authorization']
    }
  }, [account, instance])
  
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
  const end = <Button label='logout' className='btn btn-primary mr-3' onClick={() => instance.logoutPopup()} />

  return (
    // <nav className="navbar navbar-primary navbar-expand-md " style={{'backgroundColor': '#004990', 'boxShadow': '0 0 11px #0003'}}>
      <>
        <AuthenticatedTemplate>
          <Menubar className='-m-2' start={<Logo />} end={end} style={{'backgroundColor': '#004990', 'boxShadow': '0 0 11px #0003', border: 'none'}} />
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto ms-2 mb-2 mb-lg-0">
                <li className='nav-item'>
                  <button className='btn btn-primary me-4' onClick={() => instance.logoutPopup()}>Logout</button>
                </li>
            </ul>
          </div> */}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className='me-2' >
            <button onClick={() => instance.loginPopup()} type="button" className="btn btn-outline-warning btn-sm inline-block text-no-wrap" style={{border: '2px solid'}}>
                Sign in
            </button>
          </div>
        </UnauthenticatedTemplate>
      </>
    // </nav>
  )
}
