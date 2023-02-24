import { Dialog } from "primereact/dialog"
import { useRenderItems } from "../../../hooks/useRenderItems"

export default function PreviewDialog({ showDialog, handlePreview, metadata, setMetadata, headerImage, handleHeaderImage}) {
    let componentList = []
    const { renderLabel, renderCreateElements, renderSubtitle } = useRenderItems({ metadata, setMetadata, headerImage, handleHeaderImage })

    let numOfRows = 0
    let pastId = null
    const rowList = []

    for (let i = 0; i < metadata.length; i++) { // Finds the number of rows
        if (metadata[i].id.slice(0, 5) !== pastId) {
            numOfRows++
            pastId = metadata[i].id.slice(0, 5)
        }
    }

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
            console.log('element:', element)
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
            <div style={{display: 'flex', gap: '2rem', marginBottom: '1rem'}}>
                <div style={{width: '100px'}}>
                    {renderLabel(null, label, null, true)}
                    {renderSubtitle(subtitle, subtitleComponent)}
                </div>
                {renderCreateElements(type, name, rest, fontStyle)}
            </div>
        )
    })

    console.log('componentList:', componentList)

    for (let i = 0; i < numOfRows; i++) { // Each iteration is one row
        const tempArray = metadata.filter(component => component.id.slice(4, 5) == i + 1);
    
        const row = (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem'}}>
                {tempArray.map(component => (
                    <div key={component.id} style={{ display: 'flex', marginBottom: '4rem'}}>
                        <div style={{ width: '100px' }}>
                            {renderLabel(null, component.label, null, true)}
                            {renderSubtitle(component.subtitle, component.subtitleComponent)}
                        </div>
                        {renderCreateElements(component.type, component.name, component.rest, component.fontStyle)}
                    </div>
                ))}
            </div>
        );
    
        rowList.push(row);
        // const tempArray = []

        // metadata.map(component => { // This assigns all the components assigned to the current row to tempArray
        //     if (component.id.slice(4, 5) == i + 1) {
        //         tempArray.push(component)
        //     }
        // })

        // console.log(tempArray)

        // rowList.push(
        //     <div style={{display: 'flex', justifyContent: 'space-between'}}>
        //         {tempArray}
        //     </div>
        // ) // Now we should have an array where each element is an array of components that correspond to a row
    }

    console.log('rowList:', rowList)
    return (
        <>
            <Dialog header='Preview Form Page' visible={showDialog} onHide={() => handlePreview()} style={{width: '75vw'}}>
                <div className='flex justify-content-center'>
                    <div>
                        {componentList.length > 0 ?
                            <div className='flex flex-column'>
                                {rowList.map((row, index) => (
                                    <div key={index}>
                                        {row}
                                    </div>
                                ))}
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