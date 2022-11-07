import React from 'react'

const Check = (props) => {

  const { text, name, onChange } = props;

  return (
    <div className='form-check'>
        <input name={name} onChange={onChange} className='form-check-input' type='checkbox' id='flexCheckDefault' />
        <label className='form-check-label' htmlFor='flexCheckDefault'>
            { text }
        </label>
    </div>
  )
}

export default Check;
