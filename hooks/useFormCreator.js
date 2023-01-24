import useDialogs from './useDialogs'
import { useEffect, useState, useRef } from "react"
import { Sortable } from '../components/DndComponents/Sortable'
import { useInputs } from "./useInput"
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Droppable } from '../components/DndComponents/Droppable'
import { useRenderItems } from "./useRenderItems"

export const useFormCreator = () => {

    const [ metadata, setMetadata ] = useState([])
    const { setInputs } = useInputs({})
    const { renderDialog } = useDialogs({ metadata, setMetadata })
    const { renderLabel, renderComponents } = useRenderItems({ metadata, setMetadata })

    // These variables are for DND
    const [mainFormIds, setMainFormIds] = useState([])
    const [sectionIds, setSectionIds] = useState([])
    const dragOverCapture = useRef()

    useEffect(() => {
        metadata.forEach(element => {
            if (element.defaultValue) {
                setInputs(inputs => ({...inputs, [element.name]: element.defaultValue}))
            }
        })

        setMainFormIds(renderForm().props.children.map(component => component.props.id))

        setSectionIds(metadata.map(component => {
            if (component.type === 'section') {
                return {
                    id: component.name,
                    componentData: component.sectionMetadata.length > 0 ? component.sectionMetadata.map(sectionComponent => sectionComponent.id) : []
                }
            }
        }))
    }, [metadata])

    const addMetadata = (data) => {
        setMetadata((prevList) => [...prevList, data])
    }

    const renderForm = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, sectionMetadata, ...rest } = data
                    if (type === 'section') {
                        const sectionNumber = `section-${index + 1}`
                        let sectionIdsForDroppable = sectionIds.find(element => element?.id === sectionNumber)
                        sectionIdsForDroppable = sectionIdsForDroppable?.componentData ? sectionIdsForDroppable.componentData : []
                       
                        return (
                            <Sortable key={index} id={index + 1}>
                            <div className='field col-12'>
                                <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div>
                                {renderDialog()}
                                {renderLabel(data, label, type)}
                                <div>
                                    <Droppable id={sectionNumber}>
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