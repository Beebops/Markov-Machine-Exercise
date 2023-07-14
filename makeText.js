/** Command-line tool to generate Markov text. */

const fs = require('fs')
const markov = require('./markov')
const axios = require('axios')
const process = require('process')
const { create } = require('domain')

// instantiate the Markov Machine and create text with it
function createText(text) {
  let markMachine = new markov.MarkovMachine(text)
  console.log(markMachine.makeText())
}

// read a file and show text from it
function showText(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      console.error(`Cannot read file: ${path}: ${error}`)
      process.exit(1)
    } else {
      createText(data)
    }
  })
}

// read URL and show text from it
async function showURLText(url) {
  try {
    const response = await axios.get(url)
    createText(response.data)
  } catch (error) {
    console.error(`Cannot read URL: ${url}: ${error}`)
    process.exit(1)
  }
}

let method = process.argv[2]
let path = process.argv[3]

if (method === 'file') {
  showText(path)
} else if (method === 'url') {
  showURLText(path)
} else {
  console.error(`Invalid method: ${method}`)
  process.exit(1)
}
