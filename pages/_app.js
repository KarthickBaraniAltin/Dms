import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '../scss/customs.scss'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { PublicClientApplication, EventType } from '@azure/msal-browser'
import { msalConfig } from '../src/msalConfig'
import { AuthenticatedTemplate, MsalProvider } from '@azure/msal-react'
import SideNavbar from '../components/SideNavbar/SideNavbar'
import Flex from '../components/Layout/Flex'
import { useState } from 'react'
import Head from 'next/head'

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  } else if (event.eventType === EventType.POPUP_OPENED) {
    console.log("Popup Opened");
  } else if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
    console.log("Error while accuiring the token");
  } else if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
    console.log("Token acquire successful");
  }
})

function MyApp({ Component, pageProps, ...appProps }) {

  const [toggleSideNav, setToggleSideNav] = useState(false)

  const getContent = () => {

    if (appProps.router.pathname == '/blank') { // update with /blank
      return <Component {...pageProps} />
    }

    return (
      <>
        <Head>
          <title>Form Definition Dashboard</title>
          <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
        </Head>
        <MsalProvider instance={msalInstance}>
          <Navbar setToggleSideNav={setToggleSideNav} />
          <AuthenticatedTemplate>
            <Flex className={'h-full gap-2'}>
              <SideNavbar toggleSideNav={toggleSideNav} />
              <div className='w-12 h-12' >
                <Component {...pageProps} />
              </div>
            </Flex>
          </AuthenticatedTemplate>
        </MsalProvider>
      </>
    )
  }

  return (
    <div>
      {getContent()}
    </div>
  )
}

export default MyApp
