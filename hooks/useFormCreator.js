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

        setMainFormIds(renderForm().props.children.map(component => component.props.id))

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

    return { renderForm, addMetadata, metadata, setMetadata, mainFormIds, setMainFormIds, dragOverCapture}
}