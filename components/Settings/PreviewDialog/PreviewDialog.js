import { Dialog } from "primereact/dialog"

export default function PreviewDialog({ showDialog, handlePreview, metadata }) {

    let labelList = []
    let inputFieldList = []
    let subtitleList = []
    let componentList = []
    const components = metadata?.props?.children

    console.log('components:', components)

    // if (metadata.props.children) {
    //     components.map(component => {
    //         if (component.props.children.length === 2) {
    //             labelList.push(<div>{component.props.children[0].props}</div>)
    //             inputFieldList.push(component.props.children[1].map(element => <div>{element}</div>))
    //         }
    //     })

    //     for (let i = 0; i < components.length; i++) {
    //         componentList.push(
    //             <div key={i}>
    //                 {labelList[i]}
    //                 {inputFieldList[i]}
    //             </div>
    //         )
    //     }
    // }

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

    // console.log('componentList:', componentList)
    // console.log('labelList:', labelList)
    // console.log('inputFieldList:', inputFieldList)

    return (
        <>
            <Dialog header='Preview Form Page' visible={showDialog} onHide={() => handlePreview()} style={{width: '50vw'}}>
                <div className='flex justify-content-center'>
                    <div>
                        {metadata.props.children ?
                            <div className='flex flex-column'>
                                {/* {componentList} */}
                                {metadata.props.children}
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