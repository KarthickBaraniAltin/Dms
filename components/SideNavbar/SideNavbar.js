import Flex from "../Layout/Flex"
import Header from "../Header/Header"
import { Button } from "primereact/button"
import Image from "next/image"
import avatar from '../../images/avatar.webp'
import TextInput from "../Input/TextInput"
import { PanelMenu } from "primereact/panelmenu"
import { useRouter } from "next/router"
import { Transition } from "@headlessui/react"
import { useMsal } from "@azure/msal-react"


export default function SideNavbar({ toggleSideNav }) {

    const router = useRouter()
    const { accounts } = useMsal()
    const account = accounts.length > 0 ? accounts[0] : null


    const modulesItems = [
        {
            label: `${toggleSideNav ? 'My Dashboard' : ''}`,
            icon: 'pi  pi-th-large',
            command: () => {
                router.push('/dashboard')
            }
        },
        {
            label: `${toggleSideNav ? 'My Forms' : ''}`,
            items: [
                {
                    label: 'My Forms',
                    command: () => {
                        router.push('/')
                    }
                },
                {
                    label: 'Templates',
                }
            ]
        }
    ]

    const formItems = [
        {
            label: `${toggleSideNav ? 'Form Data' : ''}`,
            icon: 'pi pi-file',
            command: () => {
                router.push('/view/2a681111-3fff-4130-9884-3a439fac0026/form-data/645bb498e053652163682ad6')
            }
        },
        {

            label: `${toggleSideNav ? 'Drafts' : ''}`,
            icon: 'pi pi-file-excel',
        },
        {
            label: `${toggleSideNav ? 'Awaiting For Me' : ''}`,
            icon: 'pi pi-history',
            command: () => {
                router.push('/status/pending')
            }
        },
        {
            label: `${toggleSideNav ? 'Approved' : ''}`,
            icon: 'pi pi-check-circle',
            command: () => {
                router.push('/status/approved')
            }
        },
        {
            label: `${toggleSideNav ? 'Rejected' : ''}`,
            icon: 'pi pi-times-circle',
            command: () => {
                router.push('/status/rejected')
            }
        }
    ]
    const documentItems = [
        {
            label: `${toggleSideNav ? 'My Uploads' : ''}`,
            icon: 'pi pi-upload',
            command: () => {
                router.push('/document')
            }
        },
        // {
        //     label: `${toggleSideNav ? 'Awaiting For Me' : ''}`,
        //     icon: 'pi pi-history',

        // },
        // {
        //     label: `${toggleSideNav ? 'Approved' : ''}`,
        //     icon: 'pi pi-check-circle',
        // },
        // {
        //     label: `${toggleSideNav ? 'Rejected' : ''}`,
        //     icon: 'pi pi-times-circle',
        // }
    ]


    return (
        <aside className={`bgPrimaryLight my-4 border-round transition-all transition-duration-300 ${toggleSideNav ? 'w-3' : 'w-4rem'}`}>
            <Flex direction={'column'} >
                <Flex className={'align-items-center justify-content-around gap-2 p-2 h-5rem'} >
                    <Transition
                        show={toggleSideNav}
                        enter={'transition-all transition-duration-100'}
                        enterFrom=" opacity-0"
                        enterTo=" opacity-100"
                        leave="transition-all transition-duration-100"
                        leaveFrom="opacity-100 "
                        leaveTo="opacity-0 "
                    >
                        <Flex direction={'column'} >
                            <strong >{account?.name}</strong>
                            <small>developer</small>
                        </Flex>
                    </Transition>
                    <Flex className={'align-items-center gap-2'}>
                        <Image src={avatar.src} width={50} height={50} alt={'Avatar'} />
                        <Transition
                            show={toggleSideNav}
                            enter={'transition-all transition-duration-100'}
                            enterFrom=" opacity-0"
                            enterTo=" opacity-100"
                            leave="transition-all transition-duration-100"
                            leaveFrom="opacity-100 "
                            leaveTo="opacity-0 "
                        >
                            <Flex direction={'column'} >
                                <Button icon="pi pi-cog" rounded text severity="info" aria-label="User" />
                                <Button icon="pi pi-share-alt" rounded text severity="info" aria-label="User" />
                            </Flex>
                        </Transition>
                    </Flex>
                </Flex>
                <Header size={4} className={'mx-2'} >{toggleSideNav ? 'Modules' : 'M'}</Header>
                <Flex>
                    <PanelMenu model={modulesItems} className="w-full" />
                </Flex>
                <Header size={4} className={'mx-2'} >{toggleSideNav ? 'Forms' : 'F'}</Header>
                <Flex>
                    <PanelMenu model={formItems} className="w-full" />
                </Flex>
                <Header size={4} className={'mx-2'} >{toggleSideNav ? 'Documents' : 'D'}</Header>
                <Flex>
                    <PanelMenu model={documentItems} className="w-full" />
                </Flex>
            </Flex>
        </aside>
    )
}