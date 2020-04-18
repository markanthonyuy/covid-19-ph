import React, { useState, useEffect } from 'react'
import './css/App.css'
import './css/tw.css'
import ReactTimeAgo from 'react-timeago'
import Fade from 'react-reveal/Fade'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import {
  Box,
  Header,
  Footer,
  BtnShowGraph,
  Tip,
  Hotlines,
  SVGInfo,
} from './components'
import {
  CLEAN_HANDS,
  DOCTOR,
  FLU_MASK,
  HEALTHCARE,
  NEWS,
  SOCIAL_DISTANCING,
  FLAG_PH,
  TIME,
} from './images'

import API from './api'

const App = () => {
  // PH
  // Actual Value
  const [testsPH, setTestsPH] = useState(0)
  const [confirmedPH, setConfirmedPH] = useState(0)
  const [recoveredPH, setRecoveredPH] = useState(0)
  const [deathsPH, setDeathsPH] = useState(0)
  const [activePH, setActivePH] = useState(0)
  const [confirmedTodayPH, setConfirmedTodayPH] = useState(0)
  const [deathsTodayPH, setDeathsTodayPH] = useState(0)
  // Percentage
  const [confirmedPHPercent, setConfirmedPHPercent] = useState(0)
  const [deathsPHPercent, setDeathsPHPercent] = useState(0)
  const [recoveredPHPercent, setRecoveredPHPercent] = useState(0)
  const [activePHPercent, setActivePHPercent] = useState(0)
  // Visibility
  const [
    confirmedPHPercentVisibility,
    setConfirmedPHPercentVisibility,
  ] = useState(false)
  const [deathsPHPercentVisibility, setDeathsPHPercentVisibility] = useState(
    false
  )
  const [
    recoveredPHPercentVisibility,
    setRecoveredPHPercentVisibility,
  ] = useState(false)
  const [activePHPercentVisibility, setActivePHPercentVisibility] = useState(
    false
  )
  // Historical
  const [
    phHistoricalDataConfirmedLabel,
    setPhHistoricalDataConfirmedLabel,
  ] = useState([])
  const [
    phHistoricalDataConfirmedValue,
    setPhHistoricalDataConfirmedValue,
  ] = useState([])
  const [
    phHistoricalDataRecoveredLabel,
    setPhHistoricalDataRecoveredLabel,
  ] = useState([])
  const [
    phHistoricalDataRecoveredValue,
    setPhHistoricalDataRecoveredValue,
  ] = useState([])
  const [
    phHistoricalDataDeathsLabel,
    setPhHistoricalDataDeathsLabel,
  ] = useState([])
  const [
    phHistoricalDataDeathsValue,
    setPhHistoricalDataDeathsValue,
  ] = useState([])

  // Global
  const [testsGlobal, setTestsGlobal] = useState(0)
  const [confirmedGlobal, setConfirmedGlobal] = useState(0)
  const [recoveredGlobal, setRecoveredGlobal] = useState(0)
  const [deathsGlobal, setDeathsGlobal] = useState(0)
  const [activeGlobal, setActiveGlobal] = useState(0)
  // Percentage
  const [confirmedGlobalPercent, setConfirmedGlobalPercent] = useState(0)
  const [deathsGlobalPercent, setDeathsGlobalPercent] = useState(0)
  const [recoveredGlobalPercent, setRecoveredGlobalPercent] = useState(0)
  const [activeGlobalPercent, setActiveGlobalPercent] = useState(0)
  // Visibility
  const [confirmedGlobalVisibility, setConfirmedGlobalVisibility] = useState(
    false
  )
  const [deathGlobalVisibility, setDeathGlobalVisibility] = useState(false)
  const [recoveredGlobalVisibility, setRecoveredGlobalVisibility] = useState(
    false
  )
  const [activeGlobalVisibility, setActiveGlobalVisibility] = useState(false)
  // Historical
  const [
    globalHistoricalDataConfirmedLabel,
    setGlobalHistoricalDataConfirmedLabel,
  ] = useState([])
  const [
    globalHistoricalDataConfirmedValue,
    setGlobalHistoricalDataConfirmedValue,
  ] = useState([])
  const [
    globalHistoricalDataRecoveredLabel,
    setGlobalHistoricalDataRecoveredLabel,
  ] = useState([])
  const [
    globalHistoricalDataRecoveredValue,
    setGlobalHistoricalDataRecoveredValue,
  ] = useState([])
  const [
    globalHistoricalDataDeathsLabel,
    setGlobalHistoricalDataDeathsLabel,
  ] = useState([])
  const [
    globalHistoricalDataDeathsValue,
    setGlobalHistoricalDataDeathsValue,
  ] = useState([])

  const [countriesAffected, setCountriesAffected] = useState(0)
  const [update, setUpdate] = useState('')
  const [chartPH, setChartPH] = useState(false)
  const [chartGlobal, setChartGlobal] = useState(false)
  const [updateTimeVisibility, setUpdateTimeVisibility] = useState(false)

  const getPHData = async () => {
    if (document.hidden) return
    await API.phDataComplete().then((res) => {
      setTestsPH(res.tests)
      if (new Date(res.lastUpdate).getHours() >= 10) {
        setConfirmedTodayPH(res.todayCases)
        setDeathsTodayPH(res.todayDeaths)
      }
      setConfirmedPH(res.confirmed)
      setRecoveredPH(res.recovered)
      setDeathsPH(res.deaths)
      setActivePH(res.active)
      setConfirmedPHPercent(((res.confirmed / res.tests) * 100).toFixed(2))
      setDeathsPHPercent(((res.deaths / res.confirmed) * 100).toFixed(2))
      setRecoveredPHPercent(((res.recovered / res.confirmed) * 100).toFixed(2))
      setActivePHPercent(((res.active / res.confirmed) * 100).toFixed(2))
      setUpdate(res.lastUpdate)
      setUpdateTimeVisibility(true)
    })
  }

  const getPHDataHistorical = async () => {
    if (document.hidden) return
    await API.phDataHistorical().then((res) => {
      let casesLabel = []
      let casesValue = []
      let recoveredLabel = []
      let recoveredValue = []
      let deathsLabel = []
      let deathsValue = []

      Object.entries(res.confirmed).forEach((c) => {
        casesLabel.push(c[0])
        casesValue.push(c[1])
      })

      Object.entries(res.recovered).forEach((c) => {
        recoveredLabel.push(c[0])
        recoveredValue.push(c[1])
      })

      Object.entries(res.deaths).forEach((c) => {
        deathsLabel.push(c[0])
        deathsValue.push(c[1])
      })

      setPhHistoricalDataConfirmedLabel(casesLabel)
      setPhHistoricalDataConfirmedValue(casesValue)

      setPhHistoricalDataRecoveredLabel(recoveredLabel)
      setPhHistoricalDataRecoveredValue(recoveredValue)

      setPhHistoricalDataDeathsLabel(deathsLabel)
      setPhHistoricalDataDeathsValue(deathsValue)
    })
  }

  const getGlobalData = async () => {
    if (document.hidden) return
    await API.globalDataComplete().then((res) => {
      setTestsGlobal(res.tests)
      setConfirmedGlobal(res.confirmed)
      setRecoveredGlobal(res.recovered)
      setDeathsGlobal(res.deaths)
      setActiveGlobal(res.confirmed - (res.recovered + res.deaths))
      setConfirmedGlobalPercent(((res.confirmed / res.tests) * 100).toFixed(2))
      setDeathsGlobalPercent(((res.deaths / res.confirmed) * 100).toFixed(2))
      setRecoveredGlobalPercent(
        ((res.recovered / res.confirmed) * 100).toFixed(2)
      )
      setActiveGlobalPercent(
        (100 - ((res.recovered + res.deaths) / res.confirmed) * 100).toFixed(2)
      )
      setCountriesAffected(res.affectedCountries)
    })
  }

  const getGlobalDataHistorical = async () => {
    if (document.hidden) return
    await API.globalDataHistorical().then((res) => {
      let casesLabel = []
      let casesValue = []
      let recoveredLabel = []
      let recoveredValue = []
      let deathsLabel = []
      let deathsValue = []

      Object.entries(res.confirmed).forEach((c) => {
        casesLabel.push(c[0])
        casesValue.push(c[1])
      })

      Object.entries(res.recovered).forEach((c) => {
        recoveredLabel.push(c[0])
        recoveredValue.push(c[1])
      })

      Object.entries(res.deaths).forEach((c) => {
        deathsLabel.push(c[0])
        deathsValue.push(c[1])
      })

      setGlobalHistoricalDataConfirmedLabel(casesLabel)
      setGlobalHistoricalDataConfirmedValue(casesValue)

      setGlobalHistoricalDataRecoveredLabel(recoveredLabel)
      setGlobalHistoricalDataRecoveredValue(recoveredValue)

      setGlobalHistoricalDataDeathsLabel(deathsLabel)
      setGlobalHistoricalDataDeathsValue(deathsValue)
    })
  }

  useEffect(() => {
    getPHData()
    setInterval(getPHData, 300000)
    getPHDataHistorical()
    getGlobalData()
    setInterval(getGlobalData, 300000)
    getGlobalDataHistorical()
  }, [])

  return (
    <div className="App">
      <Header />

      <h2 className="text-5xl p-5 font-hairline">
        Philippines{' '}
        <img src={FLAG_PH} width="70" className="inline mb-1" alt="" />
      </h2>
      <h3 className="w-11/12 lg:w-5/6 mx-auto text-2xl p-2 clearfix text-left">
        <span className="md:float-left text-left">
          Today
          <sup className="text-xs text-gray-500 ml-2">
            {update && new Date(update).toLocaleDateString()}
          </sup>
        </span>
        <p
          className={`md:float-right text-sm mt-2 text-gray-500 ${
            !updateTimeVisibility && 'hidden'
          }`}
        >
          <img
            src={TIME}
            width="16"
            alt="Clock"
            className="inline clock mr-1"
          />{' '}
          Updated <ReactTimeAgo date={update} live={false} />{' '}
        </p>
      </h3>
      <div className="body w-11/12 lg:w-5/6 mx-auto clearfix">
        <Box
          classNameCount="text-3xl md:text-4xl leading-normal block"
          title="Confirmed Cases"
          count={confirmedTodayPH}
          delay={100}
        />

        <Box
          classNameCount="text-3xl md:text-4xl leading-normal block text-red-600"
          title="Deaths"
          count={deathsTodayPH}
          delay={200}
        />
      </div>
      <p className="w-11/12 lg:w-5/6 mt-2 mx-auto px-2 italic text-xs text-left mb-4 text-gray-500 leading-normal">
        * Note: 0 value might indicate no reports yet from the Department of
        Health within this day
      </p>
      <h3 className="w-11/12 lg:w-5/6 mx-auto text-2xl p-2 text-left">
        All Time
        <sup className="text-xs text-gray-500 ml-2">
          Since day 1 of recorded confirmed case
        </sup>
      </h3>
      <div className="body w-11/12 lg:w-5/6 mx-auto clearfix">
        <Box
          classNameCount="text-3xl md:text-4xl leading-normal block text-blue-700"
          title="Tests Conducted"
          count={testsPH}
          delay={50}
        />

        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block"
          title="Confirmed Cases"
          count={confirmedPH}
          onEnd={() => setConfirmedPHPercentVisibility(true)}
          percentVisibility={
            confirmedPHPercentVisibility ? 'text-sm text-gray-600' : 'invisible'
          }
          percentValue={confirmedPHPercent}
          delay={100}
          help={`Out of all ${testsPH.toLocaleString()} test conducted ${confirmedPHPercent}% are confirmed`}
          helpBg="bg-white"
          helpBorder="border-gray-600"
        />

        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block text-green-700"
          title="Recovered"
          count={recoveredPH}
          onEnd={() => setRecoveredPHPercentVisibility(true)}
          percentVisibility={
            recoveredPHPercentVisibility ? 'text-sm text-gray-600' : 'invisible'
          }
          percentValue={recoveredPHPercent}
          delay={150}
          help={`Out of all ${confirmedPH.toLocaleString()} confirmed cases ${recoveredPHPercent}% recovered`}
          helpBg="bg-green-100"
          helpBorder="border-green-500"
        />

        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block text-red-600"
          title="Deaths"
          count={deathsPH}
          onEnd={() => setDeathsPHPercentVisibility(true)}
          percentVisibility={
            deathsPHPercentVisibility ? 'text-sm text-gray-600' : 'invisible'
          }
          percentValue={deathsPHPercent}
          delay={200}
          help={`Out of all ${confirmedPH.toLocaleString()} confirmed cases ${deathsPHPercent}% died`}
          helpBg="bg-red-100"
          helpBorder="border-red-500"
        />

        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block text-yellow-600"
          title="Active Cases"
          count={activePH}
          onEnd={() => setActivePHPercentVisibility(true)}
          percentVisibility={
            activePHPercentVisibility ? 'text-sm text-gray-600' : 'invisible'
          }
          percentValue={activePHPercent}
          delay={250}
          help={`Out of all ${confirmedPH.toLocaleString()} confirmed cases ${activePHPercent}% are still active`}
          helpBg="bg-yellow-100"
          helpBorder="border-yellow-500"
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartPH(!chartPH)}
        chartVisible={chartPH}
        barLabel={[
          'Tests Conducted',
          'Cases',
          'Recovered',
          'Deaths',
          'Active Case',
        ]}
        barDataColor={['#2b6cb0', '#afb6c1', '#52a571', '#e53e3e', '#d69e2e']}
        barDataValue={[testsPH, confirmedPH, recoveredPH, deathsPH, activePH]}
        lineCasesLabel={phHistoricalDataConfirmedLabel}
        lineCasesValue={phHistoricalDataConfirmedValue}
        lineRecoveredLabel={phHistoricalDataRecoveredLabel}
        lineRecoveredValue={phHistoricalDataRecoveredValue}
        lineDeathsLabel={phHistoricalDataDeathsLabel}
        lineDeathsValue={phHistoricalDataDeathsValue}
      />

      <h2 className="text-5xl mt-5 mb-2 font-hairline">Global</h2>
      <div className="body w-11/12 lg:w-5/6 mx-auto clearfix">
        <Box
          classNameCount="text-3xl md:text-4xl leading-normal block text-blue-700"
          title="Tests Conducted"
          count={testsGlobal}
          delay={50}
        />
        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block"
          title="Confirmed Cases"
          count={confirmedGlobal}
          onEnd={() => setConfirmedGlobalVisibility(true)}
          percentVisibility={
            confirmedGlobalVisibility ? 'text-xs text-gray-600' : 'invisible'
          }
          percentValue={confirmedGlobalPercent}
          delay={100}
          help={`Out of all ${testsGlobal.toLocaleString()} test conducted ${confirmedGlobalPercent}% are still active`}
        />

        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block text-green-700"
          title="Recovered"
          count={recoveredGlobal}
          onEnd={() => setRecoveredGlobalVisibility(true)}
          percentVisibility={
            recoveredGlobalVisibility ? 'text-xs text-gray-600' : 'invisible'
          }
          percentValue={recoveredGlobalPercent}
          delay={150}
          help={`Out of all ${confirmedGlobal.toLocaleString()} confirmed cases ${recoveredGlobalPercent}% recovered`}
          helpBg="bg-green-100"
          helpBorder="border-green-500"
        />

        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block text-red-600"
          title="Deaths"
          count={deathsGlobal}
          onEnd={() => setDeathGlobalVisibility(true)}
          percentVisibility={
            deathGlobalVisibility ? 'text-xs text-gray-600' : 'invisible'
          }
          percentValue={deathsGlobalPercent}
          delay={200}
          help={`Out of all ${confirmedGlobal.toLocaleString()} confirmed cases ${deathsGlobalPercent}% died`}
          helpBg="bg-red-100"
          helpBorder="border-red-500"
        />

        <Box
          hasPercent
          classNameCount="text-3xl md:text-4xl leading-normal block text-yellow-600"
          title="Active Cases"
          count={activeGlobal}
          onEnd={() => setActiveGlobalVisibility(true)}
          percentVisibility={
            activeGlobalVisibility ? 'text-xs text-gray-600' : 'invisible'
          }
          percentValue={activeGlobalPercent}
          delay={250}
          help={`Out of all ${confirmedGlobal.toLocaleString()} confirmed cases ${activeGlobalPercent}% are still active`}
          helpBg="bg-yellow-100"
          helpBorder="border-yellow-500"
        />
        <Box
          classNameCount="text-3xl md:text-4xl leading-normal block text-indigo-600"
          title="Affected Countries"
          count={countriesAffected}
          delay={300}
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartGlobal(!chartGlobal)}
        chartVisible={chartGlobal}
        barLabel={[
          'Tests Conducted',
          'Cases',
          'Recovered',
          'Deaths',
          'Active Case',
        ]}
        barDataColor={['#2b6cb0', '#afb6c1', '#52a571', '#e53e3e', '#d69e2e']}
        barDataValue={[
          testsGlobal,
          confirmedGlobal,
          recoveredGlobal,
          deathsGlobal,
          activeGlobal,
        ]}
        lineCasesLabel={globalHistoricalDataConfirmedLabel}
        lineCasesValue={globalHistoricalDataConfirmedValue}
        lineRecoveredLabel={globalHistoricalDataRecoveredLabel}
        lineRecoveredValue={globalHistoricalDataRecoveredValue}
        lineDeathsLabel={globalHistoricalDataDeathsLabel}
        lineDeathsValue={globalHistoricalDataDeathsValue}
      />

      <h2 className="md:w-2/3 py-4 mt-4 mx-auto text-2xl">
        Basic Protective Measures
      </h2>
      <div className="md:w-2/3 text-left p-6 py-8 mx-4 md:mx-auto shadow bg-white rounded-lg">
        <Tip
          image={CLEAN_HANDS}
          title="Wash your hands frequently"
          description="Regularly and thoroughly clean your hands with an alcohol-based hand
          rub or wash them with soap and water."
        />
        <Tip
          image={SOCIAL_DISTANCING}
          title="Maintain social distancing"
          description="Maintain at least 1 metre (3 feet) distance between yourself and
          anyone who is coughing or sneezing."
        />
        <Tip
          image={DOCTOR}
          title="Avoid touching eyes, nose and mouth"
          description="Hands touch many surfaces and can pick up viruses. Once contaminated,
          hands can transfer the virus to your eyes, nose or mouth. From there,
          the virus can enter your body and can make you sick."
        />
        <Tip
          image={FLU_MASK}
          title="Practice respiratory hygiene"
          description="Make sure you, and the people around you, follow good respiratory
          hygiene. This means covering your mouth and nose with your bent elbow
          or tissue when you cough or sneeze. Then dispose of the used tissue
          immediately."
        />
        <Tip
          image={HEALTHCARE}
          title="If you have fever, cough and difficulty breathing, seek medical care
          early"
          description="Stay home if you feel unwell. If you have a fever, cough and
          difficulty breathing, seek medical attention and call in advance.
          Follow the directions of your local health authority."
        />
        <Tip
          image={NEWS}
          title="Stay informed and follow advice given by your healthcare provider"
          description="Stay informed on the latest developments about COVID-19. Follow advice
          given by your healthcare provider, your national and local public
          health authority or your employer on how to protect yourself and
          others from COVID-19."
          last
        />
      </div>

      <p className="text-xs text-right text-gray-500 italic md:w-2/3 py-4 mx-auto pr-4 md:pr-0">
        Source{' '}
        <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">
          {' '}
          WHO website
        </a>
      </p>

      <h2 className="md:w-2/3 py-4 px-2 mt-4 mx-auto text-2xl">
        Philippines Covid 19 Hotlines
      </h2>

      <div className="px-2 mt-4">
        <Fade delay={50}>
          <Hotlines />
        </Fade>
      </div>

      <h2 className="md:w-2/3 py-4 px-2 mt-10 mx-auto text-2xl">
        Get The Latest Philippines Covid 19 News
      </h2>
      <div className="tweets p-4 md:flex md:justify-around mx-auto">
        <Fade delay={50}>
          <div className="tweet w-5/6 md:w-1/3 lg:w-1/4 mx-auto md:mx-2 mb-4 md:mb-0 shadow">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="DOHgovph"
              options={{ height: 500 }}
            />
          </div>
        </Fade>
        <Fade delay={150}>
          <div className="tweet w-5/6 md:w-1/3 lg:w-1/4 mx-auto md:mx-2 mb-4 md:mb-0 shadow">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="WHOPhilippines"
              options={{ height: 500 }}
            />
          </div>
        </Fade>
        <Fade delay={200}>
          <div className="tweet w-5/6 md:w-1/3 lg:w-1/4 mx-auto md:mx-2 mb-4 md:mb-0 shadow">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="Covid19Ph"
              options={{ height: 500 }}
            />
          </div>
        </Fade>
      </div>

      <div className="mt-10 md:mt-10 text-3xl">
        Stay Home{' '}
        <span role="img" aria-label="home">
          🏡
        </span>
        <br />
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
