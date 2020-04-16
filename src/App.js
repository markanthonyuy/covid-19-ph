import React, { useState, useEffect } from 'react'
import './css/App.css'
import './css/tw.css'
import ReactTimeAgo from 'react-timeago'
import Fade from 'react-reveal/Fade'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { Box, Header, Footer, BtnShowGraph, Tip, Hotlines } from './components'
import {
  CLEAN_HANDS,
  DOCTOR,
  FLU_MASK,
  HEALTHCARE,
  NEWS,
  SOCIAL_DISTANCING,
  FLAG_PH,
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

  // Global
  const [testsGlobal, setTestsGlobal] = useState(0)
  const [confirmedGlobal, setConfirmedGlobal] = useState(0)
  const [recoveredGlobal, setRecoveredGlobal] = useState(0)
  const [deathsGlobal, setDeathsGlobal] = useState(0)
  const [activeGlobal, setActiveGlobal] = useState(0)

  const [confirmedGlobalPercent, setConfirmedGlobalPercent] = useState(0)
  const [deathsGlobalPercent, setDeathsGlobalPercent] = useState(0)
  const [recoveredGlobalPercent, setRecoveredGlobalPercent] = useState(0)
  const [activeGlobalPercent, setActiveGlobalPercent] = useState(0)

  const [confirmedGlobalVisibility, setConfirmedGlobalVisibility] = useState(
    false
  )
  const [deathGlobalVisibility, setDeathGlobalVisibility] = useState(false)
  const [recoveredGlobalVisibility, setRecoveredGlobalVisibility] = useState(
    false
  )
  const [activeGlobalVisibility, setActiveGlobalVisibility] = useState(false)

  const [countriesAffected, setCountriesAffected] = useState(0)
  const [update, setUpdate] = useState('')
  const [chartPH, setChartPH] = useState(false)
  const [chartGlobal, setChartGlobal] = useState(false)

  const getPHData = async () => {
    if (document.hidden) return
    await API.phDataComplete().then((res) => {
      setTestsPH(res.tests)
      setConfirmedPH(res.confirmed)
      setConfirmedTodayPH(res.todayCases)
      setRecoveredPH(res.recovered)
      setDeathsPH(res.deaths)
      setDeathsTodayPH(res.todayDeaths)
      setActivePH(res.active)
      setConfirmedPHPercent(((res.confirmed / res.tests) * 100).toFixed(2))
      setDeathsPHPercent(((res.deaths / res.confirmed) * 100).toFixed(2))
      setRecoveredPHPercent(((res.recovered / res.confirmed) * 100).toFixed(2))
      setActivePHPercent(((res.active / res.confirmed) * 100).toFixed(2))
      setUpdate(res.lastUpdate)
    })
  }

  const getGlobalData = async () => {
    if (document.hidden) return
    await API.phGlobalDataComplete().then((res) => {
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

  useEffect(() => {
    getPHData()
    setInterval(getPHData, 300000)
    getGlobalData()
    setInterval(getGlobalData, 300000)
  }, [])

  return (
    <div className="App">
      <Header />

      <h2 className="text-5xl p-5">
        Philippines{' '}
        <img src={FLAG_PH} width="40" className="inline mb-1" alt="" />
      </h2>
      <h3 className="w-11/12 lg:w-5/6 mx-auto text-2xl p-2 clearfix text-left">
        <span className="md:float-left text-left">
          Today
          <sup className="text-xs text-gray-500 ml-2">
            {update && new Date(update).toLocaleDateString()}
          </sup>
        </span>
        <p className="md:float-right text-sm mt-2 text-gray-500">
          Last update was <ReactTimeAgo date={update} live="false" />
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
      <p className="w-11/12 lg:w-5/6 mx-auto p-2 italic text-xs text-left mb-4 text-gray-500">
        * Note: 0 value might indicate no reports yet from the Department of
        Health
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
          delay={100}
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
          delay={200}
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
          delay={300}
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
          delay={400}
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
          delay={500}
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartPH(!chartPH)}
        chartVisible={chartPH}
        casesColor="#afb6c1"
        recoveredColor="#52a571"
        deathsColor="#e53e3e"
        activeColor="#d69e2e"
        casesValue={confirmedPH}
        recoveredValue={recoveredPH}
        deathsValue={deathsPH}
        activeValue={activePH}
      />

      <h2 className="text-5xl mt-5 mb-2">Global</h2>
      <div className="body w-11/12 lg:w-5/6 mx-auto clearfix">
        <Box
          classNameCount="text-3xl md:text-4xl leading-normal block text-purple-600"
          title="Affected Countries"
          count={countriesAffected}
          delay={500}
        />
        <Box
          classNameCount="text-3xl md:text-4xl leading-normal block text-blue-700"
          title="Tests Conducted"
          count={testsGlobal}
          delay={100}
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
          delay={200}
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
          delay={200}
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
          delay={300}
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
          delay={300}
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartGlobal(!chartGlobal)}
        chartVisible={chartGlobal}
        casesColor="#afb6c1"
        recoveredColor="#52a571"
        deathsColor="#e53e3e"
        activeColor="#d69e2e"
        casesValue={confirmedGlobal}
        recoveredValue={recoveredGlobal}
        deathsValue={deathsGlobal}
        activeValue={activeGlobal}
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
        <Fade delay={100}>
          <Hotlines />
        </Fade>
      </div>

      <h2 className="md:w-2/3 py-4 px-2 mt-10 mx-auto text-2xl">
        Get The Latest Philippines Covid 19 News
      </h2>
      <div className="tweets p-4 md:flex md:justify-around mx-auto">
        <Fade delay={100}>
          <div className="tweet w-5/6 md:w-1/3 lg:w-1/4 mx-auto md:mx-2 mb-4 md:mb-0 shadow">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="DOHgovph"
              options={{ height: 500 }}
            />
          </div>
        </Fade>
        <Fade delay={200}>
          <div className="tweet w-5/6 md:w-1/3 lg:w-1/4 mx-auto md:mx-2 mb-4 md:mb-0 shadow">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="WHOPhilippines"
              options={{ height: 500 }}
            />
          </div>
        </Fade>
        <Fade delay={300}>
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
