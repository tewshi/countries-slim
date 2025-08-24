import { writeFile } from 'node:fs/promises'

/**
 * downloads the json file from a url
 * @param {string} url
 * @returns {Promise<{name: string; iso3: string; iso2: string; currency: string; emoji: string; emojiU: string; states: {name: string; iso3166_2: string; cities: {name: string}[]}[]}[]>}
 */
export const getFileFromUrl = async (url) => {
  return (await fetch(url)).json()
}

/**
 * picks out only required fields from the json data
 * @param {{name: string; iso3: string; iso2: string; currency: string; emoji: string; emojiU: string; states: {name: string; iso3166_2: string; cities: {name: string}[]}[]}[]} data
 * @returns {{countries: {name: string; iso3: string; iso2: string; currency: string; emoji: string; emojiU: string}[], states: {name: string; iso3: string}[], cities: {name: string; state_code: string}[]}}
 */
export const slimJson = (data) => {
  const countries = []
  const states = []
  const cities = []
  for (const country of data) {
    countries.push({
      name: country.name,
      iso3: country.iso3,
      iso2: country.iso2,
      currency: country.currency,
      emoji: country.emoji,
      emojiU: country.emojiU,
    })

    for (const state of country.states) {
      states.push({
        name: state.name,
        iso3: state.iso3166_2,
      })

      for (const city of state.cities) {
        cities.push({
          name: city.name,
          state_code: state.iso3166_2,
        })
      }
    }
  }

  return { countries, states, cities }
}

/**
 * saves the array content to file
 * @param {({name: string; iso3: string; iso2: string; currency: string; emoji: string; emojiU: string}|{name: string; iso3: string}|{name: string; state_code: string})[]} arr - the input
 * @param {string} name - the name of the exported file
 * @returns {Promise<void>}
 */
export const saveToFile = async (arr, name) => {
  const file = new Blob([JSON.stringify(arr)], { type: 'text/json' })
  const bytes = await file.bytes()
  return writeFile(name, bytes, { encoding: 'utf8' })
}
