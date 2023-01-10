import { Dialog } from "primereact/dialog"

export default function PreviewDialog({ showForm, handlePreview, metadata }) {

    let labelList = []
    let inputFieldList = []
    let subtitleList = []
    let componentList = []
    const components = metadata?.props?.children
    console.log('metadata.props.children:', metadata.props.children)

    if (metadata.props.children) {
        labelList = components.map(component => {
            return <div>{component.props.children[1]}</div>
        })

        inputFieldList = components.map(component => {
            return <div>{component.props.children[2]}</div>
        })

        subtitleList = components.map(component => {
            return <div>{component.props.children[4]}</div>
        })

        for (let i = 0; i < components.length; i++) {
            componentList.push(
            <div style={{'display': 'flex', 'justify-content': 'space-between', 'gap': '2rem', 'margin-bottom': '1rem'}}>
                <div>
                    {labelList[i]}
                    {subtitleList[i]}
                </div>
                <div>
                    
                </div>
                {inputFieldList[i]}
            </div>
            )
        }
        
    }

    return (
        <>
            <Dialog header='Preview Form Page' visible={showForm} onHide={() => handlePreview()} style={{width: '50vw'}}>
                <div className='flex justify-content-center'>
                    <div>
                        {/* {metadata?.props?.children} */}
                        {metadata.props.children ?
                            <div className='flex flex-column'>
                                {/* {labelList}
                                {inputFieldList} */}
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