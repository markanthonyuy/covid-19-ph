import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import './App.css'
import bacteria from './bacteria.svg'

const API_ENDPOINT = 'https://covid19.mathdro.id/api/'

const App = () => {
  const [confirmedPH, setConfirmedPH] = useState(0)
  const [recoveredPH, setRecoveredPH] = useState(0)
  const [deathsPH, setDeathsPH] = useState(0)
  const [deathsPHPercent, setDeathsPHPercent] = useState(0)
  const [recoveredPHPercent, setRecoveredPHPercent] = useState(0)

  const [confirmedGlobal, setConfirmedGlobal] = useState(0)
  const [recoveredGlobal, setRecoveredGlobal] = useState(0)
  const [deathsGlobal, setDeathsGlobal] = useState(0)
  const [deathsGlobalPercent, setDeathsGlobalPercent] = useState(0)
  const [recoveredGlobalPercent, setRecoveredGlobalPercent] = useState(0)

  const [update, setUpdate] = useState('')

  const [chartPH, setChartPH] = useState(false)
  const [chartGlobal, setChartGlobal] = useState(false)

  const getPHData = () => {
    fetch(`${API_ENDPOINT}countries/ph/`)
      .then(res => res.json())
      .then(res => {
        setConfirmedPH(res.confirmed.value)
        setRecoveredPH(res.recovered.value)
        setDeathsPH(res.deaths.value)
        setDeathsPHPercent(
          ((res.deaths.value / res.confirmed.value) * 100).toFixed(2)
        )
        setRecoveredPHPercent(
          ((res.recovered.value / res.confirmed.value) * 100).toFixed(2)
        )
      })
  }

  const getGlobalData = () => {
    fetch(API_ENDPOINT)
      .then(res => res.json())
      .then(res => {
        setConfirmedGlobal(res.confirmed.value)
        setRecoveredGlobal(res.recovered.value)
        setDeathsGlobal(res.deaths.value)
        setUpdate(res.lastUpdate)
        setDeathsGlobalPercent(
          ((res.deaths.value / res.confirmed.value) * 100).toFixed(2)
        )
        setRecoveredGlobalPercent(
          ((res.recovered.value / res.confirmed.value) * 100).toFixed(2)
        )
      })
  }

  useEffect(() => {
    getPHData()
    setInterval(getPHData, 60000)
    getGlobalData()
    setInterval(getGlobalData, 60000)
  }, [])

  return (
    <div className="App h-screen">
      <header className="App-header p-10">
        <img src={bacteria} alt="" width="50" className="logo" />
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
      <div className="body w-5/6 lg:w-3/4 mx-auto md:flex justify-center items-center">
        <div className="md:w-1/3 flex-1 flex flex-col justify-center md:justify-start box p-3 md:p-5 bg-gray-100 rounded-lg mx-2 mb-3 md:mb-0 shadow">
          <p className="py-2 text-xl">Cases</p>
          <span className="text-4xl">{confirmedPH}</span>
        </div>
        <div className="md:w-1/3 flex-1 box p-3 md:p-5 bg-blue-600 text-white rounded-lg mx-2 mb-3 md:mb-0 shadow">
          <p className="py-2 text-xl">Recovered</p>
          <span className="text-4xl leading-normal block">{recoveredPH}</span>
          <span className="text-sm">({recoveredPHPercent}%)</span>
        </div>
        <div className="md:w-1/3 flex-1 box p-3 md:p-5 bg-red-500 rounded-lg mx-2 mb-3 md:mb-0 shadow">
          <p className="py-2 text-xl">Deaths</p>
          <span className="text-4xl leading-normal block">{deathsPH}</span>
          <span className="text-sm">({deathsPHPercent}%)</span>
        </div>
      </div>

      <button
        className="btn-apply m-auto my-6 bg-green-400 py-2 text-sm text-white px-6 rounded shadow"
        onClick={() => setChartPH(!chartPH)}
      >
        {chartPH ? 'Hide' : 'Show'} Chart
      </button>

      <div
        className={
          chartPH
            ? 'chart w-full md:w-2/4 lg:w-5/12 mx-auto mt-8} block'
            : 'chart w-full md:w-2/4 lg:w-5/12 mx-auto mt-8} hidden'
        }
      >
        <Bar
          data={{
            labels: ['Cases', 'Recovered', 'Deaths'],
            datasets: [
              {
                backgroundColor: ['#f7fafc', '#3182ce', '#f56565'],
                borderWidth: 1,
                hoverBorderColor: '#000',
                data: [confirmedPH, recoveredPH, deathsPH]
              }
            ]
          }}
          legend={{
            display: false
          }}
        ></Bar>
      </div>

      <h2 className="text-xl mt-5 mb-2">Global</h2>
      <div className="body md:flex justify-center bg-yellow-200 md:pb-3">
        <div className="md:w-1/3 py-4 md:py-0 border-b border-yellow-300 md:border-b-0">
          <p className="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b">
            Cases
          </p>
          <span className="text-2xl">
            {new Intl.NumberFormat().format(confirmedGlobal)}
          </span>
        </div>
        <div className="md:w-1/3 py-4 md:py-0 border-b border-yellow-300 md:border-b-0">
          <p className="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b">
            Recovered
          </p>
          <span className="text-2xl block">
            {new Intl.NumberFormat().format(recoveredGlobal)}
          </span>
          <span className="text-xs text-gray-500">
            ({recoveredGlobalPercent}%)
          </span>
        </div>
        <div className="md:w-1/3 py-4 md:py-0">
          <p className="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b">
            Deaths
          </p>
          <span className="text-2xl block">
            {new Intl.NumberFormat().format(deathsGlobal)}
          </span>
          <span className="text-xs text-gray-500">
            ({deathsGlobalPercent}%)
          </span>
        </div>
      </div>

      <button
        className="btn-apply m-auto my-6 bg-green-400 py-2 text-sm text-white px-6 rounded shadow"
        onClick={() => setChartGlobal(!chartGlobal)}
      >
        {chartGlobal ? 'Hide' : 'Show'} Chart
      </button>

      <div
        className={
          chartGlobal
            ? 'chart w-full md:w-2/4 lg:w-5/12 mx-auto mt-8} block'
            : 'chart w-full md:w-2/4 lg:w-5/12 mx-auto mt-8} hidden'
        }
      >
        <Bar
          data={{
            labels: ['Cases', 'Recovered', 'Deaths'],
            datasets: [
              {
                backgroundColor: ['#fefcbf', '#fefcbf', '#fefcbf'],
                borderWidth: 1,
                hoverBorderColor: '#000',
                data: [confirmedGlobal, recoveredGlobal, deathsGlobal]
              }
            ]
          }}
          legend={{
            display: false
          }}
        ></Bar>
      </div>

      <p className="mt-10 text-sm">Last update {update}</p>

      <div className="mt-10 md:mt-20 text-3xl">Laban Pilipinas! 💪</div>

      <footer className="w-full p-3 text-center">
        <p className="flex flex-col md:flex-row justify-between items-center leading-tight text-xs">
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
