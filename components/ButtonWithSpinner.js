import React from 'react'

const ButtonWithSpinner = ({ onClick, pendingApiCall, disabled, text, className, col }) => {

  return (
    <div className={ className || `d-grid gap-2 col-${col ? col : "12"} mx-auto mt-3`}>
        <button className= { "btn btn-primary" } style={{border: '2px solid transparent'}} onClick={onClick} disabled={disabled} type="submit">
            {pendingApiCall && (<span className="spinner-border spinner-border-sm"></span>)} {" "} {text} 
        </button>
    </div>
  )
}

export default ButtonWithSpinner;
