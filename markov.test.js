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
})
