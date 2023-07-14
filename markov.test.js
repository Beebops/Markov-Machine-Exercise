const { MarkovMachine } = require('./markov')

describe('Markov Machine', () => {
  describe('makeChains', () => {
    it('should set the markov chains correctly', () => {
      const text = 'the wind in my hair'
      const markovMachine = new MarkovMachine(text)
      const expectedChains = new Map([
        ['the', ['wind']],
        ['wind', ['in']],
        ['in', ['my']],
        ['my', ['hair']],
        ['hair', [null]],
      ])
      expect(markovMachine.chains).toEqual(expectedChains)
    })
  })

  describe('getWord', () => {
    it('should return a random word', () => {
      const arr = ['hello', 'I', 'love', 'you']
      const randomWord = MarkovMachine.getWord(arr)
      expect(arr).toContain(randomWord)
    })

    it('should return null if array is empty', () => {
      const arr = []
      const randomWord = MarkovMachine.getWord(arr)
      expect(randomWord).toBeNull()
    })
  })

  describe('makeText', () => {
    let markovMachine

    beforeEach(() => {
      const text = 'The only thing we have to fear is fear itself'
      markovMachine = new MarkovMachine(text)
    })

    it('should return a string of the specified number of words', () => {
      const numOfWords = 5
      const generatedText = markovMachine.makeText(numOfWords)
      const words = generatedText.split(' ')
      expect(words.length).toEqual(numOfWords)
    })

    it('should return an empty string when numWords is 0', () => {
      const numOfWords = 0
      const generatedText = markovMachine.makeText(numOfWords)
      expect(generatedText).toEqual('')
    })

    it('should return a string that includes at least one word from the input text', () => {
      const generatedText = markovMachine.makeText()

      const words = markovMachine.words
      const includesAtLeastOneWord = words.some((word) =>
        generatedText.includes(word)
      )
      expect(includesAtLeastOneWord).toBe(true)
    })
  })
})
