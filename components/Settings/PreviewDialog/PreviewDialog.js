import { Dialog } from "primereact/dialog"
import { usePreviewCreator } from "../../../hooks/usePreviewCreator"
import { Card } from "primereact/card"

export default function PreviewDialog({ showDialog, handlePreview, metadata }) {

    let labelList = []
    let inputFieldList = []
    let subtitleList = []
    let componentList = []
    const { renderPreview } = usePreviewCreator({metadata})
    const components = renderPreview()?.props?.children

    components.map(component => {
        if (component.props.children.length === 2) { // Checks to see if component is section component.
            labelList.push(component.props.children[0])
            inputFieldList.push(component.props.children[1])
            subtitleList.push(null) // Required for subtitle to appear in non-section components.
            return
        }
        labelList.push(component.props.children.props.children[0])
        inputFieldList.push(component.props.children.props.children[1])
        subtitleList.push(component.props.children.props.children[3])
    })

    console.log('components:', components)

    for (let i = 0; i < components.length; i++) {
        if (metadata[i].type === 'header') {
            componentList.push(
                <div>
                    <Card style={{'background': '#004990', 'color': 'white', 'marginBottom': '0.5rem'}}>
                        <h1 style={{'textAlign': 'center'}}>{metadata[i].label}</h1>
                    </Card>
                </div>
            )
        }

        if (components[i].props.children.length === 2) { // Checks to see if component is section component.
            componentList.push(
                <div>
                    <h3>
                        {labelList[i]}
                    </h3>
                    {inputFieldList[i].map(element => {
                        return (
                            <div key={i} style={{display: 'flex', gap: '2rem', marginBottom: '2rem'}}>
                                <div style={{width: '100px'}}>
                                    {element.props.children[0]}
                                    {element.props.children[2]}
                                </div>
                                {element.props.children[1]}
                            </div>
                        )
                    })}
                </div>
            )
            continue
        }
        componentList.push(
            <div key={i} style={{display: 'flex', gap: '2rem', marginBottom: '1rem'}}>
                <div style={{width: '100px'}}>
                    {labelList[i]}
                    {subtitleList[i]}
                </div>
                {inputFieldList[i]}
            </div>
        )
    }

    return (
        <>
            <Dialog header='Preview Form Page' visible={showDialog} onHide={() => handlePreview()} style={{width: '50vw'}}>
                <div className='flex justify-content-center'>
                    <div>
                        {componentList.length > 0 ?
                            <div className='flex flex-column'>
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