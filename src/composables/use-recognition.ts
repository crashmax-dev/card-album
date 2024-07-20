import { createGlobalState, useSpeechRecognition } from "@vueuse/core"
import { watch } from "vue"
import { usePagination } from "./use-pagination"
import { useAlbum } from "./use-album"

export const useRecognition = createGlobalState(() => {
  const { toggleAlbumItem } = useAlbum()
  const { totalItems, prevPage, nextPage } = usePagination()
  const speech = useSpeechRecognition({ lang: 'ru-RU', interimResults: true })

  const actions = ['назад', 'вперёд']
  const grammarActions = `#JSGF V1.0; grammar actions; public <action> = ${actions.join(' | ')};`

  if (speech.isSupported.value && speech.recognition) {
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    const speechRecognitionList = new SpeechGrammarList()
    speechRecognitionList.addFromString(grammarActions, 1)
    speech.recognition.grammars = speechRecognitionList

    watch(speech.result, (result) => {
      if (!speech.isFinal) return

      for (const text of result.toLowerCase().split(' ').reverse()) {
        const num = parseInt(text)
        if (!Number.isNaN(num) && num > 0 && num <= totalItems.value) {
          toggleAlbumItem(num)
          break
        }

        if (actions.includes(text)) {
          triggerAction(text)
          break
        }
      }
    })
  }

  function toggleRecognition() {
    speech.toggle()
  }

  function triggerAction(text: string) {
    if (text === 'назад') {
      prevPage()
    } else if (text === 'вперёд') {
      nextPage()
    }
  }

  return {
    toggleRecognition
  }
})
