import cn from 'clsx'
import useDialogs from './useDialogs'
import { createElement, useEffect, useState } from 'react'
import { useInputs } from './useInput'
import { Sortable } from '../components/DndComponents/Sortable'
import CreateSignatureInput from '../components/CreationComponents/CreateSignatureInput/CreateSignatureInput'
import CreateMultiRadioButtons from '../components/CreationComponents/CreateMultiRadioButtons/CreateMultiRadioButtons'
import CreateHeader from '../components/CreationComponents/CreateLabel/CreateLabel'
import CreateTextInput from '../components/CreationComponents/CreateTextInput/CreateTextInput'
import CreateCalendarInput from '../components/CreationComponents/CreateCalendarInput/CreateCalendarInput'
import { useValidation } from './useValidation'
import CreateNumberInput from '../components/CreationComponents/CreateNumberInput/CreateNumberInput'
import CreateTextareaInput from '../components/CreationComponents/CreateTextareaInput/CreateTextareaInput'
import CreateMaskInput from '../components/CreationComponents/CreateMaskInput/CreateMaskInput'
import CreateDropdownInput from '../components/CreationComponents/CreateDropdownInput/CreateDropdownInput'
import CreateMultiSelectInput from '../components/CreationComponents/CreateMultiSelectInput/CreateMultiSelectInput'
import CreateFileInput from '../components/CreationComponents/CreateFileInput/CreateFileinput'
import CreateRichTextInput from '../components/CreationComponents/CreateRichTextInput/CreateRichTextInput'
import CreateReadonlySubtitle from '../components/CreationComponents/CreateReadonlySubtitle/CreateReadonlySubtitle'
import CreateCheckboxInput from '../components/CreationComponents/CreateCheckboxInput/CreateCheckboxInput'
import { Droppable } from '../components/DndComponents/Droppable'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'

// useCreateItems
export const useCreateItems = ({ metadata, setMetadata, mainFormIds }) => {

    const { handleInputChange, inputs } = useInputs({ initialValues: {} })
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })

    console.log("Metadata = ", metadata)

    const componentMapper = {
        'text': CreateTextInput,
        'calendar': CreateCalendarInput,
        'number': CreateNumberInput,
        'textarea': CreateTextareaInput,
        'mask': CreateMaskInput,
        'dropdown': CreateDropdownInput,
        'multiselect': CreateMultiSelectInput,
        'header': CreateHeader,
        'file': CreateFileInput,
        'richText': CreateRichTextInput,
        'subtitle': CreateReadonlySubtitle,
        'signature': CreateSignatureInput,
        'radiobutton': CreateMultiRadioButtons,
        'checkbox': CreateCheckboxInput
    }

    const renderComponents = () => {
        return (
            <Droppable id='droppable-container-form'>
                {renderDialog()}
                <div className='formgrid grid'>
                    <SortableContext items={mainFormIds} strategy={rectSortingStrategy}>
                        {metadata.length === 0 && <h5 style={{margin: '0 auto'}}>Drop field here</h5>}
                        {metadata.map((data, index) => {
                            const { type, name, columnSize } = data
                            return (
                                <Sortable className="field col-6" key={index} id={index + 1}>
                                    <div>
                                        {/* <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div> */}
                                        {createElement(componentMapper[type],
                                            {
                                                metadata: data,
                                                openDialog: openDialog,
                                                value: inputs[name],
                                                onChange: handleInputChange,
                                                errors: errors[name]
                                            }
                                        )}
                                    </div>
                                </Sortable>
                            )
                        })}
                    </SortableContext>
                </div>
            </Droppable>
        )
    }

    return { renderComponents }
}