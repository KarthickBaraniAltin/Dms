import { Dialog } from "primereact/dialog"
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from "primereact/button"
import { useState } from "react"

export default function SaveButton({updateForm, loading, metadata, formDefinition, setFormDefinition}) {
    const [showDialog, setShowDialog] = useState(false)

    function handleSave() {
        setShowDialog(prevState => !prevState)
    }

    const submitForm = async (e) => {
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

        if (await updateForm(e)) {
            setShowDialog(false)
        }
    }

    return (
            <>
                <Button label='Save' style={{width: '90px'}} onClick={handleSave} />
                {showDialog &&  
                  <Dialog header='Save Page' visible={showDialog} onHide={() => handleSave()} style={{width: '60%'}}>
                    <div className='flex flex-column'>
                        <div className="mb-1">
                            <div className='flex flex-column mb-2'>
                                <label>Form Definition Name</label>
                                <InputText value={formDefinition?.name} onChange={e => setFormDefinition((prev) => ({...prev, name: e.target.value}))} />
                            </div>
                            <div className='flex flex-column'>
                                <label>Form Definition Description</label>
                                <InputTextarea autoResize value={formDefinition?.description} onChange={e => setFormDefinition((prev) => ({...prev, description: e.target.value}))} />
                            </div>
                        </div>
                        <Button label='Submit' style={{width: '100px'}} loading={loading} onClick={e => submitForm(e)} />
                    </div>
                </Dialog>
                }
            </>
        
    )
}