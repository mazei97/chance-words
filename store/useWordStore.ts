import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Word, WordGroup } from '@/types/word'
import { dictionary } from '@/data/dictionary'

const initialGroups: WordGroup[] = [
  { id: 'a', name: 'A', createdAt: Date.now() },
  { id: 'b', name: 'B', createdAt: Date.now() },
  { id: 'c', name: 'C', createdAt: Date.now() },
  { id: 'd', name: 'D', createdAt: Date.now() },
  { id: 'e', name: 'E', createdAt: Date.now() },
  { id: 'f', name: 'F', createdAt: Date.now() },
  { id: 'g', name: 'G', createdAt: Date.now() },
  { id: 'h', name: 'H', createdAt: Date.now() },
  { id: 'i', name: 'I', createdAt: Date.now() },
  { id: 'j', name: 'J', createdAt: Date.now() },
  { id: 'k', name: 'K', createdAt: Date.now() },
  { id: 'l', name: 'L', createdAt: Date.now() },
  { id: 'm', name: 'M', createdAt: Date.now() },
  { id: 'n', name: 'N', createdAt: Date.now() },
  { id: 'o', name: 'O', createdAt: Date.now() },
  { id: 'p', name: 'P', createdAt: Date.now() },
  { id: 'q', name: 'Q', createdAt: Date.now() },
  { id: 'r', name: 'R', createdAt: Date.now() },
  { id: 's', name: 'S', createdAt: Date.now() },
  { id: 't', name: 'T', createdAt: Date.now() },
  { id: 'u', name: 'U', createdAt: Date.now() },
  { id: 'v', name: 'V', createdAt: Date.now() },
  { id: 'w', name: 'W', createdAt: Date.now() },
  { id: 'x', name: 'X', createdAt: Date.now() },
  { id: 'y', name: 'Y', createdAt: Date.now() },
  { id: 'z', name: 'Z', createdAt: Date.now() },
]

// dictionary 데이터를 Word 배열로 변환
const createInitialWords = (): Word[] => {
  const words: Word[] = []
  let idCounter = 1

  Object.entries(dictionary).forEach(([english, koreanArray]) => {
    const firstLetter = english[0].toLowerCase()
    const groupId = /[a-z]/.test(firstLetter) ? firstLetter : 'a'

    words.push({
      id: (idCounter++).toString(),
      english,
      korean: koreanArray.join(', '), // 여러 뜻을 쉼표로 연결
      memorized: false,
      createdAt: Date.now(),
      group: groupId,
    })
  })

  return words
}

const initialWords: Word[] = createInitialWords()

interface WordStore {
  words: Word[]
  groups: WordGroup[]
  selectedGroup: string | null
  totalScore: number
  addWord: (english: string, korean: string, group?: string) => void
  addWords: (words: { english: string; korean: string }[], group?: string) => void
  addOrUpdateWords: (words: { english: string; korean: string }[], group?: string) => void
  toggleMemorized: (id: string) => void
  deleteWord: (id: string) => void
  getRandomWord: (groupId?: string) => Word | null
  getUnmemorizedWords: () => Word[]
  addGroup: (name: string) => void
  deleteGroup: (id: string) => void
  setSelectedGroup: (groupId: string | null) => void
  getWordsByGroup: (groupId: string) => Word[]
  addScore: (score: number) => void
}

export const useWordStore = create<WordStore>()(
  persist(
    (set, get) => ({
      words: initialWords,
      groups: initialGroups,
      selectedGroup: null,
      totalScore: 0,

      addWord: (english, korean, group) => {
        const newWord: Word = {
          id: Date.now().toString(),
          english,
          korean,
          memorized: false,
          createdAt: Date.now(),
          group: group || get().selectedGroup || get().groups[0]?.id || 'a',
        }
        set((state) => ({ words: [...state.words, newWord] }))
      },

      addWords: (newWords, group) => {
        const words = newWords.map((word) => ({
          id: Date.now().toString() + Math.random(),
          english: word.english,
          korean: word.korean,
          memorized: false,
          createdAt: Date.now(),
          group: group || get().selectedGroup || get().groups[0]?.id || 'a',
        }))
        set((state) => ({ words: [...state.words, ...words] }))
      },

      addOrUpdateWords: (newWords, group) => {
        set((state) => {
          const existingWords = [...state.words]
          let addedCount = 0
          let updatedCount = 0

          newWords.forEach((newWord) => {
            const existingIndex = existingWords.findIndex((w) => w.english.toLowerCase() === newWord.english.toLowerCase())

            if (existingIndex >= 0) {
              // 기존 단어 업데이트 (뜻만 변경, 암기 상태 유지)
              existingWords[existingIndex] = {
                ...existingWords[existingIndex],
                korean: newWord.korean,
                group: group || existingWords[existingIndex].group,
              }
              updatedCount++
            } else {
              // 새 단어 추가
              existingWords.push({
                id: Date.now().toString() + Math.random(),
                english: newWord.english,
                korean: newWord.korean,
                memorized: false,
                createdAt: Date.now(),
                group: group || get().selectedGroup || get().groups[0]?.id || 'a',
              })
              addedCount++
            }
          })

          // 결과 알림을 위해 window 객체에 저장
          ;(window as any).__wordUpdateResult = { addedCount, updatedCount }

          return { words: existingWords }
        })
      },

      toggleMemorized: (id) => {
        set((state) => ({
          words: state.words.map((word) => (word.id === id ? { ...word, memorized: !word.memorized } : word)),
        }))
      },

      deleteWord: (id) => {
        set((state) => ({
          words: state.words.filter((word) => word.id !== id),
        }))
      },

      getRandomWord: (groupId) => {
        const { words, selectedGroup } = get()
        const targetGroup = groupId || selectedGroup
        const filteredWords = targetGroup ? words.filter((w) => w.group === targetGroup) : words

        if (filteredWords.length === 0) return null
        const randomIndex = Math.floor(Math.random() * filteredWords.length)
        return filteredWords[randomIndex]
      },

      getUnmemorizedWords: () => {
        return get().words.filter((word) => !word.memorized)
      },

      addGroup: (name) => {
        const newGroup: WordGroup = {
          id: Date.now().toString(),
          name,
          createdAt: Date.now(),
        }
        set((state) => ({ groups: [...state.groups, newGroup] }))
      },

      deleteGroup: (id) => {
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== id),
          words: state.words.filter((word) => word.group !== id),
          selectedGroup: state.selectedGroup === id ? null : state.selectedGroup,
        }))
      },

      setSelectedGroup: (groupId) => {
        set({ selectedGroup: groupId })
      },

      getWordsByGroup: (groupId) => {
        return get().words.filter((word) => word.group === groupId)
      },

      addScore: (score) => {
        set((state) => ({ totalScore: state.totalScore + score }))
      },
    }),
    {
      name: 'word-storage',
    }
  )
)
