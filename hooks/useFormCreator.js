import useDialogs from './useDialogs'
import { useEffect, useState, useRef } from "react"
import { Sortable } from '../components/DndComponents/Sortable'
import { useInputs } from "./useInput"
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Droppable } from '../components/DndComponents/Droppable'

export const useFormCreator = () => {

    const [ metadata, setMetadata ] = useState([])
    const { renderDialog } = useDialogs({ metadata, setMetadata })
    const { renderLabel, renderComponents } = useRenderItems({ metadata, setMetadata })
    const { inputs, setInputs } = useInputs({})
    const { errors } = useValidation({ metadata, inputs })
    
    // Api call variables
    const { response, error, loading, callApi } = useApi()
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)

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

    const renderForm = () => {
        return (
            <>
                {metadata.map((data, index) => {
                    const { type, subtitle, label, subtitleComponent, name, defaultValue, sectionMetadata, ...rest } = data
                    if (type === 'section') {
                        // const sectionNumber = `section-${index + 1}`
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