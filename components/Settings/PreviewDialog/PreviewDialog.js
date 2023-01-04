import { Dialog } from "primereact/dialog"
import { useFormCreator } from "../../../hooks/useFormCreator"

export default function PreviewDialog({ showForm, handlePreview, metadata }) {
    console.log('Metadata:', metadata)

    return (
        <>
            <Dialog header='Preview Form Page' visible={showForm} onHide={() => handlePreview()} style={{width: '50vw'}}>
                <div className='flex justify-content-center'>
                    <div>
                        {metadata?.props?.children}
                    </div>
                </div>
            </Dialog>
        </>
    )
}