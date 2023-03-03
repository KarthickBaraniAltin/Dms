import { Dialog } from "primereact/dialog"
import { useRenderItems } from "../../../hooks/useRenderItems"
import { useInputs } from "../../../hooks/useInput"

/* 
    - A one column component should be able to take up a whole row on the form with out another one column component stacking next to it.
    - The dropdown (and probably multiselect component) need to align with the rest of the components (issue is probably with the width of the input field).
    - The height of the input fields need to be consistent (currently the height is determined by the height of the label and subtitle to the left of the field).
    - The label and subtitle need to be right aligned within their div.
*/

export default function PreviewDialog({ showDialog, handlePreview, metadata, setMetadata, headerImage, handleHeaderImage}) {
    let componentList = []
    const { handleInputChange, inputs } = useInputs()
    const { renderLabel, renderCreateElements, renderSubtitle, renderErrors } = useRenderItems({ metadata, setMetadata, headerImage, handleHeaderImage, handleInputChange, inputs })

    metadata.map(element => {
        const { name, label, type, subtitle, subtitleComponent, fontStyle, ...rest } = element
        if (element.type === 'header') {
            componentList.push(
                <div className="field col-12">
                    {renderLabel(element, label, type, true, true)}
                </div>
            )
            return
        }

        if (element.type === 'section') {
            componentList.push(
                <div>
                    <h3>{renderLabel(null, label, type, true)}</h3>
                    {element.sectionMetadata.map((component, index) => {
                        const { name, label, type, subtitle, subtitleComponent, fontStyle, ...rest } = component
                        return (
                            <div key={index} style={{display: 'flex', gap: '2rem', marginBottom: '2rem'}}>
                                <div style={{width: '100px'}}>
                                    {renderLabel(null, label, null, true)}
                                    {renderSubtitle(subtitle, subtitleComponent)}
                                </div>
                                {renderCreateElements(type, name, rest, fontStyle)}
                            </div>
                        )
                    })}
                </div>
            )

            return
        }

        componentList.push(
            <div className={rest?.columnSize?.value ?? 'field col-12'}>
                <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}>
                    <div style={{width: '100px'}}>
                        {renderLabel(null, label, null, true)}
                        {renderSubtitle(subtitle, subtitleComponent)}
                    </div>
                    <div className='flex flex-column'>
                        {renderCreateElements(type === 'signature' ? 'signatureDisplay' : type, name, rest, fontStyle)}
                        {renderErrors(name)}
                    </div>
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