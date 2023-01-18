import { useState } from "react"
import { Card } from 'primereact/card'
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

export const useShowForm = () => {
    
    const [newForm, setNewForm] = useState(false)
    const [formTitle, setFormTitle] = useState('')

    function handleNewForm() {
        setNewForm(true)
    }

    const renderNewFormCard = () => {
        return (
            <>
                <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                    <h5 style={{marginBottom: '0.25rem', fontSize: '1rem'}}>Create new form</h5>
                    <InputText
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className='mr-2'
                    />
                    <Button label='Get started' onClick={handleNewForm} />
                </Card>
            </>
        )
    }

    return { newForm, formTitle, renderNewFormCard }
}