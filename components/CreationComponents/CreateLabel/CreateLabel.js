import React from 'react'
import Label from '../../SharedComponents/Label/Label'

export default function CreateLabel({componentData, label, openDialog}) {
  return (
    <div className="flex justify-content-between">
        <Label label={label} /> 
        <i className='pi pi-cog' style={{fontSize: '1em'}} onClick={() => openDialog(componentData)}></i>
    </div>
  )
}
