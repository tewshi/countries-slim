import { getFileFromUrl, saveToFile, slimJson } from './src/lib.mjs'
/**
 * @type {{name: string; iso3: string; iso2: string; currency: string; emoji: string; emojiU: string; states: {name: string; iso3166_2: string; cities: {name: string}[]}[]}[]}
 */
import jsonFile from './src/countries+states+cities.json' with { type: 'json' }

const saveFromFile = () => {
  const { countries, states, cities } = slimJson(jsonFile)
  void saveToFile(countries, './dist/countries.json')
  void saveToFile(states, './dist/states.json')
  void saveToFile(cities, './dist/cities.json')
}

const saveFromUrl = async () => {
  const json = await getFileFromUrl(
    'https://github.com/dr5hn/countries-states-cities-database/raw/refs/heads/master/json/countries+states+cities.json'
  )
  const { countries, states, cities } = slimJson(json)
  void saveToFile(countries, './dist/countries-from-url.json')
  void saveToFile(states, './dist/states-from-url.json')
  void saveToFile(cities, './dist/cities-from-url.json')
}

saveFromFile()
// get fresh json data from the repo if needed
// void saveFromUrl()
