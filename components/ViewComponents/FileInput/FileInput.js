import React from 'react'

export default function FileInput({metadata, className, name, value, onChange, multiple}) {
  return (
    <input
        name={name} 
        type='file' 
        value={value}
        onChange={onChange}
        multiple={multiple}
        className={className}
    />
  )
}
