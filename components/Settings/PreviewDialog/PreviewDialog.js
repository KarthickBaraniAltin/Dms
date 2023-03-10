import { Dialog } from "primereact/dialog"
import { useCreateItems } from "../../../hooks/useCreateItems"

/* 
    - A one column component should be able to take up a whole row on the form with out another one column component stacking next to it.
    - The dropdown (and probably multiselect component) need to align with the rest of the components (issue is probably with the width of the input field).
    - The height of the input fields need to be consistent (currently the height is determined by the height of the label and subtitle to the left of the field).
    - The label and subtitle need to be right aligned within their div.
*/

export default function PreviewDialog({ showDialog, handlePreview, metadata, setMetadata }) {
    let componentList = []
    const { renderComponents } = useCreateItems({ metadata, setMetadata })

    metadata.map(element => {
        const { name, label, type, subtitle, subtitleComponent, fontStyle, ...rest } = element

        componentList.push(
            <div className={rest?.columnSize?.value ?? 'field col-12'}>
                <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}>
                    {renderComponents(metadata, 1)}
                </div>
            </div>
        )
    })

    return (
        <>
            <Dialog header='Preview Form Page' visible={showDialog} onHide={() => handlePreview()} style={{width: '75vw'}}>
                <div className='flex justify-content-center'>
                    <div>
                        {componentList.length > 0 ?
                            <div className='grid'>
                                {componentList}
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </Dialog>
        </>
    )
}