import { Dialog } from "primereact/dialog"
import { useRenderItems } from "../../../hooks/useRenderItems"

export default function PreviewDialog({ showDialog, handlePreview, metadata, setMetadata, headerImage, handleHeaderImage}) {
    let componentList = []
    const { renderLabel, renderCreateElements, renderSubtitle } = useRenderItems({ metadata, setMetadata, headerImage, handleHeaderImage })

    metadata.map(element => {
        const { name, label, type, subtitle, subtitleComponent, fontStyle, ...rest } = element
        if (element.type === 'header') {
            componentList.push(
                <div>
                    {renderLabel(element, label, type, true, true)}
                </div>
            )
            return
        }

        if (element.type === 'section') {
            componentList.push(
                <div>
                    <h3>{renderLabel(null, label, type, true)}</h3>
                    {element.sectionMetadata.map(component => {
                        const { name, label, type, subtitle, subtitleComponent, fontStyle, ...rest } = component
                        return (
                            <div style={{display: 'flex', gap: '2rem', marginBottom: '2rem'}}>
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
                <div style={{display: 'flex', justifyContent:'center', rowGap: '0.5rem'}}>
                    <div style={{width: '100px'}}>
                        {renderLabel(null, label, null, true)}
                        {renderSubtitle(subtitle, subtitleComponent)}
                    </div>
                    {renderCreateElements(type, name, rest, fontStyle)}
                </div>
            </div>
        )
    })

    console.log('metadata:', metadata)
    console.log('componentList:', componentList)

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