import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '../scss/customs.scss'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { PublicClientApplication, EventType } from '@azure/msal-browser'
import { msalConfig } from '../src/msalConfig'
import { MsalProvider } from '@azure/msal-react'
import 'react-quill/dist/quill.snow.css'

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

  const getContent = () => {

    if (appProps.router.pathname == '/blank') { // update with /blank
      return <Component {...pageProps} />
    }

    return (
      <>
        <MsalProvider instance={msalInstance}>
          <Navbar/>
          <Component {...pageProps} />
          {/* <Footer /> */}
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
