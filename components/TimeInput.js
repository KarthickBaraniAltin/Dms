import React from 'react'

const TimeInput = ( {data, value, onChange} ) => {
  return (
    <div className="input-group input-group-sm mb-1">
        <input value={ value } onChange={(e) => onChange(e.target.value)}></input>
    </div>
  )
}

export default TimeInput;
