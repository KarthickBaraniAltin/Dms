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
            if (components[i].props.children.type === 'label') {
                componentList.push(
                    <div>
                        {components[i].props.children.props.children}
                    </div>
                )

                continue
            }

            componentList.push(
            <div key={i} style={{'display': 'flex', 'gap': '2rem', 'margin-bottom': '1rem'}}>
                <div style={{'width': '100px'}}>
                    {labelList[i]}
                    {subtitleList[i]}
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