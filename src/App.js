import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import './App.css'
import './css/tw.css'
import Count from './components/Count'
import Box from './components/Box'
import Header from './components/Header'
import Footer from './components/Footer'
import BtnShowGraph from './components/BtnShowGraph'
import ReactTimeAgo from 'react-timeago'

const API_ENDPOINT = 'https://covid19.mathdro.id/api/'

const App = () => {
  const [confirmedPH, setConfirmedPH] = useState(0)
  const [recoveredPH, setRecoveredPH] = useState(0)
  const [deathsPH, setDeathsPH] = useState(0)
  const [deathsPHPercent, setDeathsPHPercent] = useState(0)
  const [recoveredPHPercent, setRecoveredPHPercent] = useState(0)

  const [deathsPHPercentVisibility, setDeathsPHPercentVisibility] = useState(
    false
  )
  const [
    recoveredPHPercentVisibility,
    setRecoveredPHPercentVisibility,
  ] = useState(false)

  const [confirmedGlobal, setConfirmedGlobal] = useState(0)

  const [recoveredGlobal, setRecoveredGlobal] = useState(0)
  const [deathsGlobal, setDeathsGlobal] = useState(0)

  const [deathsGlobalPercent, setDeathsGlobalPercent] = useState(0)
  const [recoveredGlobalPercent, setRecoveredGlobalPercent] = useState(0)

  const [deathGlobalVisibility, setDeathGlobalVisibility] = useState(false)
  const [recoveredGlobalVisibility, setRecoveredGlobalVisibility] = useState(
    false
  )

  const [update, setUpdate] = useState('')

  const [chartPH, setChartPH] = useState(false)
  const [chartGlobal, setChartGlobal] = useState(false)

  const getPHData = () => {
    fetch(`${API_ENDPOINT}countries/ph/`)
      .then((res) => res.json())
      .then((res) => {
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
      .then((res) => res.json())
      .then((res) => {
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
    setInterval(getPHData, 3600000)
    getGlobalData()
    setInterval(getGlobalData, 3600000)
  }, [])

  return (
    <div className="App h-screen">
      <Header />

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
        <Box
          classNameBox="md:w-1/3 flex-1 flex flex-col justify-center md:justify-start box p-3 md:p-5 bg-gray-100 rounded-lg mx-2 mb-3 md:mb-0 shadow"
          classNameBoxTitle="py-2 text-xl"
          classNameCount="text-4xl leading-normal block"
          title="Cases"
          count={confirmedPH}
        />

        <Box
          hasPercent
          classNameBox="md:w-1/3 flex-1 box p-3 md:p-5 bg-blue-600 text-white rounded-lg mx-2 mb-3 md:mb-0 shadow"
          classNameBoxTitle="py-2 text-xl"
          classNameCount="text-4xl leading-normal block"
          title="Recovered"
          count={recoveredPH}
          onEnd={() => setRecoveredPHPercentVisibility(true)}
          percentVisibility={
            recoveredPHPercentVisibility ? 'text-sm' : 'invisible'
          }
          percentValue={recoveredPHPercent}
        />

        <Box
          hasPercent
          classNameBox="md:w-1/3 flex-1 box p-3 md:p-5 bg-red-500 rounded-lg mx-2 mb-3 md:mb-0 shadow"
          classNameBoxTitle="py-2 text-xl"
          classNameCount="text-4xl leading-normal block"
          title="Deaths"
          count={deathsPH}
          onEnd={() => setDeathsPHPercentVisibility(true)}
          percentVisibility={
            recoveredPHPercentVisibility ? 'text-sm' : 'invisible'
          }
          percentValue={deathsPHPercent}
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartPH(!chartPH)}
        chartVisible={chartPH}
        casesColor="#f7fafc"
        recoveredColor="#3182ce"
        deathsColor="#f56565"
        casesValue={confirmedPH}
        recoveredValue={recoveredPH}
        deathsValue={deathsPH}
      />

      <h2 className="text-xl mt-5 mb-2">Global</h2>
      <div className="body md:flex justify-center bg-yellow-200 md:pb-3">
        <Box
          classNameBox="md:w-1/3 py-4 md:py-0 border-b border-yellow-300 md:border-b-0"
          classNameBoxTitle="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b"
          classNameCount="text-2xl"
          title="Cases"
          count={confirmedGlobal}
        />

        <Box
          hasPercent
          classNameBox="md:w-1/3 py-4 md:py-0 border-b border-yellow-300 md:border-b-0"
          classNameBoxTitle="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b"
          classNameCount="text-2xl block"
          title="Recovered"
          count={recoveredGlobal}
          onEnd={() => setRecoveredGlobalVisibility(true)}
          percentVisibility={
            recoveredGlobalVisibility ? 'text-xs text-gray-500' : 'invisible'
          }
          percentValue={recoveredGlobalPercent}
        />

        <Box
          hasPercent
          classNameBox="md:w-1/3 py-4 md:py-0"
          classNameBoxTitle="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b"
          classNameCount="text-2xl block"
          title="Deaths"
          count={deathsGlobal}
          onEnd={() => setDeathGlobalVisibility(true)}
          percentVisibility={
            deathGlobalVisibility ? 'text-xs text-gray-500' : 'invisible'
          }
          percentValue={deathsGlobalPercent}
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartGlobal(!chartGlobal)}
        chartVisible={chartGlobal}
        casesColor="#fefcbf"
        recoveredColor="#fefcbf"
        deathsColor="#fefcbf"
        casesValue={confirmedGlobal}
        recoveredValue={recoveredGlobal}
        deathsValue={deathsGlobal}
      />

      <p className="mt-10 text-sm">
        Last update was{' '}
        <ReactTimeAgo
          date={new Date(update.substr(0, update.length - 5)).getTime()}
          live="false"
        />
      </p>

      <div className="mt-10 md:mt-10 text-3xl">
        Laban Pilipinas!{' '}
        <span role="img" aria-label="strong">
          💪
        </span>
      </div>

      <Footer />
    </div>
  )
}

export default App
