import { Dialog } from "primereact/dialog"
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from "primereact/button"
import { useState } from "react"

export default function SaveButton({ updateForm, loading, metadata, formDefinition, setFormDefinition }) {
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

    console.log("Form Definition = ", formDefinition)

    return (
        <>
            <Button label='Save' style={{ width: '90px' }} onClick={handleSave} />
            {showDialog &&
                <Dialog header='Save Page' visible={showDialog} onHide={() => handleSave()} style={{ width: '60%' }}>
                    <div className='grid grid-nogutter'>
                        <div className="col-12 grid grid-nogutter mb-1">
                            <div className='col-12 grid grid-nogutter'>
                                <label className='col-12' >Name</label>
                                <InputText className='col-12 padding-input-text' value={formDefinition?.name} onChange={e => setFormDefinition((prev) => ({ ...prev, name: e.target.value }))} />
                            </div>
                            <div className='col-12 grid grid-nogutter mt-2'>
                                <label className='col-12'>Description</label>
                                <InputTextarea className='col-12 padding-input-text' autoResize value={formDefinition?.description} onChange={e => setFormDefinition((prev) => ({ ...prev, description: e.target.value }))} />
                            </div>
                            <div className='col-12 grid grid-nogutter'>
                                <label className='co-12 mt-2'>Footer</label>
                                <InputText className='col-12 padding-input-text' value={formDefinition?.footer} onChange={e => setFormDefinition((prev) => ({ ...prev, footer: e.target.value }))} />
                            </div>
                        </div>
                        <Button className="mt-4" label='Submit' style={{ width: '100px' }} loading={loading} onClick={e => submitForm(e)} />
                    </div>
                </Dialog>
            }
        </>

    )
}