
import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Tooltip } from 'primereact/tooltip';
import { RadioButton } from "primereact/radiobutton";
import Moment from "moment";
import { InputTextarea } from 'primereact/inputtextarea';
// import { Description } from '@headlessui/react/dist/components/description/description';
import moment from 'moment';


export default function Home() {
  const [value, setValue] = useState('');
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const [filesList, setFilesList] = useState([]);
  const [parentTagList, setParentTagList] = useState([]);
  const [childTagList, setChildTagList] = useState([]);

  const [nsheID, setNsheID] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [src, setSrc] = useState(null);
  const [tableData, setTableData]= useState();
  const [showModel, setShowModel] = useState(false);

  const onFileSelect = (e) => {
    setFileItem(e.files);
    setSrc(URL.createObjectURL(e.files[0]));
  }

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
      invoiceUploadHandler(file);
    });

    setTotalSize(_totalSize);
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}

      </div>
    );
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [metaKey, setMetaKey] = useState(true);

  const [customers, setCustomers] = useState([]);

  const getUploadFiles = (file, props) => {
    const url = URL.createObjectURL(file);
    console.log(file);

//const docs = ['docx','pdf'];
  //const docType = file.name.split('.')[1];
  //docs.includes(docType) ? pdf.src :

    return (
      <>
        <div style={{ textAlign: 'left', display: 'flex' }} onClick={() => setShow(true)}>
         <img src={ url} style={{ marginRight: 0 }} width={'40%'} height={'10%'}
           /> 
           <embed type=""
       src={src} 
       width="250"
          height="240"/>

          <p style={{ paddingLeft: '10px' }}>{file.name}</p>
          {/* <Button style={{ paddingLeft: "25px", marginRight: '5px' ,marginLeft:'auto',width:"165px",height:'40px',justifyContent:'center'}} label="Add Document" onClick={() => setVisible(true)} />*/}
          <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" style={{ marginLeft: 'auto' }} onClick={() => onTemplateRemove(file, props.onRemove)} />
        </div>
        {/* <Dialog header="Header" visible={show} style={{ width: '80vw' }} onHide={() => setShow(false)}>
          <Image src={url} alt="Image" width="100%" />
        </Dialog> */}
      </>
    );
  };

  const emptyTemplate = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', }}>
        <i className="pi pi-image  mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)', }}></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)', }} className="my-5">  Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

  const [nodes, setNodes] = useState([]);
  const [checked, setChecked] = useState(false);


  const [date, setDate] = useState(null);

  const [file, setFile] = useState(false);
  const [ingredient, setIngredient] = useState('fileGroup');

  const [selectedCity, setSelectedCity] = useState(null);
  const [parentTag, setParentTag] = useState(null);
  const [childTag, setChildTag] = useState(null);
  const cities = [
    { name: 'IT', code: 'NY' },
    { name: 'ADMIN', code: 'RM' }
  ];

  const onUpload = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  const header = () => {
    return (
      <div style={{ display: 'flex', padding: '20px' }}>
        <h3 style={{ display: 'flex' }}> Create New </h3>
        <h3 style={{ paddingLeft: '20px' }}>{ingredient}</h3>
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', gap: '5px', paddingLeft: '100px' }}>
          <RadioButton inputId="ingredient1" name="pizza" value="fileGroup" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'fileGroup'} />
          <label htmlFor="ingredient1" className="ml-2">File Group</label>
          <RadioButton inputId="ingredient2" name="pizza" value="file" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'file'} />
          <label htmlFor="ingredient2" className="ml-2">file</label>
        </div>
      </div>
    )

  }

  const [img, setImg] = useState([]);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);


  
  let selectedKey = {};
  let setSelectedKey;
  [selectedKey, setSelectedKey] = useState({});
  const [state, setState] = useState(false)
  const [linkurl, setLinkurl] = useState(null)

  useEffect(() => {
    setNsheID('');
    setFirstName('');
    setLastName('');
    setMiddleName('');
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "admin");
    urlencoded.append("password", "admin");

    fetch('http://localhost:8101/docs-web/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
      credentials: 'include'
    }).then((response) => {
      console.log('Response : ' + response);
      response.json().then((token) => {
        console.log('Token : ' + token.auth_token);
        // authToken = token.auth_token;
        localStorage.setItem('authTok', token.auth_token);
        getFiles();
        getTags();
      });
    });
  }, []);

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
        token.files.forEach((res) => res['showModel'] = false)
        setFilesList(token.files);
        fileUploadRef?.current?.clear();
        // {
        //   token != undefined && token != null && token.files != undefined && token.files != null && token.files.length > 0 ?
        //     fetch(`http://localhost:8101/docs-web/api/file/` + token.files[4].id + `/data`,
        //       {
        //         method: 'GET',
        //         headers: myHeaders,
        //         credentials: 'include'
        //       }).then((response3) => {
        //         console.log('File_Data', response3);
        //       }) : null
        // }
      }));

    });

    // setFilesList(response1.files);
  };

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
              <Dialog header="Header" visible={showModel} style={{ width: '80vw' }} onHide={() => setShowModel(false)}>
                <embed type=""
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
    // file.showModel = true;
    let link = `http://localhost:8101/docs-web/api/file/` + file.id + `/data`;
    setLinkurl(link);
    setShowModel(true);
    // return (
    //   <>
    //    {/* <a className='text-whit' href={link} target='_blank'>{file.name}</a> */}
    //    {/* <p className='text-whit' onClick={() => setTableData(true)}>{file.name}</p> */}
    //    {/* <Dialog header="Header" visible={tableData} style={{ width: '80vw' }} onHide={() => setTableData(false)}> */}
    //     {/* <p>Hi</p> */}
    //   {/* <iframe src={objURL} style="width:600px; height:500px;" frameborder="0"></iframe> */}
    //     {/* </Dialog>  */}
    //     <Dialog header="Header" visible={file.showModel} style={{ width: '80vw' }} onHide={() => file.showModel = false}>
    //       {/* <Image src={url} alt="Image" width="100%" /> */}
    //        <embed type=""
    //    src={link} 
    //    width="1250"
    //       height="1500"/>
    //     {/* <p>haii</p> */}
    //     </Dialog>
    // </>
    // )
  }

  const viewAction = (file) => {
    return (
      <>
        <span className='pi pi-eye' style={{ cursor: 'pointer' }} onClick={() => viewTagsName(file)} autoFocus />
      </>
    )
  };

  const viewTagsName = (file) => {
    let authToken = localStorage.getItem('authTok');
    let myHeaders = { 'Cookie': 'auth_token=' + authToken }

    fetch(`http://localhost:8101/docs-web/api/file/` + file.id + `/data?size=content`,
      {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
      }).then((response4) => {

        console.log('File_Content', response4.text().then(data => console.log('Txt', data)));
      })

    setNsheID('');
    setFirstName('');
    setLastName('');
    setMiddleName('');

    if (file.name == 'Request to Change Personal Info.pdf') {
      setFirstName('Cristan');
      setLastName('CamPas');
      setMiddleName('');
    } else if (file.name == 'Substitution Request Form.pdf') {
      setNsheID('5005869448');
      setFirstName('CHRISTIAN');
      setLastName('IPANAQUE OLIVOS');
      setMiddleName('');
    } else if (file.name == 'Advisor Report Update Form.pdf') {
      setNsheID('5005869448');
      setFirstName('CHRISTIAN');
      setLastName('IPANAQUE OLIVOS');
      setMiddleName('JOSE');
    }


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

  const getTags = () => {
    let authToken = localStorage.getItem('authTok');
    let myHeaders = { 'Cookie': 'auth_token=' + authToken }

    document.cookie = "auth_token=" + authToken;

    fetch(`http://localhost:8101/docs-web/api/tag/list`,
      // orders/${orderId}/uploadInvoiceFile
      {
        method: 'GET',
        headers: myHeaders,
        // headers: {
        //   'Cookie' : 'auth_token=' + authToken
        // },
        credentials: 'include'
      },
    ).then((response2) => {
      // console.log('response 1 : ' + response);
      console.log('response 2 : ' + response2.json().then((token) => {
        console.log('_2 : ', token.tags);
        // setParentTagList();
        // setChildTagList();

        // console.log(token.tags.filter(val =>  val.find( item => item.parent != undefined && item.parent != null ))); 
        // console.log(token.tags.filter((e) => e.parent !== undefined && e.parent !== null));
        setChildTagList(token.tags.filter((e) => e.parent !== undefined && e.parent !== null));
        setParentTagList(token.tags.filter((e) => e.parent == undefined || e.parent == null));
        // const tagList = token.tags;
        // const filtered1 = tagList.filter(item =>
        //   item.filter(c => c.parent != undefined && c.parent != null)
        // );

        // const filtered2 = tagList.filter(item =>
        //   item.filter(c => c.parent == undefined || c.parent == null)
        // );

      }));

    });

    // setFilesList(response1.files);
  };

  const invoiceUploadHandler = ({ files }) => {
    setNsheID('');
    setFirstName('');
    setLastName('');
    setMiddleName('');
    const [file] = files;
    const fileReader = new FileReader();
    // console.log('files.name : ', files[0].name);
    fileReader.onload = (e) => {
      uploadInvoice(e.target.result, files[0]);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadInvoice = async (invoiceFile, file) => {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    console.log('FName : ' + file.name);
    let authToken = localStorage.getItem('authTok');
    let myHeaders = { 'Cookie': 'auth_token=' + authToken }

    document.cookie = "auth_token=" + authToken;
    const response = await fetch(`http://localhost:8101/docs-web/api/file`,
      // orders/${orderId}/uploadInvoiceFile
      {
        method: 'PUT',
        body: formData,
        headers: myHeaders,
        // headers: {
        //   'Cookie' : 'auth_token=' + authToken
        // },
        credentials: 'include'
      },
    );

    // const response1 = await fetch(`http://localhost:8101/docs-web/api/file/list`,
    // // orders/${orderId}/uploadInvoiceFile
    //     {
    //         method: 'GET',
    //         headers: myHeaders,
    //         // headers: {
    //         //   'Cookie' : 'auth_token=' + authToken
    //         // },
    //         credentials: 'include'
    //     },
    // );
    // console.log('response 1 : ' + response1);
    // setFilesList(response1.files);
    getFiles();

  };

  const [fileItem, setFileItem] = useState('');
  const handleUpdate = () => {
    // let authToken = localStorage.getItem('authTok');
    // let myHeaders = { 'Cookie': 'auth_token=' + authToken }

    // document.cookie = "auth_token=" + authToken;

    // // parentTag,    childTag, cities,  value
    // let updatedTime = moment().format('LTS');

    // let docURL = 'http://localhost:8101/api/document?create_date=' + updatedTime + '&description=' + value + ''
    //   + '&language=eng&tags=' + childTag + '&title=' + '';
    // fetch(docURL,
    //   {
    //     method: 'PUT',
    //     headers: myHeaders,
    //     credentials: 'include'
    //   },
    // ).then((response_1) => {
    //   console.log('Response : ' + response_1);
    //   response.json().then((resp) => {
    //     console.log('Token : ' + resp.id);
    //     localStorage.setItem('docID', resp.id);

    //   });
    // });

    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Document Saved Successfully.!' });

  }

  const gridColumns = [
    { field: '', header: 'Sl.No' },
    { field: 'name', header: 'File Name' },
    { field: 'size', header: 'File Size' },
    { field: 'create_date', header: 'Created' },
    { field: 'mimetype', header: 'File Type' }
  ];

  console.log('filesList : ' + filesList);
  // ===========================================================

  return (
    <>
      <Toast ref={toast} />
      {/* <NavLink to={'/'} /> */}
      {
        
          <>
            <div style={{ marginTop: '20px' }}>
              <div className=" flex-wrap justify-content-center  ">
                <span className="p-input-icon-right">
                  <i className="pi pi-search" />
                  <InputText placeholder=" Quick Search " />
                </span>
              </div>
            </div>
            <Card style={{ backgroundColor: "#f7f8fa", marginTop: '30px' }}>
              <p className="m-0">
                <div style={{ display: 'flex' }}>


                  {/*<div style={{gap:'20px',display:'flex'}}>
 <Button label="Department"onClick={() => setVisible(true)} icon="pi pi-angle-up" iconPos="right" style={{height:'50px',marginLeft:'800px',backgroundColor:'#00b9ff',borderColor:'Background',marginBottom:'10px'}} />
 <div className=" flex-wrap justify-content-center ">
 <span className="p-input-icon-right">
      <i className="pi pi-search" />
      <InputText placeholder="Search Forms" />
  </span>
  </div>
  </div>*/}
                </div>
              </p>
              <div className="grid">
                <div style={{ display: 'flex', gap: '20px' }} className='col-6'>

                  <Card className="card" title="Add Document" style={{ backgroundColor: '#f7f5ed', width: '95%', }}>

                    <div style={{ display: 'flex' }}>
                      <p style={{ fontWeight: 600, marginRight: 'auto' }}>Department</p>
                      <p style={{ marginLeft: 'auto' }}>
                        <Dropdown value={parentTag} onChange={(e) => setParentTag(e.value)} options={parentTagList} optionLabel="name"
                          placeholder="" className="w-full md:w-14rem" style={{ height: '35px', alignItems: 'center', justifyContent: 'center', width: '210px' }} /></p>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Sub Category </p>
                      <p style={{ marginLeft: 'auto' }}>
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                          placeholder="" className="w-full md:w-14rem" style={{ height: '35px', alignItems: 'center', justifyContent: 'center', width: '210px' }} /> </p>
                    </div>

                    <div style={{ display: 'flex', paddingTop: '1px' }}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Document Type</p>
                      <p style={{ marginLeft: 'auto' }}>
                        < Dropdown value={childTag} onChange={(e) => setChildTag(e.value)} options={childTagList} optionLabel="name"
                          placeholder="" className="w-full md:w-14rem" style={{ height: '35px', alignItems: 'center', justifyContent: 'center', width: '210px' }} /> </p>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Description</p>
                      <p style={{ marginLeft: 'auto', eidth: '20px' }}>
                        <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} /> </p>
                    </div>
                    <hr></hr>
                    <div style={{ marginTop: 'auto' }}>
                      <h3>Add Files</h3>
                      <Toast ref={toast}></Toast>

                      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                      {/* <FileUpload ref={fileUploadRef} name="demo[]" multiple webkitdirectory maxFileSize={1000000}
                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                    headerTemplate={headerTemplate} itemTemplate={getUploadFiles} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} 
                    uploadHandler={invoiceUploadHandler}
                    /> */}
                      <FileUpload name="demo[]" ref={fileUploadRef} multiple webkitdirectory maxFileSize={1000000} itemTemplate={getUploadFiles} headerTemplate={headerTemplate} customUpload={true} chooseOptions={chooseOptions} uploadOptions={uploadOptions}
                        cancelOptions={cancelOptions} uploadHandler={invoiceUploadHandler} emptyTemplate={emptyTemplate}
                        onSelect={onFileSelect}
                        onError={onTemplateClear} onClear={onTemplateClear} onUpload={onTemplateUpload}
                      />

                      <div style={{}}>
                        <Button label='Reset' icon='pi pi-pencil' onClick={() => handleReset()} autoFocus />
                        <Button label='Save' icon='pi pi-check' onClick={() => handleUpdate()} autoFocus />
                      </div>
                    </div>
                  </Card>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', columnGap: '20px', marginTop: 'auto' }} className='col-6'>
                  {/* <Card className="card" title=" Document view" style={{ backgroundColor: '#f7f5ed',width:'75%'}}>
   
</Card> */}
                  <Card className="card" title=" Quick upload" style={{ backgroundColor: '#eaf5fa', width: '100%', marginBottom: '25px', height: '440px' }}>
                    {filesList != undefined && filesList != null && filesList.length > 0 ?

                      <DataTable value={filesList} scrollable scrollHeight="300px" size="small" stripedRows
                        tableStyle={{ overflow: 'scroll', minWidth: "30rem", backgroundColor: '#f7f5ed' }}
                        selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id"
                        metaKeySelection={metaKey}>
                        <Column body={subStringId} header="ID" style={{ border: 'none', width: '25px' }}></Column>
                        <Column body={fileNameAction} header="File Name" style={{ border: 'none', width: '160px' }}></Column>
                        <Column body={viewAction} header="File Type" style={{ border: 'none', width: '100px' }}></Column>
                        <Column field="mimetype" header="File Type" style={{ border: 'none', width: '100px' }}></Column>
                        <Column body={sizeConstructor} header="Size " style={{ border: 'none', width: '60px' }}></Column>
                        <Column body={convertDate} header="Created Date " style={{ border: 'none', width: '120px' }}></Column>
                        <Column body={(e) => e.processing ? 'Awaiting Index' : 'Indexed'} header="Status" style={{ border: 'none' }}></Column>
                        {/* <Column field="inventoryStatus"     header="Status"  style={{border:'none'}}></Column> */}

                        {/* {gridColumns.map((col, i) => {
          <Column key={col.field} field={col.field} header={col.header} />
      })} */}
                      </DataTable> : <p>No Data</p>}

                  </Card>


                  <Card className="card" title="Tags" style={{ backgroundColor: '#eaf5fa', width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                      <p style={{ fontWeight: 600, marginRight: 'auto' }}> NSHE ID</p>
                      <p style={{ marginLeft: 'auto' }}>
                        <InputText value={nsheID} className="text-success" placeholder="" style={{ color: 'limegreen', height: '40px', width: '250px' }} /></p>
                    </div>

                    <div style={{ display: 'flex', paddingTop: '1px' }}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>First Name</p>
                      <p style={{ marginLeft: 'auto' }}>
                        <InputText value={firstName} tooltip="string" className="text-success" placeholder="" style={{ color: 'limegreen', height: '40px', width: '250px' }} /> </p>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Last Name</p>
                      <p style={{ marginLeft: 'auto' }}>
                        <InputText value={lastName} tooltip="string" className="text-success" placeholder="" style={{ color: 'limegreen', height: '40px', width: '250px' }} /> </p>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Middle Name</p>
                      <p style={{ marginLeft: 'auto' }}>
                        <InputText value={middleName} tooltip="string" className="text-success" placeholder="" style={{ color: 'limegreen', height: '40px', width: '250px' }} />  </p>
                    </div>

                    <div style={{ display: 'flex' }}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Visa Number</p>
                      <p style={{ marginLeft: 'auto' }}>
                        <InputText keyfilter="int" placeholder="" className="text-success" style={{ color: 'limegreen', height: '40px', width: '250px' }} /> </p>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
         </>
      }
 </>

  )
}