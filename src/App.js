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

  const getPHData = async () => {
    await API.phData().then((res) => {
      setConfirmedPH(res.confirmed)
      setRecoveredPH(res.recovered)
      setDeathsPH(res.deaths)
      setDeathsPHPercent(((res.deaths / res.confirmed) * 100).toFixed(2))
      setRecoveredPHPercent(((res.recovered / res.confirmed) * 100).toFixed(2))
    })
  }

  const getGlobalData = async () => {
    await API.globalData().then((res) => {
      setConfirmedGlobal(res.confirmed)
      setRecoveredGlobal(res.recovered)
      setDeathsGlobal(res.deaths)
      setUpdate(res.lastUpdate)
      setDeathsGlobalPercent(((res.deaths / res.confirmed) * 100).toFixed(2))
      setRecoveredGlobalPercent(
        ((res.recovered / res.confirmed) * 100).toFixed(2)
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
    <div className="App">
      <Header />

      <h2 className="text-5xl p-5">
        Philippines{' '}
        <img src={FLAG_PH} width="40" className="inline mb-1" alt="" />
      </h2>
      <div className="body w-5/6 lg:w-3/4 mx-auto md:flex justify-center items-center">
        <Box
          classNameBox="md:w-1/3 flex-1 flex flex-col justify-center md:justify-start box p-3 md:p-5 bg-white rounded-lg mx-0 md:mr-2 mb-3 md:mb-0 shadow"
          classNameBoxTitle="text-xl"
          classNameCount="text-5xl leading-normal block"
          title="Cases"
          count={confirmedPH}
          delay={100}
        />

        <Box
          hasPercent
          classNameBox="md:w-1/3 flex-1 flex flex-col justify-center md:justify-start box p-3 md:p-5 bg-white rounded-lg mx-0 md:mx-1 mb-3 md:mb-0 shadow"
          classNameBoxTitle="text-xl"
          classNameCount="text-5xl leading-normal block text-green-700"
          title="Recovered"
          count={recoveredPH}
          onEnd={() => setRecoveredPHPercentVisibility(true)}
          percentVisibility={
            recoveredPHPercentVisibility ? 'text-sm text-gray-600' : 'invisible'
          }
          percentValue={recoveredPHPercent}
          delay={200}
        />

        <Box
          hasPercent
          classNameBox="md:w-1/3 flex-1 flex flex-col justify-center md:justify-start box p-3 md:p-5 bg-white rounded-lg mx-0 md:ml-2 mb-3 md:mb-0 shadow"
          classNameBoxTitle="text-xl"
          classNameCount="text-5xl leading-normal block text-red-600"
          title="Deaths"
          count={deathsPH}
          onEnd={() => setDeathsPHPercentVisibility(true)}
          percentVisibility={
            deathsPHPercentVisibility ? 'text-sm text-gray-600' : 'invisible'
          }
          percentValue={deathsPHPercent}
          delay={300}
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartPH(!chartPH)}
        chartVisible={chartPH}
        casesColor="#fff"
        recoveredColor="#52a571"
        deathsColor="#e53e3e"
        casesValue={confirmedPH}
        recoveredValue={recoveredPH}
        deathsValue={deathsPH}
      />

      <h2 className="text-xl mt-5 mb-2">Global</h2>
      <div className="body md:flex justify-center bg-white md:pb-3 rounded-md w-5/6 lg:w-3/4 mx-auto shadow">
        <Box
          classNameBox="md:w-1/3 py-4 md:py-0 border-b border-gray-300 md:border-b-0"
          classNameBoxTitle="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b mb-2"
          classNameCount="text-2xl mb-1"
          title="Cases"
          count={confirmedGlobal}
          delay={100}
        />

        <Box
          hasPercent
          classNameBox="md:w-1/3 py-4 md:py-0 border-b border-gray-300 md:border-b-0"
          classNameBoxTitle="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b mb-2"
          classNameCount="text-2xl mb-1 block text-green-700"
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
          classNameBox="md:w-1/3 py-4 md:py-0"
          classNameBoxTitle="md:w-2/3 mx-auto md:my-2 md:p-2 text-md md:border-b mb-2"
          classNameCount="text-2xl mb-1 block text-red-600"
          title="Deaths"
          count={deathsGlobal}
          onEnd={() => setDeathGlobalVisibility(true)}
          percentVisibility={
            deathGlobalVisibility ? 'text-xs text-gray-600' : 'invisible'
          }
          percentValue={deathsGlobalPercent}
          delay={300}
        />
      </div>

      <BtnShowGraph
        clickFn={() => setChartGlobal(!chartGlobal)}
        chartVisible={chartGlobal}
        casesColor="#fff"
        recoveredColor="#52a571"
        deathsColor="#e53e3e"
        casesValue={confirmedGlobal}
        recoveredValue={recoveredGlobal}
        deathsValue={deathsGlobal}
      />

      <p className="mt-4 text-sm">
        Last update was{' '}
        <ReactTimeAgo
          date={new Date(update.substr(0, update.length - 5)).getTime()}
          live="false"
        />
      </p>

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
