import React from 'react'
import bacteria from '../images/bacteria.svg'

const Header = () => {
  return (
    <header className="App-header p-6">
      <img src={bacteria} alt="" width="50" className="logo" />
      <h1 className="w-full text-4xl mt-2 leading-none text-center font-hairline">
        COVID 19 PH Tracker
      </h1>
    </header>
  )
}

export default Header
