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
import { useRouter } from 'next/router';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from 'primereact/dialog';
import Moment from "moment";

export default function AdvancedDemos() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [metaKey, setMetaKey] = useState(true);

    const [value, setValue] = useState('');
    const [filesList, setFilesList] = useState([]);
    const [filesListTemp, setFilesListTemp] = useState([]);
    const [filterArray, setFilterArray] = useState([]);
    const [searchTxt, setSearchTxt] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [showDepartment, setShowDepartment] = useState(false);
    const [showDocument, setShowDocument] = useState(false);

    const router = useRouter();
    const [tagId, setTagId] = useState(router.query.tagId);
    const [url, setUrl] = useState(null);
    // const tagId = router.query.tagId;

    const [items, setItems] = useState([{ label: 'Academic Affair' }, { label: 'ID' }]);
    // items.push({label: 'Driving License'});
    // setItems(items);
    const home = { icon: () => { return (<span style={{ fontSize: '12px', height: '14px', color: '#495057', alignItems: 'center' }}><i className='pi pi-home'>&nbsp;<span style={{ fontSize: '12px', height: '14px' }}>CSN</span></i></span>) }, label: 'CSN' }

    const [link1, setLink1] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => { console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`,); }; router.events.on('routeChangeStart', handleRouteChange);
        // If the component is unmounted, unsubscribe 
        // from the event with the `off` method: 
        setUrl(url);
        setTagId(router.query.tagId);
        console.log('TagId : ', router.query.tagId);
        getBasics(router.query.tagId);
        return () => { router.events.off('routeChangeStart', handleRouteChange); }
    }, [router]);

    useEffect(() => {
        getFiles();
    }, [tagId])

    const getBasics = (tagsId) => {
        console.log('Tag_Id : ', tagsId);
        if (tagsId == "5628c245-8622-4842-9785-347c3bcd81ff-0") {
            setPageTitle("CSN");
            setItems([]);
            setShowDepartment(true);
            setShowDocument(true);
            // setItems([{ icon: () => { return (<i className='pi pi-home'>&nbsp;CSN</i>) }, label: 'CSN' }]);
            // items.push({label: 'Academic Affairs'});
            // setItems(items);
        } else if (tagsId == "5628c245-8622-4842-9785-347c3bcd81ff-1") {
            setPageTitle("Academic Affairs");
            setItems([]);
            setItems([{ label: 'Academic Affairs' }]);
            setShowDepartment(false);
            setShowDocument(true);
            // items.push({label: 'Academic Affairs'});
            // setItems(items);
        } else if (tagsId == "5628c245-8622-4842-9785-347c3bcd81ff") {
            setPageTitle("ID");
            setItems([]);
            setItems([{ label: 'Academic Affairs' }, { label: 'ID' }]);
            setShowDepartment(false);
            setShowDocument(false);
        } else if (tagsId == "68769c9e-c9df-4a47-a0b7-606ce9ce8445") {
            setPageTitle("Driving License");
            setItems([]);
            setItems([{ label: 'Academic Affairs' }, { label: 'ID' }, { label: 'Driving License' }]);
            setShowDepartment(false);
            setShowDocument(false);
        } else if (tagsId == "d7044ae4-5cf4-43fc-8699-2bdd31f2de0c") {
            setPageTitle("Passport");
            setItems([]);
            setItems([{ label: 'Academic Affairs' }, { label: 'ID' }, { label: 'Passport' }]);
            setShowDepartment(false);
            setShowDocument(false);
        } else if (tagsId == "4504d06b-2358-41cf-a642-9a1928f1497b") {
            setPageTitle("Social Security Card");
            setItems([]);
            setItems([{ label: 'Academic Affairs' }, { label: 'ID' }, { label: 'Social Security Card' }]);
            setShowDepartment(false);
            setShowDocument(false);
        }
    }

    const getFiles = () => {
        let authToken = localStorage.getItem('authTok');
        let myHeaders = { 'Cookie': 'auth_token=' + authToken }

        document.cookie = "auth_token=" + authToken;

        let qTagId = null;
        if (tagId == '5628c245-8622-4842-9785-347c3bcd81ff-1' || tagId == '5628c245-8622-4842-9785-347c3bcd81ff-0') {
            qTagId = '5628c245-8622-4842-9785-347c3bcd81ff';
        } else {
            qTagId = tagId;
        }

        fetch(`http://localhost:8101/docs-web/api/file/taglist?tagId=` + qTagId,
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
                if (token.files.length > 0) {
                    setFilesList(token.files);
                    setFilesListTemp(token.files);
                    setFilterArray(token.files);
                }
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

    const subStringId = (file, index) => {
        let rowNum = index.rowIndex + 1;
        return rowNum;
    };

    const fileNameAction = (file) => {

        let link = `http://localhost:8101/docs-web/api/file/` + file.id + `/data`;
        console.log('F_ID : ' + file.id);
        // const objURL = URL.createObjectURL(file);
        return (
            <>
                <div>
                    <a onClick={() => rowColumnClick(file)}>{file.name}</a>
                    {/* <p className='text-whit' onClick={() => setTableData(true)}>{file.name}</p> */}
                    {/* <Dialog header="Header" visible={file.showModel} style={{ width: '80vw' }} onHide={() => file.showModel = false}> */}
                    <Dialog header="Header" visible={file.showModel && showModel} style={{ width: '80vw' }} onHide={() => setShowModel(false)}>
                        <embed type="" key={link}
                            src={link}
                            width="1250"
                            height="1500" />

                    </Dialog>
                </div>
            </>
        )
    };

    const rowColumnClick = (file) => {
        console.log(file)
        // setTableData(true);
        let link = `http://localhost:8101/docs-web/api/file/` + file.id + `/data`;
        setLinkurl(link);
        file.showModel = true;
        setShowModel(true);
    };

    const sizeConstructor = (file) => {
        let bytes = file.size;
        var marker = 1024; // Change to 1000 if required
        var decimal = 0; // Change as required
        var kiloBytes = marker; // One Kilobyte is 1024 bytes
        var megaBytes = marker * marker; // One MB is 1024 KB
        var gigaBytes = marker * marker * marker; // One GB is 1024 MB
        var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

        // return bytes if less than a KB
        if (bytes < kiloBytes) return bytes + " Bytes";
        // return KB if less than a MB
        else if (bytes < megaBytes) return (bytes / kiloBytes).toFixed(decimal) + " KB";
        // return MB if less than a GB
        else if (bytes < gigaBytes) return (bytes / megaBytes).toFixed(decimal) + " MB";
        // return GB if less than a TB
        else return (bytes / gigaBytes).toFixed(decimal) + " GB";
    }

    const convertDate = (file) => {
        return Moment(file.create_date).format('MM/DD/YY hh:mm');
    }
    // convert local time to another timezone
    function convertLocalToTimezone(localDt, localDtFormat, timezone) {
        return Moment(localDt, localDtFormat).tz(timezone).format('DD-MMM-YY hh:mm');
    }

    const convertDated = (date) => {
        return Moment(date).format('DD-MMM-YY hh:mm');
        // Local date "2020-05-20 10:12:44 PM" to "America/Los_Angeles" timezone date:
        // convertLocalToTimezone(date, null, 'America/Los_Angeles'); // Output: 2020-05-20 09:42:44 AM
    }

    const generateID = (tagId, index) => {
        if (tagId != null && tagId == '68769c9e-c9df-4a47-a0b7-606ce9ce8445') {
            return 'DL - ' + index + 1;
        } else if (tagId != null && tagId == 'd7044ae4-5cf4-43fc-8699-2bdd31f2de0c') {
            return 'PP - ' + index + 1;
        } else if (tagId != null && tagId == '4504d06b-2358-41cf-a642-9a1928f1497b') {
            return 'SC - ' + index + 1;
        }
    }

    return (
        <div className="my-4 w-full h-full" >
            <div className="flex h-full" style={{ backgroundColor: '#F7F8FA' }}>
                {/* style={{ width: '50%' }} */}
                <div className={'col-8 ml-2 h-full justify-content-start border-round'} style={{ color: '#002138' }}>
                    <h4 style={{ marginBottom: '2px', marginTop: '2px' }}>{pageTitle}</h4>
                    <h6 className={'w-max'} style={{ marginTop: '4px' }}>
                        <BreadCrumb model={items} home={home} className={'justify-content-start border-round border-none'} style={{ fontSize: '12px', height: '14px', backgroundColor: '#F7F8FA', display: 'contents' }} />
                    </h6>
                    <div className={'my-4 h-auto bg-white justify-content-start '}
                        style={{ shadowColor: 'black', elevation: 20, height: '73%', borderRadius: '10px', fontSize: '14px', overflow: 'auto', }}>
                        <div className={'pl-3 pt-2 pr-3 pb-8'}>
                            <h4 className={'mt-0'}></h4>
                            <div className={'flex py-2'} style={{
                                backgroundColor: '#CCD6DE', fontFamily: 'WorkSans-Medium', fontWeight: 'bold', fontWeight: '600',
                                fontSize: '14px', color: '#024f7c'
                            }}>
                                {showDepartment ? <div className={'col-1'}>Doc ID</div> : <div className={'col-2'}>Doc ID</div>}
                                {showDepartment ? <div className={'col-3'}>Doc Title</div> : <div className={'col-5'}>Doc Title</div>}
                                {showDepartment ? <div className={'col-2'}>Department</div> : ''}
                                {showDocument ? <div className={'col-2'}>Document Type</div> : ''}
                                <div className={'col-2'}>Upload Date</div>
                                <div className={'col-2'}>Uploaded By</div>
                            </div>

                            {
                                filesList.map((file, index) => {
                                    return (
                                        <div className={'flex py-2'} onClick={() => {
                                            let link1 = `http://localhost:8101/docs-web/api/file/` + file.id + `/data`;
                                            console.log('Link1 : ' + link1);
                                            setLink1(link1);
                                            // setLink1(fetch(link1, { headers: { method: 'GET', headers: { 'Cookie': 'auth_token=' + localStorage.getItem('authTok') }, credentials: 'include' } }));
                                            setShowPreview(true);
                                            setSelectedRow(index);
                                        }}
                                            style={selectedRow === index ? { backgroundColor: '#024F7C', color: 'white' } :
                                                index % 2 === 0 ? { color: '#002138', backgroundColor: '#FFFFFF', fontFamily: 'WorkSans-Medium', fontWeight: 'normal' } : { color: '#002138', backgroundColor: '#E5F8FF', fontFamily: 'WorkSans-Medium', fontWeight: 'normal' }}>
                                            {showDepartment ? <div className={'col-1'}>{generateID(file.tagId, index)}</div> : <div className={'col-2'}>{generateID(file.tagId, index)}</div>}
                                            {showDepartment ? <div className={'col-3'}>{file.title}</div> : <div className={'col-5'}>{file.title}</div>}
                                            {showDepartment ? <div className={'col-2'} >Academic Affairs</div> : ''}
                                            {showDocument ? <div className={'col-2'} >ID</div> : ''}
                                            <div className={'col-2'}>{convertDated(file.create_date)}</div>
                                            <div className={'col-2'}>ADMIN</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* style={{ width: '50%' }} */}
                <div className={'col-4 mb-4 justify-content-start'} style={{ marginTop: '4px' }}>
                    <div style={{ display: 'flex', marginTop: '0px' }}>
                        <p style={{ marginRight: 'auto', marginTop: '0px', marginBottom: '4px' }}>
                            <i className="pi pi-search" style={{
                                color: '#024f7c', marginLeft: '185px', position: 'absolute', marginTop: '9px',
                            }} />
                            <InputText value={searchTxt} tooltip="string" placeholder="Search here" icon='pi pi-search' onChange={(e) => {
                                setSearchTxt(e.target.value)
                                setFilesList(filesListTemp.filter((file) => file.title.toLowerCase().includes(searchTxt.toLowerCase())));
                                if (e.target.value.length == 0) {
                                    setFilesList(filesListTemp);
                                }
                            }
                            } />
                        </p>
                    </div>
                    <div className={'mb-4 bg-white justify-content-start'} style={{
                        height: '73%', marginRight: '16px',
                        borderRadius: '10px'
                    }}>
                        <h4 className={'mt-4 pt-2 ml-3'}>Document Preview</h4>
                        <div className={'px-3 py-2'}>
                            {showPreview &&
                                <embed type="" key={link1}
                                    src={link1}
                                    width="100%"
                                    height="550" />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <Flex direction={'column'} className={'my-4 h-full w-full bg-white justify-content-start border-round'} >
                <Flex direction={'column'} className={'justify-content-between align-items-center h-30rem '} >

                    <BreadCrumb model={items} home={home} /> */}
            {/* <Datagrid data={filesList} columns={gridColumns} sortable={false} /> */}

            {/* {filesList != undefined && filesList != null && filesList.length > 0 ?
                        <DataTable value={filesList} scrollable scrollHeight="300px" size="small" stripedRows
                            tableStyle={{ overflow: 'scroll', minWidth: "30rem", backgroundColor: '#f7f5ed' }}
                            selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)}
                            dataKey="id" metaKeySelection={metaKey}>
                            <Column body={subStringId} header="ID" style={{ border: 'none', width: '25px' }}></Column>
                            <Column body={fileNameAction} header="File Name" style={{ border: 'none', width: '160px' }}></Column>
                            {/* <Column body={viewAction} header="File Type" style={{ border: 'none', width: '100px' }}></Column> */}
            {/*<Column field="mimetype" header="File Type" style={{ border: 'none', width: '100px' }}></Column>
                            <Column body={sizeConstructor} header="Size " style={{ border: 'none', width: '60px' }}></Column>
                            <Column body={convertDate} header="Created Date " style={{ border: 'none', width: '120px' }}></Column>
                            <Column body={(e) => e.processing ? 'Awaiting Index' : 'Indexed'} header="Status" style={{ border: 'none' }}></Column>
                        </DataTable> : <p>No Data</p>} */}

            {/* <Flex className={'h-full justify-content-center align-items-center'}>
                    <div className="card flex justify-content-center ">
                        <Card title="" subTitle="Subtitle" footer={footer} className="md:w-25rem " style={{ marginTop: '50px', backgroundColor: '#eaf5fa' }}>
                            <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                        </Card>
                    </div>
                </Flex>  */}

            {/* </Flex>
             </Flex> */}
        </div>
    )
}