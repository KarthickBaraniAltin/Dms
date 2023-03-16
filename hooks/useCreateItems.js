import useDialogs from './useDialogs'
import { useValidation } from './useValidation'
import { createElement } from 'react'
import { useInputs } from './useInput'
import { Sortable } from '../components/DndComponents/Sortable'
import { Droppable } from '../components/DndComponents/Droppable'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import CreateMultiRadioButtons from '../components/CreationComponents/Inputs/CreateMultiRadioButtons/CreateMultiRadioButtons'
import CreateMask from '../components/CreationComponents/Inputs/CreateMask/CreateMask'
import CreateFileInput from '../components/CreationComponents/Inputs/CreateFileInput/CreateFileinput'
import CreateRichTextInput from '../components/CreationComponents/Inputs/CreateRichTextInput/CreateRichTextInput'
import CreateReadonlySubtitle from '../components/CreationComponents/Inputs/CreateReadonlySubtitle/CreateReadonlySubtitle'
import CreateCalendar from '../components/CreationComponents/Inputs/CreateCalendar/CreateCalendar'
import CreateText from '../components/CreationComponents/Inputs/CreateText/CreateText'
import CreateNumber from '../components/CreationComponents/Inputs/CreateNumber/CreateNumber'
import CreateTextarea from '../components/CreationComponents/Inputs/CreateTextarea/CreateTextarea'
import CreateDropdown from '../components/CreationComponents/Inputs/CreateDropdown/CreateDropdown'
import CreateMultiSelect from '../components/CreationComponents/Inputs/CreateMultiSelect/CreateMultiSelect'
import CreateSignature from '../components/CreationComponents/Inputs/CreateSignature/CreateSignature'
import CreateCheckbox from '../components/CreationComponents/Inputs/CreateCheckbox/CreateCheckbox'

export const useCreateItems = ({ metadata, setMetadata, mainFormIds }) => {

    const { handleInputChange, inputs } = useInputs({ initialValues: {} })
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })

    const componentMapper = {
        'text': CreateText,
        'calendar': CreateCalendar,
        'number': CreateNumber,
        'textarea': CreateTextarea,
        'mask': CreateMask,
        'dropdown': CreateDropdown,
        'multiselect': CreateMultiSelect,
        'header': <h1/>,
        'file': CreateFileInput,
        'richText': CreateRichTextInput,
        'subtitle': CreateReadonlySubtitle,
        'signature': CreateSignature,
        'radiobutton': CreateMultiRadioButtons,
        'checkbox': CreateCheckbox
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
                                <div key={index} className="field col-6">
                                    <Sortable id={index + 1}>
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
                                    </Sortable>
                                </div>
                            )
                        })}
                    </SortableContext>
                </div>
            </Droppable>
        )
    }

    return { renderComponents }
}