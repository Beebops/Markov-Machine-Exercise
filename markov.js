/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/) // split the input text into an array of words
    this.words = words.filter((c) => c !== '') // filter out the empty spaces
    this.makeChains()
  }

  makeChains() {
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    let chains = new Map()
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]
      let nextWord = this.words[i + 1] || null

      if (chains.has(word)) {
        chains.get(word).push(nextWord)
      } else {
        chains.set(word, [nextWord])
      }
    }
    this.chains = chains
  }

  /** return random text from chains */
  static getWord(arr) {
    if (arr.length === 0) {
      return null
    }
    return arr[Math.floor(Math.random() * arr.length)]
  }

  makeText(numWords = 100) {
    // get a random word key
    let keys = Array.from(this.chains.keys())
    let key = MarkovMachine.getWord(keys)
    let output = []
    let wordCount = 0
    // push random words into output array
    while (wordCount < numWords && key !== null) {
      output.push(key)
      key = MarkovMachine.getWord(this.chains.get(key))
      wordCount++
    }
    return output.join(' ')
  }
}

module.exports = { MarkovMachine }
