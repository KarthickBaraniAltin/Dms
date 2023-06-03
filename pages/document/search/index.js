import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
// import Header from "../../components/header/Header";
import Flex from '../../../components/Layout/Flex';
import Header from '../../../components/Header/Header';
// import Flex from "../../components/Layout/Flex";
import { InputText } from "primereact/inputtext";
// import Datagrid from "../../components/WorkflowNode/Datagrid/Datagrid";
import Datagrid from '../../../components/WorkflowNode/Datagrid/Datagrid';


export default function AdvancedDemo() {
    const [value, setValue] = useState('');
    const [filesList, setFilesList] = useState([]);
    const [filterArray, setFilterArray] = useState([]);

    useEffect(() => {
        getFiles();
    }, [])

    const getFiles = () => {
        let authToken = localStorage.getItem('authTok');
        let myHeaders = { 'Cookie': 'auth_token=' + authToken }

        document.cookie = "auth_token=" + authToken;

        fetch(`http://localhost:8101/docs-web/api/file/list`,
            // orders/${orderId}/uploadInvoiceFile
            {
                method: 'GET',
                headers: myHeaders,
                // headers: {
                //   'Cookie' : 'auth_token=' + authToken
                // },
                credentials: 'include'
            },
        ).then((response1) => {
            // console.log('response 1 : ' + response);
            console.log('response 1 : ' + response1.json().then((token) => {
                console.log('_1 : ', token.files);
                setFilesList(token.files);
                setFilterArray(token.files);
            })
            )
        })
    }

    const saveClick = () => {

    }

    const gridColumns = [
        { field: 'name', header: 'File Name' },
        { field: 'size', header: 'File Size' },
        { field: 'create_date', header: 'Created' },
        { field: 'mimetype', header: 'File Type' },
        { field: 'processing', header: 'Status' },

    ];

    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Search" icon="pi pi-check" onClick={() => saveClick()} />
            <Button label="Clear" icon="pi pi-times" onClick={() => setValue('')} className="p-button-outlined p-button-secondary" />
        </div>
    );

    return (
        <div className="my-4 w-full h-screen" >
            <Card title={'Dashboard'} className="h-full" >
                <Flex className={'h-full justify-content-center align-items-center'}>
                    <div className="card flex justify-content-center ">
                        <Card title="" subTitle="Subtitle" footer={footer} className="md:w-25rem " style={{ marginTop: '50px', backgroundColor: '#eaf5fa' }}>
                            <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                        </Card>
                    </div>
                </Flex>
            </Card>

            <Datagrid data={filesList} columns={gridColumns} sortable={true} />
        </div>
    )
}