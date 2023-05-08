import { Draggable } from '../Draggable/Draggable'
import { useState } from 'react'
import { Button } from 'primereact/button'
import clsx from 'clsx'
import ComponentPanelStyles from './ComponentPanel.module.css'

export const fullSizeClassName = 'col-11 mlr-05'
export const halfSizeClassName = 'col-5 mlr-05'

export default function ComponentPanel() {
    const [menuVisible, setMenuVisible] = useState(false)
    const [textfieldsVisible, setTextfieldsVisible] = useState(false)
    const [choicefieldsVisible, setChoicefieldsVisible] = useState(false)

    const componentTypes = [
        'header',
        'image',
        'text',
        'textarea',
        'richText',
        'calendar',
        'time',
        'number',
        'file',
        'dropdown',
        'multiselect',
        'radiobutton',
        'checkbox',
        'mask',
        'subtitle',
        'signature',
        'address'
    ]

    const textfields = ['text', 'textarea', 'richText']
    const choicefields = ['dropdown', 'multiselect', 'radiobutton', 'checkbox']

    const componentNames = [
        'Header',
        'Image',
        'Short Text',
        'Large Text',
        'Rich Text',
        'Date Picker',
        'Time',
        'Number',
        'File Upload',
        'Dropdown',
        'Multiselect',
        'Single Choice',
        'Multiple Choice',
        'Mask',
        'Paragraph',
        'Signature',
        'Address',
    ]

    const defaultSubtitle = JSON.stringify({"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})
    
    const createOption = (component, index) => {
        const divSize = component === 'header' || component === 'textarea' || component === 'richText' 
        || component === 'image' || component === 'subtitle' || component === 'address' ? fullSizeClassName : halfSizeClassName

        const label = component === 'header' ? defaultSubtitle : component.charAt(0).toUpperCase() + component.slice(1)
        const subtitle = component === 'header' ? null : defaultSubtitle

        const options = component === 'dropdown' || component === 'multiselect' || component === 'radiobutton'
        || component === 'checkbox' ? [] : null

        return (
            <Draggable
                key={index}
                id={`${index + 1}`}
                type={component}
                name={component}
                guid=''
                divClassName={divSize}
                label={label}
                subtitle={subtitle}
                defaultValue=''
                dateFormat={component === 'calendar' ? 'dd-mm-yy' : ''}
                minDate=''
                maxDate=''
                showTime={component === 'time' ? true : false}
                timeOnly={component === 'time' ? true : false}
                hourFormat={component === 'time' ? '12' : ''}
                format={false}
                mask={component === 'mask' ? '(999) 999-9999' : ''}
                options={options}
                otherOptions={false}
                fontStyle=''
            >
                <label>{componentNames[index]}</label>
            </Draggable>
        )
    }

    const createAccordion = (component, index, isVisible, setIsVisible) => {
        if (component === 'text') {
            let textComponents = []
            let textfieldIndex = index

            for (const textfield of textfields) {
                textComponents.push(createOption(textfield, textfieldIndex))
                textfieldIndex += 1
            }

            return (
                <div>
                    <div className={ComponentPanelStyles.accordion}>
                        <label className={ComponentPanelStyles.accordionField}>{'Text Field'}</label>
                        <span className={ComponentPanelStyles.accordionButton} onClick={() => setIsVisible(prev => !prev)}>{isVisible ? '\u2304' : '\u203A'}</span>
                    </div>
                    {isVisible && component === 'text' ? textComponents : ''}
                </div>
            )
        }

        if (component === 'dropdown') {
            let choiceComponents = []
            let choicefieldIndex = index

            for (const choicefield of choicefields) {
                choiceComponents.push(createOption(choicefield, choicefieldIndex))
                choicefieldIndex += 1
            }

            return (
                <div>
                    <div className={ComponentPanelStyles.accordion}>
                        <label className={ComponentPanelStyles.accordionField}>{'Choice Field'}</label>
                        <span className={ComponentPanelStyles.accordionButton} onClick={() => setIsVisible(prev => !prev)}>{isVisible ? '\u2304' : '\u203A'}</span>
                    </div>
                    {isVisible && component === 'dropdown' ? choiceComponents : ''}
                </div>
            )
        }
    }

    const componentList = componentTypes.map((component, index) => {
        if (component === 'text') {
            return createAccordion(component, index, textfieldsVisible, setTextfieldsVisible)
        } else if (component === 'textarea' || component === 'richText') {
            return
        }

        if (component === 'dropdown') {
            return createAccordion(component, index, choicefieldsVisible, setChoicefieldsVisible)
        } else if (component === 'multiselect' || component === 'radiobutton' || component === 'checkbox') {
            return
        }

        return createOption(component, index)
    })

    return (
        <div className={ComponentPanelStyles.slideMenuContainer}>
            <div className={clsx(
                'mt-2',
                'col-3',
                ComponentPanelStyles.slideMenu,
                {
                [ComponentPanelStyles.active]: menuVisible,
                }
            )}
            style={{backgroundColor: 'rgba(0, 133, 255, 0.84)', display: 'flex'}}
            >
                <div style={{width: '100%'}}>
                    {componentList}
                </div>
                <Button icon={<i className='pi pi-angle-left' style={{fontSize: '2rem', fontWeight: '600'}} />}
                style={{alignSelf: 'center', backgroundColor: '#2999FF', border: 0, marginLeft: '0.5rem'}}
                onClick={() => setMenuVisible(prev => !prev)}
                />
            </div>
            {!menuVisible && <Button icon={<i className='pi pi-angle-right' style={{fontSize: '2rem', fontWeight: '600'}} />}
            style={{alignSelf: 'center', backgroundColor: 'rgba(0, 133, 255, 0.84)'}} onClick={() => setMenuVisible(prev => !prev)}
            />}
        </div>
    )
}

