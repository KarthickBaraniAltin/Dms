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
                router.push({
                    pathname: '/document/upload'
                })
            }
        },

        // {
        //     key: "1",
        //     label: `${toggleSideNav ? 'Acdemic Affairs' : ''}`,
        //     data: "Work Folder",
        //     icon: "pi pi-fw pi-calendar",
        //     items: [
        //         {
        //             key: "0-0",
        //             label: `${toggleSideNav ? 'ID' : ''}`,
        //             data: "Emergency Folder",
        //             icon: "pi pi-fw pi-cog",
        //             command: () => {
        //                 router.push({
        //                     pathname: '/document/search',
        //                     query: { data: '5628c245-8622-4842-9785-347c3bcd81ff' }
        //                     // '/document/search'
        //                 });
        //             },
        //             items: [
        //                 {
        //                     key: "0-0-0",
        //                     label: `${toggleSideNav ? 'Driving License' : ''}`,
        //                     icon: "pi pi-fw pi-file",
        //                     data: "Expenses Document",
        //                     command: () => {
        //                         router.push({
        //                             pathname: '/document/search',
        //                             query: { data: '5628c245-8622-4842-9785-347c3bcd81ff' }
        //                             // '/document/search'
        //                         });
        //                     }
        //                 },
        //                 {
        //                     key: "0-0-1",
        //                     label: `${toggleSideNav ? 'Passport' : ''}`,
        //                     icon: "pi pi-fw pi-file",
        //                     data: "Resume Document",
        //                     command: () => {
        //                         router.push({
        //                             pathname: '/document/search',
        //                             query: { data: '5628c245-8622-4842-9785-347c3bcd81ff' }
        //                             // '/document/search'
        //                         });
        //                     }
        //                 },
        //                 {
        //                     key: "0-0-2",
        //                     label: `${toggleSideNav ? 'Social Security Card' : ''}`,
        //                     icon: "pi pi-fw pi-file",
        //                     data: "Security Document",
        //                     command: () => {
        //                         router.push({
        //                             pathname: '/document/search',
        //                             query: { data: '5628c245-8622-4842-9785-347c3bcd81ff' }
        //                             // '/document/search'
        //                         });
        //                     }
        //                 }
        //             ]
        //         }
        //     ]
        // },


        // {
        //     key: "1",
        //     label: "Acdemic affairs",
        //     data: "Events Folder",
        //     icon: "pi pi-fw pi-calendar",
        //     children: [
        //         {
        //             key: "0-0",
        //             label: "ID",
        //             data: "Work Folder",
        //             icon: "pi pi-fw pi-cog"
        //         }
        //     ]
        // }
        // {
        //     label: `${toggleSideNav ? 'Documents Search' : ''}`,
        //     icon: 'pi pi-search',
        //     command: () => {
        //         router.push('/document/search')
        //     }
        // },
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
        // {
        //   key: "0",
        //   label: " Upload Documents",
        //   data: "Documents Folder",
        //   icon: "pi pi-upload",
        //   children: [
        //     {
        //       key: "0-0",
        //       label: "Document type",
        //       data: "Work Folder",
        //       icon: "pi pi-fw pi-cog",
        //       children: [
        //         {
        //           key: "0-0-0",
        //           label: "Department",
        //           icon: "pi pi-fw pi-file",
        //           data: "Expenses Document"
        //         },
        //         {
        //           key: "0-0-1",
        //           label: "description",
        //           icon: "pi pi-fw pi-file",
        //           data: "Resume Document"
        //         }
        //       ]
        //     },

        //   ]
        // },
        {
            key: "0",
            label: `${toggleSideNav ? 'Doc Repository' : ''}`,
            data: "Events Folder",
            icon: "pi pi-fw pi-home",
            children: [
                {
                    key: "1",
                    label: `${toggleSideNav ? 'Academic affairs' : ''}`,
                    data: "Events Folder",
                    icon: "pi pi-fw pi-sitemap",
                    children: [
                        {
                            key: "0-0",
                            label: `${toggleSideNav ? 'ID' : ''}`,
                            data: "Work Folder",
                            icon: "pi pi-fw pi-inbox",
                            command: () => {
                                router.push({
                                    pathname: '/document/search',
                                    query: { data: '5628c245-8622-4842-9785-347c3bcd81ff' }
                                    // '/document/search'
                                });
                            },
                            children: [
                                {
                                    key: "0-0-0",
                                    label: `${toggleSideNav ? 'Driving License' : ''}`,
                                    icon: "pi pi-fw pi-file",
                                    data: "Expenses Document",
                                    command: () => {
                                        router.push({
                                            pathname: '/document/search',
                                            query: { data: '68769c9e-c9df-4a47-a0b7-606ce9ce8445' }
                                            // '/document/search'
                                        });
                                    }
                                },
                                {
                                    key: "0-0-1",
                                    label: `${toggleSideNav ? 'Passport' : ''}`,
                                    icon: "pi pi-fw pi-file",
                                    data: "Resume Document",
                                    command: () => {
                                        router.push({
                                            pathname: '/document/search',
                                            query: { data: 'd7044ae4-5cf4-43fc-8699-2bdd31f2de0c' }
                                            // '/document/search'
                                        });
                                    }
                                }
                                // ,{
                                //     key: "0-0-2",
                                //     label: `${toggleSideNav ? 'Social Security Card' : ''}`,
                                //     icon: "pi pi-fw pi-file",
                                //     data: "Security Document",
                                //     command: () => {
                                //         router.push({
                                //             pathname: '/document/search',
                                //             query: { data: '4504d06b-2358-41cf-a642-9a1928f1497b' }
                                //             // '/document/search'
                                //         });
                                //     }
                                // }
                            ]
                        },
                    ]
                },
            ]
        }
    ];

    let selectedKey = {};
    let setSelectedKey;

    [selectedKey, setSelectedKey] = useState({});

    const [nodes, setNodes] = useState([]);

    const documentMenuClick = ((e) => {
        console.log('Event : ' + e.value);

        let data = "";
        if (e.value == "0") {
            data = "5628c245-8622-4842-9785-347c3bcd81ff-0";
        } else if (e.value == "1") {
            data = "5628c245-8622-4842-9785-347c3bcd81ff-1";
        } else if (e.value == "0-0") {
            data = "5628c245-8622-4842-9785-347c3bcd81ff";
        } else if (e.value == "0-0-0") {
            data = "68769c9e-c9df-4a47-a0b7-606ce9ce8445";
        } else if (e.value == "0-0-1") {
            data = "d7044ae4-5cf4-43fc-8699-2bdd31f2de0c";
        } else if (e.value == "0-0-2") {
            data = "4504d06b-2358-41cf-a642-9a1928f1497b";
        }

        router.push({
            pathname: '/document/search/' + data,
            // query: { data: data }
            // '/document/search'
        });
    })




    return (
        <aside className={` my-4 border-round transition-all transition-duration-300 ${toggleSideNav ? 'w-3' : 'w-4rem'}`} style={{ backgroundColor: '#024F7C', borderStyle: 'none' }}>
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
                        <Flex direction={'column'} style={{ color: 'white' }}>
                            <strong >{account?.name}</strong>
                            <small>developer</small>
                        </Flex>
                    </Transition>
                    <Flex className={'align-items-center gap-2 bg-#024f7c'}>
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
                <Header size={4} className={'ml-3 side-title'}>{toggleSideNav ? 'Modules' : 'M'} </Header>
                <Flex>
                    <PanelMenu model={modulesItems} className="w-full" />
                </Flex>
                <Header size={4} className={'ml-3 side-title'} >{toggleSideNav ? 'Forms' : 'F'}</Header>
                <Flex>
                    <PanelMenu model={formItems} className="w-full" />
                </Flex>
                <Header size={4} className={'ml-3 side-title'} >{toggleSideNav ? 'Documents' : 'D'}</Header>

                <Flex>
                    <PanelMenu model={documentItems} className="w-full" />
                </Flex>
                <Tree value={node} selectionMode="single" selectionKeys={selectedKey}
                    onSelectionChange={(e) => { documentMenuClick(e); }}
                    className="w-full md:w-20rem" style={{ backgroundColor: '#024f7c', paddingRight: '0', paddingLeft: '0' }} />
            </Flex>
        </aside>
    )
}