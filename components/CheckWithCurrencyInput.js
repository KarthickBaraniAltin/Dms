import React, { useState, useEffect } from 'react'
import CurrencyInput from './CurrencyInput';

export default function CheckWithCurrencyInput(props) {

  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState('');

  const { text, name, onChange } = props;

  useEffect(() => {
    onChange(checked, name, amount);
  }, [checked, amount, name])
  
  return (
    <>
      <div className='form-check'>
          <input name={name} onChange={event => setChecked(event.target.checked)} className='form-check-input' type='checkbox' id='flexCheckDefault' />
          <label className='form-check-label' htmlFor='flexCheckDefault'>
              { text }
          </label>
      </div>
      {checked && <CurrencyInput className="input-group input-group-sm" name={name} currencyType='$' onChange={event => setAmount(event.target.value)} />}
    </>
  )
}
