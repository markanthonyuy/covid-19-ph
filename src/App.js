import React, { useState, useEffect } from 'react'
import './App.css'
import bacteria from './bacteria.svg'

const App = () => {
  const [confirmedPH, setConfirmedPH] = useState(0)
  const [recoveredPH, setRecoveredPH] = useState(0)
  const [deathsPH, setDeathsPH] = useState(0)

  const [confirmedGlobal, setConfirmedGlobal] = useState(0)
  const [recoveredGlobal, setRecoveredGlobal] = useState(0)
  const [deathsGlobal, setDeathsGlobal] = useState(0)
  const [update, setUpdate] = useState('')

  const getPHData = () => {
    fetch('https://covid19.mathdro.id/api/countries/ph/')
      .then(res => res.json())
      .then(res => {
        setConfirmedPH(res.confirmed.value)
        setRecoveredPH(res.recovered.value)
        setDeathsPH(res.deaths.value)
        setUpdate(res.lastUpdate)
      })
  }

  const getGlobalData = () => {
    fetch('https://covid19.mathdro.id/api/')
      .then(res => res.json())
      .then(res => {
        setConfirmedGlobal(res.confirmed.value)
        setRecoveredGlobal(res.recovered.value)
        setDeathsGlobal(res.deaths.value)
      })
  }

  useEffect(() => {
    getPHData()
    setInterval(getPHData, 30000)
    getGlobalData()
    setInterval(getGlobalData, 30000)
  }, [])

  return (
    <div className="App h-screen">
      <header className="App-header p-10">
        <img src={bacteria} alt="" width="50" />
        <h1 className="w-full text-5xl leading-tight text-center">
          COVID-19 PH Tracker
        </h1>
      </header>

      <h2 className="text-4xl p-5">
        Philippines{' '}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg"
          width="40"
          className="inline mb-1"
          alt=""
        />
      </h2>
      <div className="body md:flex justify-center items-center border">
        <div className="md:w-1/3 box p-5 bg-gray-100">
          <p className="p-3 text-3xl">Cases</p>
          <span className="text-2xl">{confirmedPH}</span>
        </div>
        <div className="md:w-1/3 box p-5 bg-blue-700 text-white">
          <p className="p-3 text-3xl">Recovered</p>
          <span className="text-2xl">{recoveredPH}</span>
        </div>
        <div className="md:w-1/3 box p-5 bg-red-600">
          <p className="p-3 text-3xl">Deaths</p>
          <span className="text-2xl">{deathsPH}</span>
        </div>
      </div>

      <h2 className="text-xl mt-10 mb-2">Global</h2>
      <div className="body md:flex justify-center items-center bg-gray-100 pb-3">
        <div className="md:w-1/3 box">
          <p className="md:w-2/3 mx-auto m-2 p-2 text-md border-b">Cases</p>
          <span className="text-sm">
            {new Intl.NumberFormat().format(confirmedGlobal)}
          </span>
        </div>
        <div className="md:w-1/3 box">
          <p className="md:w-2/3 mx-auto m-2 p-2 text-md border-b">Recovered</p>
          <span className="text-sm">
            {new Intl.NumberFormat().format(recoveredGlobal)}
          </span>
        </div>
        <div className="md:w-1/3 box">
          <p className="md:w-2/3 mx-auto m-2 p-2 text-md border-b">Deaths</p>
          <span className="text-sm">
            {new Intl.NumberFormat().format(deathsGlobal)}
          </span>
        </div>
      </div>

      <p className="mt-10 text-sm">Last update {update}</p>

      <div className="mt-10 md:mt-20 text-3xl">Laban Pilipinas! ❤💕</div>

      <footer className="md:fixed bottom-0 w-full p-3 text-center">
        <p className="flex flex-col md:flex-row justify-between items-center leading-tight text-xs">
          <span className="p-1">
            Icons made by{' '}
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
              markanthonyuy
            </a>{' '}
          </span>
          <span className="p-1">
            API by{' '}
            <a
              href="https://github.com/mathdroid/covid-19-api"
              className="text-blue-500"
            >
              mathdroid
            </a>
          </span>
        </p>
      </footer>
    </div>
  )
}

export default App
