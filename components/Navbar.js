import React from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import Image from 'next/image'
import ExitButton from '../public/images/icons/form_builder_images/exit.png'

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
  const logoContainerStyle = {color: 'white', display: 'flex', justifyContent: 'space-between', width: '980px'}

  const logoContainer = (
    <div style={logoContainerStyle}>
      <div style={{alignSelf: 'flex-start', padding: '1.5rem 6rem', backgroundColor: '#2C7ECA', fontSize: '32px'}}>
        <div style={{display: 'flex', gap: '1rem'}}>
          PedaDocs
          <div style={{transform: 'rotate(180deg)'}}>
            <Image src={ExitButton} width={32} height={28} />
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'center'}}>
        <ul style={{display: 'flex', textDecoration: 'none', color: '#2692F6', gap: '4rem'}}>
          <li>Form Builder</li>
          <li>Form Settings</li>
          <li>Workflow Builder</li>
        </ul>
      </div>
    </div>
  )
  
  return (
      <>
        <AuthenticatedTemplate>
          <Menubar className='-m-2' style={{padding: '0'}} start={logoContainer} end={logoutButton} />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Menubar className='-m-2' end={loginButton} />
        </UnauthenticatedTemplate>
      </>
  )

  // return (
  //   <>
  //     <AuthenticatedTemplate>
  //       <nav style={{display: 'flex', width: 'calc(100% + 16px)'}}>
  //         <div style={{padding: '1.5rem 6rem', backgroundColor: '#2C7ECA', fontSize: '32px'}}>
  //           <div style={{display: 'flex', gap: '1rem'}}>
  //             PedaDocs
  //             <div style={{transform: 'rotate(180deg)'}}>
  //               <Image src={ExitButton} width={32} height={28} />
  //             </div>
  //           </div>
  //         </div>
  //         <div>
  //         <ul style={{display: 'flex', textDecoration: 'none', color: 'grey', gap: '1rem'}}>
  //               <li>Form Builder</li>
  //               <li>Form Settings</li>
  //               <li>Workflow Builder</li>
  //             </ul>
  //         </div>
  //         <div>
  //           <Button label='Sign In' className='btn btn-primary mr-3' onClick={() => instance.loginPopup()} />
  //         </div>
  //       </nav>
  //     </AuthenticatedTemplate>
  //     <UnauthenticatedTemplate>
  //             <Menubar className='-m-2' end={loginButton} />
  //     </UnauthenticatedTemplate>
  //   </>
  // )
}


// style={{'backgroundColor': '#004990', 'boxShadow': '0 0 11px #0003', border: 'none'}}