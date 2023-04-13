import { Dialog } from "primereact/dialog"
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from "primereact/button"

export default function SaveDialog({showDialog, handleSave, updateForm, loading, name, setName, desc, setDesc, metadata}) {
    const areComponentsEmpty = (e) => {
        for (const property in metadata) {
            if (metadata[property].type === 'multiselect' || metadata[property].type === 'dropdown'  
            || metadata[property].type === 'checkbox' || metadata[property].type === 'radiobutton') {
                if (metadata[property].options.length === 0) {
                    alert(`Cannot leave ${metadata[property].type} empty`)
                    handleSave()
                    return
                }
            }
        }

        updateForm(e, name, desc)
    }

    return (
        <>
            <Dialog header='Save Page' visible={showDialog} onHide={() => handleSave()} style={{width: '75vw'}}>
                <div className='flex flex-column'>
                    <div style={{marginBottom: '0.5rem'}}>
                        <div className='flex flex-column mb-2'>
                            <label>Form Definition Name</label>
                            <InputText value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-column'>
                            <label>Form Definition Description</label>
                            <InputTextarea value={desc} onChange={e => setDesc(e.target.value)} />
                        </div>
                    </div>
                    <Button label='Submit' style={{width: '100px'}} loading={loading} onClick={e => areComponentsEmpty(e)} />
                </div>
            </Dialog>
        </>
    )
}