import useDialogs from './useDialogs'
import { useEffect, useState, useRef } from 'react'
import { Sortable } from '../components/DndComponents/Sortable'
import { useInputs } from './useInput'
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { Droppable } from '../components/DndComponents/Droppable'
import { useRenderItems } from './useRenderItems'

export const useFormCreator = ({ headerImage, handleHeaderImage }) => {

    const [ metadata, setMetadata ] = useState([])
    const { inputs, setInputs } = useInputs({})
    const { renderDialog } = useDialogs({ metadata, setMetadata })
    const { renderLabel, renderComponents, renderTestComponents } = useRenderItems({ metadata, setMetadata, headerImage, handleHeaderImage })

    // These variables are for DND
    const [mainFormIds, setMainFormIds] = useState([])
    const [sectionIds, setSectionIds] = useState([])
    const dragOverCapture = useRef()

    // These variables are for pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(pageNumber)

    let numOfRows = 0

    useEffect(() => {
        metadata.forEach(element => {
            element.page = pageNumber

            /* Used to erase entries in inputs object for deleted components */
            const inputKeysArray = Object.keys(inputs)
            // console.log('element:', element)
            // console.log('inputKeysArray:', inputKeysArray)
            if (!(element.name in inputKeysArray)) {
                // console.log('inputs(useEffect):', inputs)
            }
            /* Used to erase entries in inputs object for deleted components */

            if (element.defaultValue) {
                setInputs(inputs => ({...inputs, [element.name]: element.defaultValue}))
            }
        })

        // setMainFormIds(renderTestForm().props.children.map(component => component.props.id))

        const sectionIdArray = []
        metadata.map(component => {
            if (component.type === undefined) {
                return
            }
            if (component.type === 'section') {
                sectionIdArray.push({
                    id: component.name,
                    componentData: component.sectionMetadata.length > 0 ? component.sectionMetadata.map(sectionComponent => sectionComponent.id) : []
                })
            }
        })

        setSectionIds(sectionIdArray)
    }, [metadata])

    const addMetadata = (data) => {
        setMetadata((prevList) => [...prevList, data])
    }

    const changePage = () => {
        setCurrentPage()
    }

    const addPage = () => {
        setPageNumber()
    }

    const renderForm = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, sectionMetadata, ...rest } = data
                    if (type === 'section') {
                        let sectionIdsForDroppable = sectionIds.find(element => element?.id === name)
                        sectionIdsForDroppable = sectionIdsForDroppable?.componentData ? sectionIdsForDroppable.componentData : []
                        console.log('data(section in renderForm):', data)
                        console.log('sectionIdsForDroppable:', sectionIdsForDroppable)
                        return (
                            <Sortable key={index} id={index + 1}>
                            <div className='field col-12'>
                                <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div>
                                {renderDialog()}
                                {renderLabel(data, label, type)}
                                <div>
                                    <Droppable id={name}>
                                        <SortableContext
                                            items={sectionIdsForDroppable}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            
                                            {renderComponents(sectionMetadata, null, true)}
                                        </SortableContext>
                                    </Droppable>
                                </div>
                            </div>
                            </Sortable>
                        )
                    }

                    return renderComponents(data, index)
                })}
            </>
        )
    }

    const renderTestForm = () => {
        console.log('metadata:', metadata)
        let numOfRows = 0
        let pastId = null
        const rowList = []

        for (let i = 0; i < metadata.length; i++) { // Finds the number of rows
            if (metadata[i].id.slice(0, 5) !== pastId) {
                numOfRows++
                pastId = metadata[i].id.slice(0, 5)
            }
        }

        console.log('numOfRows:', numOfRows)

        for (let i = 0; i < numOfRows; i++) { // Each iteration is one row
            const tempArray = []

            metadata.map(component => { // This assigns all the components assigned to the current row to tempArray
                if (component.id.slice(4, 5) == i + 1) {
                    tempArray.push(component)
                }
            })

            console.log(tempArray)

            rowList.push(tempArray) // Now we should have an array where each element is an array of components that correspond to a row
        }

        console.log('rowList:', rowList)

        return rowList.map((rowComponents, index) => {
            return (
                <Sortable key={index} id={index + 1}>
                    <Droppable id={`row_${index + 1}`}>
                        <SortableContext
                            items={[]}
                            strategy={horizontalListSortingStrategy}
                        >
                            <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
                            {renderTestComponents(rowComponents)}
                            </div>
                        </SortableContext>
                    </Droppable>
                </Sortable>
            )
        })

        // metadata.map((component, index) => {
        //     console.log('component:', component)
        //     if (true) { // component.id.slice(6) !== 'col_2'
        //         const { name, type, label, subtitle, subtitleComponent, fontStyle, ...rest } = component
        //         sectionList.push(
        //             <Sortable key={index} id={index + 1}>
        //                 <Droppable id={`row_${index + 1}`}>
        //                     <SortableContext
        //                         // items={[`${index + 1}_1`]}
        //                         items={[]}
        //                         strategy={horizontalListSortingStrategy}
        //                     >
        //                         {/* {renderComponents(component, `${index + 1}_1`)} */}
        //                         {renderTestComponents(metadata, index)}
        //                     </SortableContext>
        //                 </Droppable>
        //             </Sortable>
        //         )
        //     }
        // })

        // for (let count = 0; count < metadata.length; count++) {
        //     console.log('component:', metadata[count])
        //     if (metadata[count].id.slice(6) !== 'col_2') { // component.id.slice(4, 5) == counter && 
        //         // const { name, type, label, subtitle, subtitleComponent, fontStyle, ...rest } = metadata[count]
        //         // console.log('count:', count)
        //         return (
        //             <Sortable key={count} id={count}>
        //                 <Droppable id={`row_${count + 1}`}>
        //                     <SortableContext
        //                         // items={[`${counter}_1`]}
        //                         items={[]}
        //                         strategy={horizontalListSortingStrategy}
        //                     >
        //                         {/* {renderComponents(component, `${counter}_1`)} */}
        //                         {renderTestComponents(metadata, count)}
        //                     </SortableContext>
        //                 </Droppable>
        //             </Sortable>
        //         )
        //     }
        // }
    }

    return { renderForm, renderTestForm, addMetadata, metadata, setMetadata, mainFormIds, setMainFormIds, dragOverCapture}
}