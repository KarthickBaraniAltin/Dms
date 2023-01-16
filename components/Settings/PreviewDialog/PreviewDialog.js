import { Dialog } from "primereact/dialog"

export default function PreviewDialog({ showDialog, handlePreview, metadata }) {

    let labelList = []
    let inputFieldList = []
    let subtitleList = []
    let componentList = []
    const components = metadata?.props?.children

    components.map(component => {
        if (component.props.children.length === 2) { // Checks to see if component is section component.
            labelList.push(component.props.children[0])
            inputFieldList.push(component.props.children[1])
            subtitleList.push(null) // Required for subtitle to appear in non-section components.
            return
        }
        labelList.push(component.props.children.props.children[1])
        inputFieldList.push(component.props.children.props.children[2])
        subtitleList.push(component.props.children.props.children[4])
    })

    for (let i = 0; i < components.length; i++) {
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

    // if (metadata.props.children) {
    //     labelList = components.map(component => {
    //         return <div>{component.props.children.props.children[1]}</div>
    //     })

    //     inputFieldList = components.map(component => {
    //         return <div>{component.props.children.props.children[2]}</div>
    //     })

    //     subtitleList = components.map(component => {
    //         return <div>{component.props.children.props.children[4]}</div>
    //     })

    //     for (let i = 0; i < components.length; i++) {
    //         if (components[i].props.children.type === 'label') {
    //             componentList.push(
    //                 <div>
    //                     {components[i].props.children.props.children}
    //                 </div>
    //             )

    //             continue
    //         }

    //         componentList.push(
    //         <div key={i} style={{'display': 'flex', 'gap': '2rem', 'margin-bottom': '1rem'}}>
    //             <div style={{'width': '100px'}}>
    //                 {labelList[i]}
    //                 {subtitleList[i]}
    //             </div>
    //             {inputFieldList[i]}
    //         </div>
    //         )
    //     }
        
    // }