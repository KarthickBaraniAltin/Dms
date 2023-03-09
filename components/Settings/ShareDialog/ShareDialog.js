import { Dialog } from "primereact/dialog"
import { InputText } from 'primereact/inputtext'
import { Button } from "primereact/button"

export default function ShareDialog({showDialog, handleShare, formSubmitResult}) {
    const [domain] = window.location.host.split('/')
    const currentURL = `http://${domain}/form-builder-studio/view/${formSubmitResult.data.id}`

    const handleLinkCopy = async() => {
        try {
            await navigator.clipboard.writeText(currentURL)
            alert('Link copied to clipboard successfully')
        } catch (err) {
            console.error('Failed to copy link', err)
        }
    }

    const handleNewTab = () => {
        window.open(currentURL, '_blank')
    }

    return (
        <>
            <Dialog header='Share Page' visible={showDialog} onHide={() => handleShare()} style={{width: '75vw'}}>
                <div className='flex flex-column justify-content-center'>
                    <InputText value={currentURL} disabled />
                    <div style={{margin: '0.5rem 0'}}>
                        <Button label='Copy Link' onClick={handleLinkCopy} style={{marginRight: '0.25rem'}} />
                        <Button label='Open in new tab' onClick={handleNewTab} />
                    </div>
                    <div className='flex'>
                        <h4 style={{margin: 0}}>Form Definition Id:</h4>
                        <div style={{alignSelf: 'center', marginLeft: '0.5rem'}}>{formSubmitResult.data.id}</div>
                    </div>
                    <div className='flex'>
                        <h4 style={{margin: 0}}>Author Id:</h4>
                        <div style={{alignSelf: 'center', marginLeft: '0.5rem'}}>{formSubmitResult.data.authorId}</div>
                    </div>
                    <div className='flex'>
                        <h4 style={{margin: 0}}>Name:</h4>
                        <div style={{alignSelf: 'center', marginLeft: '0.5rem'}}>{formSubmitResult.data.name}</div>
                    </div>
                    <div className='flex'>
                        <h4 style={{margin: 0}}>Date Created:</h4>
                        <div style={{alignSelf: 'center', marginLeft: '0.5rem'}}>{formSubmitResult.data.dateCreated}</div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}