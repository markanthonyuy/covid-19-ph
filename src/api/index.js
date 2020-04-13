const API_ENDPOINT = 'https://covid19.mathdro.id/api/'

export const phData = async () => {
  try {
    const data = await fetch(`${API_ENDPOINT}countries/ph/`).then((res) =>
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

export const globalData = async () => {
  try {
    const data = await fetch(`${API_ENDPOINT}`).then((res) => res.json())
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

export default { phData, globalData }
