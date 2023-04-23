import { Dropdown } from 'primereact/dropdown'
import React from 'react'

export default function ColumnSizeDropdowm({name, columnSizeOptions, inputs, onChange}) {

  const columnSizes = columnSizeOptions ?? [
    {label: 'Full Size', value: 'col-11 mlr-05'},
    {label: 'Half Size', value: 'col-5 mlr-05'}
  ]

  return (
      <>
          <label style={{display: 'block', color: '#F7F7F7'}}>Change Column Width</label>
          <Dropdown style={{width: '100%'}} name={name} value={inputs?.[name] ?? ''} options={columnSizes} onChange={onChange} placeholder='Select a column size' />
      </>
  )
}
