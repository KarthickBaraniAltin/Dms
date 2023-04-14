import { Dialog } from "primereact/dialog"
import { InputText } from 'primereact/inputtext'
import { Button } from "primereact/button"
import { useState } from "react"

export default function StatusDialog({showDialog, handleStatus, api, id, acquireToken, loading}) {
    const [status, setStatus] = useState(0)

    const handleClick = async() => {
        setStatus(prevState => {
            return prevState === 0 ? 1 : 0
        })

        const accessToken = await acquireToken()

        const response = await fetch(`${api}/FormDefinition/${id}/${status}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })

        console.log('response:', response)
    }

    return (
        <>
            <Dialog header='Status Page' visible={showDialog} onHide={() => handleStatus()} style={{width: '75vw'}}>
                <div className='flex flex-column'>
                    <div style={{marginBottom: '0.5rem'}}>
                        <div className='flex flex-column'>
                            <label>Current Status</label>
                            <InputText value={status === 0 ? 'ACTIVE' : 'DISABLED'} style={{backgroundColor: status === 0 ? 'green' : 'red', color: 'white', width: '7%'}} />
                        </div>
                    </div>
                    <Button label='Change' style={{width: '100px'}} loading={loading} onClick={handleClick} />
                </div>
            </Dialog>
        </>
    )
}