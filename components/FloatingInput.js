import React from 'react'

export default function FloatingInput(props) {
  
  const { text } = props;

  return (
    <div className='row'>
        <div className='row d-flex justify-content-center'>
            <div className="form-floating mt-3 col-md-12">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">{text}</label>
            </div>
        </div>  
    </div>
  )
}
