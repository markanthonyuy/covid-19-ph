import React from 'react'
import bacteria from '../images/bacteria.svg'

const Header = () => {
  return (
    <header className="App-header p-2 flex flex-row justify-center items-center">
      <h1 className="text-3xl md:text-4xl leading-none text-center">
        C<img src={bacteria} alt="" width="50" className="logo inline" />
        VID 19 PH Tracker
      </h1>
    </header>
  )
}

export default Header
