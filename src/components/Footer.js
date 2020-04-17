import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full p-3 text-center">
      <p className="flex flex-col md:flex-row justify-center items-center leading-tight text-xs">
        <span className="p-1">
          Virus icon made by{' '}
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
            className="text-blue-500"
          >
            Smashicons
          </a>
        </span>
        <span className="p-1">
          {'</>'} by{' '}
          <a href="https://markanthonyuy.com" className="text-blue-500">
            Mark Anthony Uy
          </a>{' '}
        </span>
        <span className="p-1">
          API by{' '}
          <a href="https://github.com/novelcovid/api" className="text-blue-500">
            Novel Covid
          </a>
        </span>
      </p>
    </footer>
  )
}

export default Footer
