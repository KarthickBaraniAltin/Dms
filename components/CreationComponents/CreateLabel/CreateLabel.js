import React from 'react'
import Label from '../../SharedComponents/Label/Label'

export default function CreateLabel({label}) {
  return (
    <div className="flex justify-content-between mr-1">
        <Label label={label} /> 
    </div>
  )
}
