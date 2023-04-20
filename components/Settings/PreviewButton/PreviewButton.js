import { Dialog } from "primereact/dialog"
import ViewComponents from "../../ViewComponents/ViewComponents/ViewComponents"
import { Button } from "primereact/button"
import { useState } from "react"

export default function PreviewButton({ metadata, handleInputChange, inputs, errors, assignValuesNested }) {
    const [showDialog, setShowDialog] = useState(false)

    function handlePreview() {
        setShowDialog(prevState => !prevState)
    }

    return (
        <>
            <Button label='Preview' style={{width: '90px'}} onClick={handlePreview} />
            {   showDialog &&
                <Dialog header='Preview Form Page' visible={showDialog} onHide={() => handlePreview()} style={{width: '60%'}}>
                    <ViewComponents 
                        metadata={metadata} 
                        inputs={inputs} 
                        handleInputChange={handleInputChange} 
                        errors={errors}
                        assignValuesNested={assignValuesNested} 
                    />
                </Dialog>
            }
        </>
    )
}