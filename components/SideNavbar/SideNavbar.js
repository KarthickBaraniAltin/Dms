import React, { useEffect, useRef, useState } from 'react';
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
import { Tree } from 'primereact/tree';





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
        {
            label: `${toggleSideNav ? 'Documents Search' : ''}`,
            icon: 'pi pi-search',
            command: () => {
                router.push('/document/search')
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
    const node = [
        {
          key: "0",
          label: " Upload Documents",
          data: "Documents Folder",
          icon: "pi pi-upload",
          children: [
            {
              key: "0-0",
              label: "Document type",
              data: "Work Folder",
              icon: "pi pi-fw pi-cog",
              children: [
                {
                  key: "0-0-0",
                  label: "Department",
                  icon: "pi pi-fw pi-file",
                  data: "Expenses Document"
                },
                {
                  key: "0-0-1",
                  label: "description",
                  icon: "pi pi-fw pi-file",
                  data: "Resume Document"
                }
              ]
            },
            
          ]
        },
        {
          key: "1",
          label: "Acdemic affairs",
          data: "Events Folder",
          icon: "pi pi-fw pi-calendar",
          children: [
            {
                key: "0-0",
                label: "ID",
                data: "Work Folder",
                icon: "pi pi-fw pi-cog",
                children: [
                  {
                    key: "0-0-0",
                    label: "Driving License",
                    icon: "pi pi-fw pi-file",
                    data: "Expenses Document"
                  },
                  {
                    key: "0-0-1",
                    label: "Passport",
                    icon: "pi pi-fw pi-file",
                    data: "Resume Document"
                  }
                ]
              },
          ]
        },
      ];
    
      let selectedKey = {};
      let setSelectedKey;
    
      [selectedKey, setSelectedKey] = useState({});

  const [nodes, setNodes] = useState([]);

  

   


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
                <Tree value={node} selectionMode="single" selectionKeys={selectedKey} onSelectionChange={(e) => {setSelectedKey(e); console.log(e)}} className="w-full md:w-20rem" />
            </Flex>
        </aside>
    )
}