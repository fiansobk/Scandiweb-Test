import React from 'react'

function Header({ title , leftBtn , rightBtn }) {
  return (
    <div className="header">
        <h2>{ title }</h2>
        <div className="buttons-wrapper">
            { leftBtn() }
            { rightBtn() }
        </div>
    </div>
  )
}

export default Header