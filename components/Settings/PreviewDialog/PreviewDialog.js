import { Dialog } from "primereact/dialog"
import ViewComponents from "../../ViewComponents/ViewComponents/ViewComponents"

/* 
    - A one column component should be able to take up a whole row on the form with out another one column component stacking next to it.
    - The dropdown (and probably multiselect component) need to align with the rest of the components (issue is probably with the width of the input field).
    - The height of the input fields need to be consistent (currently the height is determined by the height of the label and subtitle to the left of the field).
    - The label and subtitle need to be right aligned within their div.
*/

export default function PreviewDialog({ showDialog, handlePreview, metadata, handleInputChange, inputs, errors }) {

    return (
        <>
            <Dialog header='Preview Form Page' visible={showDialog} onHide={() => handlePreview()} style={{width: '60%'}}>
                <ViewComponents metadata={metadata} inputs={inputs} handleInputChange={handleInputChange} errors={errors} />
            </Dialog>
        </>
    )
}