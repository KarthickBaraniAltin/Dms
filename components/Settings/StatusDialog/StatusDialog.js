import { Dialog } from "primereact/dialog"
import { InputText } from 'primereact/inputtext'
import { Button } from "primereact/button"
import { useState } from "react"

export default function StatusDialog({showDialog, handleStatus, updateForm, loading}) {
    const [status, setStatus] = useState('ACTIVE')

    const handleClick = () => {
        setStatus(prevState => {
            return prevState === 'ACTIVE' ? 'DISABLED' : 'ACTIVE'
        })
    }

    return (
        <>
            <Dialog header='Status Page' visible={showDialog} onHide={() => handleStatus()} style={{width: '75vw'}}>
                <div className='flex flex-column'>
                    <div style={{marginBottom: '0.5rem'}}>
                        <div className='flex flex-column'>
                            <label>Current Status</label>
                            <InputText value={status} style={{backgroundColor: status === 'ACTIVE' ? 'green' : 'red', color: 'white', width: '7%'}} />
                        </div>
                    </div>
                    <Button label='Change' style={{width: '100px'}} loading={loading} onClick={handleClick} />
                </div>
            </Dialog>
        </>
    )
}