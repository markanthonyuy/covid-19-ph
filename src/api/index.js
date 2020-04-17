const MATHDROID_API_ENDPOINT = 'https://covid19.mathdro.id/api/'
const CORONA_LMAO_NINJA_API_ENDPOINT = 'https://corona.lmao.ninja/v2/'

export const phData = async () => {
  try {
    const data = await fetch(
      `${MATHDROID_API_ENDPOINT}countries/ph/`
    ).then((res) => res.json())
    return {
      confirmed: data.confirmed.value,
      recovered: data.recovered.value,
      deaths: data.deaths.value,
      lastUpdate: data.lastUpdate,
    }
  } catch (e) {
    console.log(e)
  }
}

export const globalData = async () => {
  try {
    const data = await fetch(`${MATHDROID_API_ENDPOINT}`).then((res) =>
      res.json()
    )
    return {
      confirmed: data.confirmed.value,
      recovered: data.recovered.value,
      deaths: data.deaths.value,
      lastUpdate: data.lastUpdate,
    }
  } catch (e) {
    console.log(e)
  }
}

export const phDataComplete = async () => {
  try {
    const data = await fetch(
      `${CORONA_LMAO_NINJA_API_ENDPOINT}countries/ph`
    ).then((res) => res.json())
    return {
      confirmed: data.cases,
      recovered: data.recovered,
      deaths: data.deaths,
      active: data.active,
      todayCases: data.todayCases,
      todayDeaths: data.todayDeaths,
      tests: data.tests,
      lastUpdate: data.updated,
    }
  } catch (e) {
    console.log(e)
  }
}

export const phDataHistorical = async () => {
  try {
    const data = await fetch(
      `${CORONA_LMAO_NINJA_API_ENDPOINT}historical/ph?lastdays=all`
    ).then((res) => res.json())
    return {
      confirmed: data.timeline.cases,
      recovered: data.timeline.recovered,
      deaths: data.timeline.deaths,
    }
  } catch (e) {
    console.log(e)
  }
}

export const globalDataComplete = async () => {
  try {
    const data = await fetch(
      `${CORONA_LMAO_NINJA_API_ENDPOINT}all`
    ).then((res) => res.json())
    return {
      confirmed: data.cases,
      recovered: data.recovered,
      deaths: data.deaths,
      active: data.active,
      todayCases: data.todayCases,
      todayDeaths: data.todayDeaths,
      tests: data.tests,
      lastUpdate: data.updated,
      affectedCountries: data.affectedCountries,
    }
  } catch (e) {
    console.log(e)
  }
}

export const globalDataHistorical = async () => {
  try {
    const data = await fetch(
      `${CORONA_LMAO_NINJA_API_ENDPOINT}historical/all`
    ).then((res) => res.json())
    return {
      confirmed: data.cases,
      recovered: data.recovered,
      deaths: data.deaths,
    }
  } catch (e) {
    console.log(e)
  }
}

export default {
  phData,
  globalData,
  phDataHistorical,
  phDataComplete,
  globalDataComplete,
  globalDataHistorical,
}
