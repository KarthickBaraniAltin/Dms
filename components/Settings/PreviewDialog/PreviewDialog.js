import { Dialog } from "primereact/dialog"

export default function PreviewDialog({ showDialog, handlePreview, metadata }) {

    let labelList = []
    let inputFieldList = []
    let subtitleList = []
    let componentList = []
    const components = metadata?.props?.children

    if (metadata.props.children) {
        labelList = components.map(component => {
            return <div>{component.props.children.props.children[1]}</div>
        })

        inputFieldList = components.map(component => {
            return <div>{component.props.children.props.children[2]}</div>
        })

        subtitleList = components.map(component => {
            return <div>{component.props.children.props.children[4]}</div>
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
            <Dialog header='Preview Form Page' visible={showDialog} onHide={() => handlePreview()} style={{width: '50vw'}}>
                <div className='flex justify-content-center'>
                    <div>
                        {metadata.props.children ?
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