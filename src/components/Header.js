import React from 'react'
import bacteria from '../img/bacteria.svg'

const Header = () => {
  return (
    <header className="App-header p-10">
      <img src={bacteria} alt="" width="50" className="logo" />
      <h1 className="w-full text-5xl leading-tight text-center">
        COVID-19 PH Tracker
      </h1>
    </header>
  )
}

export default Header
