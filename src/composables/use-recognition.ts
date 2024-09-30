import { watch } from 'vue'
import { createGlobalState, useSpeechRecognition } from '@vueuse/core'
import { usePagination } from './use-pagination'
import { useAlbum } from './use-album'

interface RecogintionGrammar {
  grammars: string[]
  value?: number
  action?: (text: string) => void
}

const DIGIT_GRAMMARS = [
  ['один', 'раз', 'единица'],
  ['два', 'двойка'],
  ['три', 'тройка'],
  ['четыре', 'четвёрка', 'четвёрочка', 'четырейка'],
  ['пять', 'пятёрка', 'пятёрочка'],
  ['шесть', 'шестёрка'],
  ['семь', 'семёрка'],
  ['восемь', 'восьмёрка'],
  ['девять', 'девятка']
]

const DIGITS: RecogintionGrammar[] = Array.from({ length: DIGIT_GRAMMARS.length }, (_, i) => {
  return {
    value: i + 1,
    grammars: DIGIT_GRAMMARS[i],
  }
})

export const useRecognition = createGlobalState(() => {
  const { toggleAlbumItem } = useAlbum()
  const { totalItems, prevPage, nextPage } = usePagination()
  const speech = useSpeechRecognition({ lang: 'ru-RU', interimResults: true })

  const ACTION_GRAMMARS: RecogintionGrammar[] = [
    {
      grammars: ['назад', 'предыдущий'],
      action: () => {
        prevPage()
      }
    },
    {
      grammars: ['вперёд', 'далее', 'следующий'],
      action: () => {
        nextPage()
      }
    }
  ]

  if (speech.isSupported.value && speech.recognition) {
    watch(speech.result, (result) => {
      if (!speech.isFinal) return

      console.log({ result })

      for (const text of result.toLowerCase().split(' ').reverse()) {
        const num = parseInt(text)
        if (!Number.isNaN(num) && num > 0 && num <= totalItems.value) {
          toggleAlbumItem(num)
          break
        }

        const findedDigit = DIGITS.find(digit => digit.grammars.includes(text))
        if (findedDigit?.value) {
          toggleAlbumItem(findedDigit.value)
          break
        }

        for (const action of ACTION_GRAMMARS) {
          for (const grammar of action.grammars) {
            if (text === grammar && action.action) {
              action.action(text)
              break
            }
          }
        }
      }
    })
  }

  function toggleRecognition() {
    speech.toggle()
  }

  return {
    toggleRecognition
  }
})
