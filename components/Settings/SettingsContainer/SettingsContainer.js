import SettingsStyles from './SettingsContainer.module.css'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import RequiredCheckbox from '../RequiredCheckbox/RequiredCheckbox'
 
export default function SettingsContainer({ children, inputs, handleInputChange, hideMenu, handleUpdate, options, setInvalidOptions }) {
    const [activeIndex, setActiveIndex] = useState(1)
    const componentType = inputs.type.charAt(0).toUpperCase() + inputs.type.slice(1)
    const generalItemsStyle = {display: 'flex', columnGap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}

    return (
        <div>
            <div className={SettingsStyles.header}>
                <div>
                    <div style={{marginBottom: '0.5rem'}}>{`${componentType} Field Settings`}</div>
                    <Button label='Close' onClick={hideMenu} className={SettingsStyles.accordionContentInput} style={{marginRight: '0.5rem'}} />
                    <Button label='Update' onClick={() => handleUpdate(false, options, setInvalidOptions)} className={SettingsStyles.accordionContentInput} style={{marginRight: '0.5rem'}} />
                    <Button label='Delete' onClick={() => handleUpdate(true)} className={SettingsStyles.accordionContentInput} />
                </div>
            </div>
            <div className={SettingsStyles.accordion}>
                <div className={SettingsStyles.accordionTitle} onClick={() => setActiveIndex(1)}>
                    <div>General</div>
                </div>
                {activeIndex === 1 && 
                <div className={SettingsStyles.accordionContent}>
                    <div style={generalItemsStyle}>
                        <label className={SettingsStyles.accordionContentLabel}>Label: </label>
                        <InputText name='label' value={inputs?.label ?? ''} onChange={handleInputChange}
                        className={SettingsStyles.accordionContentInput} style={{backgroundColor: '#F7F7F7'}}
                        />
                    </div>
                    <div style={generalItemsStyle}>
                        <label className={SettingsStyles.accordionContentLabel}>Label Alignment: </label>
                        <div className={SettingsStyles.accordionContentAlignBox}>
                            <div className={SettingsStyles.accordionContentAlignItem}>Left</div>
                            <div className={SettingsStyles.accordionContentAlignItem}>Top</div>
                            <div className={SettingsStyles.accordionContentAlignItem}>Right</div>
                        </div>
                    </div>
                    <div>
                        <RequiredCheckbox inputs={inputs} onChange={handleInputChange} />
                    </div>
                </div>}
                <div className={SettingsStyles.accordion}>
                    <div className={SettingsStyles.accordionTitle} onClick={() => setActiveIndex(2)}>
                        <div>Advance</div>
                    </div>
                    {activeIndex === 2 &&  children}
                </div>
            </div>
        </div>
    )
}