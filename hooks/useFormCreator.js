import useDialogs from './useDialogs'
import { useEffect, useState, useRef } from "react"
import { Sortable } from '../components/DndComponents/Sortable'
import { useInputs } from "./useInput"
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Droppable } from '../components/DndComponents/Droppable'
import { useRenderItems } from './useRenderItems'
import { useValidation } from './useValidation'

export const useFormCreator = () => {

    const [ metadata, setMetadata ] = useState([])
    const { renderDialog } = useDialogs({ metadata, setMetadata })
    const { renderLabel, renderComponents } = useRenderItems({ metadata, setMetadata })
    const { inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    
    console.log("Metadata = ", metadata)

    // These variables are for DND
    const [mainFormIds, setMainFormIds] = useState([])
    const [sectionIds, setSectionIds] = useState([])
    const dragOverCapture = useRef()

    // These variables are for pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(pageNumber)

    useEffect(() => {
        metadata.forEach(element => {
            element.page = pageNumber
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

    return { renderForm, addMetadata, metadata, setMetadata, mainFormIds, setMainFormIds, dragOverCapture }
}