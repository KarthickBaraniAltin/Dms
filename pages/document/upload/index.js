
import React, { useRef, useState } from 'react';
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
import { InputTextarea } from 'primereact/inputtextarea';





export default function Home() {
    const [value, setValue] = useState('');
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
  



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


const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [metaKey, setMetaKey] = useState(true);

    const [customers, setCustomers] = useState([]);

     



const getUploadFiles = (file,props) => {
const url = URL.createObjectURL(file);
console.log(file.name)
return (
<>
  <div style={{ textAlign: 'left', display: 'flex' }} onClick={() => setShow(true)}>
    <img src={url} style={{ marginRight: 0 }} width={'40%'} height={'10%'} />
    <p style={{ paddingLeft: '10px' }}>{file.name}</p>
   {/* <Button style={{ paddingLeft: "25px", marginRight: '5px' ,marginLeft:'auto',width:"165px",height:'40px',justifyContent:'center'}} label="Add Document" onClick={() => setVisible(true)} />*/}
   <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" style={{marginLeft:'auto'}} onClick={() => onTemplateRemove(file, props.onRemove)} />
  </div>
  <Dialog header="Header" visible={show} style={{ width: '80vw' }} onHide={() => setShow(false)}>
    <Image src={url} alt="Image" width="100%" />
  </Dialog>
</>
);
};

const emptyTemplate = () => {
return (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginLeft:'auto',}}>
      <i className="pi pi-image  mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)', }}></i>
      <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)',}} className="my-5">  Drag and Drop Image Here
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
const cities = [
{ name: 'First', code: 'NY' },
{ name: 'Second', code: 'RM' },
{ name: 'Third', code: 'LDN' },
{ name: 'Fourth', code: 'IST' },
{ name: 'Fifth', code: 'PRS' }
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


const productsss = [
{
title: 'sample document(0)',
currentdocument: 'add relevent files to the document',
currentdate: '14 days ago',
id: "1000",
image: "bamboo-watch.jpg",
inventoryStatus: "INSTOCK",
name: "Bamboo Watch",
price: 65,
quantity: 24,
rating: 5,
},
];

const product = [
{
title: '1',
currentdocument: 'png',
currentdate: 'sample.png',
id: "12kb",
image: "12/12/2023",
inventoryStatus: "awaiting index",
name: "Bamboo Watch",
price: 65,
quantity: 24,
rating: 5,
},

{
title: '2',
currentdocument: 'png',
currentdate: 'sample.png',
id: "12kb",
image: "12/12/2023",
inventoryStatus: "awaiting index",
},
{
title: '3',
currentdocument: 'png',
currentdate: 'sample.png',
id: "12kb",
image: "12/12/2023",
inventoryStatus: "awaiting index",
},
{
title: '4',
currentdocument: 'png',
currentdate: 'sample.png',
id: "12kb",
image: "12/12/2023",
inventoryStatus: "awaiting index",
},
{
  title: '4',
  currentdocument: 'png',
  currentdate: 'sample.png',
  id: "12kb",
  image: "12/12/2023",
  inventoryStatus: "awaiting index",
  },
  {
    title: '4',
    currentdocument: 'png',
    currentdate: 'sample.png',
    id: "12kb",
    image: "12/12/2023",
    inventoryStatus: "awaiting index",
    },
    {
      title: '4',
      currentdocument: 'png',
      currentdate: 'sample.png',
      id: "12kb",
      image: "12/12/2023",
      inventoryStatus: "awaiting index",
      },
      {
        title: '4',
        currentdocument: 'png',
        currentdate: 'sample.png',
        id: "12kb",
        image: "12/12/2023",
        inventoryStatus: "awaiting index",
        },
        {
          title: '4',
          currentdocument: 'png',
          currentdate: 'sample.png',
          id: "12kb",
          image: "12/12/2023",
          inventoryStatus: "awaiting index",
          },
          {
            title: '4',
            currentdocument: 'png',
            currentdate: 'sample.png',
            id: "12kb",
            image: "12/12/2023",
            inventoryStatus: "awaiting index",
            }, {
              title: '4',
              currentdocument: 'png',
              currentdate: 'sample.png',
              id: "12kb",
              image: "12/12/2023",
              inventoryStatus: "awaiting index",
              },
                        
];

const productss = [
{
title: '1',
currentdocument: 'Apartmentrental',
id: "pdf",
image: "justification",
status: "xyz",
name: "icon",
},
{
title: '2',
currentdocument: 'student id',
id: "JPEG",
image: "ID",
status: "abc",
name: "icon",
},
{
title: '3',
currentdocument: 'Enrolment',
id: "pdf",
image: "Course proof",
status: "efg",
name: "icon",
},
];

const node = [
{
key: "0",
label: "Documents",
data: "Documents Folder",
icon: "pi pi-fw pi-inbox",
children: [
{
key: "0-0",
label: "student document",
data: "Work Folder",
icon: "pi pi-fw pi-cog",
children: [
  {
    key: "0-0-0",
    label: "Expenses.doc",
    icon: "pi pi-fw pi-file",
    data: "Expenses Document"
  },
  {
    key: "0-0-1",
    label: "Resume.doc",
    icon: "pi pi-fw pi-file",
    data: "Resume Document"
  }
]
},
{
key: "0-1",
label: "Demo",
data: "Home Folder",
icon: "pi pi-fw pi-home",
children: [
  {
    key: "0-1-0",
    label: "Invoices.txt",
    icon: "pi pi-fw pi-file",
    data: "Invoices for this month"
  }
]
}
]
},
{
key: "1",
label: "sample document",
data: "Events Folder",
icon: "pi pi-fw pi-calendar",
children: [
{
key: "1-0",
label: "invoice",
icon: "pi pi-fw pi-calendar-plus",
data: "Meeting"
},
{
key: "1-1",
label: "demo",
icon: "pi pi-fw pi-calendar-plus",
data: "Product Launch"
},
{
key: "1-2",
label: "Report Review",
icon: "pi pi-fw pi-calendar-plus",
data: "Report Review"
}
]
},
{
key: "2",
label: "Movies",
data: "Movies Folder",
icon: "pi pi-fw pi-star-fill",
children: [
{
key: "2-0",
icon: "pi pi-fw pi-star-fill",
label: "Al Pacino",
data: "Pacino Movies",
children: [
  {
    key: "2-0-0",
    label: "Scarface",
    icon: "pi pi-fw pi-video",
    data: "Scarface Movie"
  },
  {
    key: "2-0-1",
    label: "Serpico",
    icon: "pi pi-fw pi-video",
    data: "Serpico Movie"
  }
]
},
{
key: "2-1",
label: "Robert De Niro",
icon: "pi pi-fw pi-star-fill",
data: "De Niro Movies",
children: [
  {
    key: "2-1-0",
    label: "Goodfellas",
    icon: "pi pi-fw pi-video",
    data: "Goodfellas Movie"
  },
  {
    key: "2-1-1",
    label: "Untouchables",
    icon: "pi pi-fw pi-video",
    data: "Untouchables Movie"
  }
]
}
]
}
];
let selectedKey = {};
let setSelectedKey;
[selectedKey, setSelectedKey] = useState({});
const[state,setState]=useState(false)
return (
<>
{/* <NavLink to={'/'} /> */}
{
visible ?
<>
  <>
    {
        <>
          <Card className="card" header={header} style={{ marginTop: '5px',  backgroundColor: '#EEEEFD', display: 'flex', flexDirection: 'column',paddingTop:'5px' }}>
            <Details ingredient={ingredient} value={value} setValue={setValue} checked={checked} setChecked={setChecked} selectedCity={selectedCity} setSelectedCity={setSelectedCity} productss={productss}/>
          </Card>

        </>
    }
  </>
</>
:
<>
<div style={{marginTop:'20px'}}>
 <div className=" flex-wrap justify-content-center  ">
 <span className="p-input-icon-right">
      <i className="pi pi-search" />
      <InputText placeholder=" Quick Search " />
  </span>
  </div>
  </div>
<Card  style={{backgroundColor:"#f7f8fa",marginTop:'30px'}}>
<p className="m-0">
<div style={{display:'flex'}}>
 
 
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
<div style={{display:'flex',gap:'20px'}}>

<Card className="card"   style={{  backgroundColor: '#f7f5ed', width:'65%',}}>

                    <div style={{display:'flex'}}>
                      <p style={{ fontWeight: 600, marginRight: 'auto' }}>Department</p>
                     <p  style={{ marginLeft:'auto' }}>  
                     <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                      placeholder="" className="w-full md:w-14rem" style={{height:'35px',alignItems:'center',justifyContent:'center',width:'210px'}} /></p>
                    </div>

                    <div style={{display:'flex',paddingTop:'1px'}}>
                      <p style={{ fontWeight: 600, paddingRight:'auto' }}>Document Type</p>
                      <p style={{ marginLeft: 'auto'  }}>
                      < Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                     placeholder="" className="w-full md:w-14rem" style={{height:'35px',alignItems:'center',justifyContent:'center',width:'210px'}} /> </p>
                    </div>

                      <div style={{display:'flex'}}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Document</p>
                      <p  style={{ marginLeft: 'auto' }}>
                      <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                     placeholder="" className="w-full md:w-14rem" style={{height:'35px',alignItems:'center',justifyContent:'center',width:'210px'}}/> </p>
                    </div>

                      <div style={{display:'flex'}}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Description</p>
                       <p style={{ marginLeft: 'auto',eidth:'20px'  }}> 
                       <InputTextarea value={value}  onChange={(e) => setValue(e.target.value)} rows={5} cols={30} /> </p>
                    </div>
                   </Card>

   <Card className="card" title=" Quick upload" style={{ backgroundColor: '#eaf5fa',width:'70%'}}>
  <DataTable value={product} scrollable scrollHeight="300px"  size="small"  stripedRows tableStyle={{ minWidth: "30rem", backgroundColor: '#f7f5ed',overflow:'scroll' }}
  selectionMode="single"  selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey} >
      <Column field="title"           header="S.no"    style={{border:'none'}}></Column>
      <Column field="currentdocument" header="File type" style={{border:'none'}}></Column>
      <Column field="currentdate"      header="File name" style={{border:'none'}}></Column>
      <Column field="id"            header="Size "         style={{border:'none',}}></Column>
      <Column field="image"         header="Scan date "    style={{border:'none'}}></Column>
      <Column field="inventoryStatus"     header="Status"  style={{border:'none'}}></Column>
    

      </DataTable>
      
</Card>


</div>
<div style={{display:'flex',columnGap:'20px',marginTop:'20px'}}>
 
<Card className="card" title="Tags"  style={{  backgroundColor: '#eaf5fa', width:'70%'}}>
<div style={{display:'flex'}}>
                      <p style={{ fontWeight: 600, marginRight: 'auto' }}> NSHE ID</p>
                     <p  style={{ marginLeft:'auto' }}>  
                     <InputText value={value} onChange={(e) => setValue(e.target.value)}style={{height:'40px',width:'250px'}} /></p>
                    </div>

                    <div style={{display:'flex',paddingTop:'1px'}}>
                      <p style={{ fontWeight: 600, paddingRight:'auto' }}>First Name</p>
                      <p style={{ marginLeft: 'auto'  }}>
                      <InputText tooltip="string" placeholder=""style={{height:'40px',width:'250px'}} /> </p>
                  </div>

                      <div style={{display:'flex'}}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Last Name</p>
                      <p  style={{ marginLeft: 'auto' }}>
                      <InputText tooltip="string" placeholder=""style={{height:'40px',width:'250px'}} /> </p>
                    </div>

                      <div style={{display:'flex'}}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto' }}>Middle Name</p>
                       <p style={{ marginLeft: 'auto'  }}> 
                       <InputText tooltip="string" placeholder=""style={{height:'40px',width:'250px'}} />  </p>
                    </div>

                      <div style={{display:'flex'}}>
                      <p style={{ fontWeight: 600, paddingRight: 'auto'  }}>Visa Number</p>
                      <p style={{ marginLeft: 'auto'  }}> 
                      <InputText keyfilter="int" placeholder="" style={{height:'40px',width:'250px'}}/> </p>
                    </div>
  </Card>
   <Card className="card" title=" Document view" style={{ backgroundColor: '#f7f5ed',width:'75%'}}>
   <div>
  <Toast ref={toast}></Toast>

  <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
  <Tooltip target=".custom-upload-btn" content="Upload" position="bottom"  />
  <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

     <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple webkitdirectory maxFileSize={1000000}
      onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
      headerTemplate={headerTemplate} itemTemplate={getUploadFiles} emptyTemplate={emptyTemplate}
      chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} 
      />
      </div>
</Card>
</div>
</Card>

</>
}

</>

)
}