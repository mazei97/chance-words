import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Word, WordGroup } from '@/types/word'

const initialGroups: WordGroup[] = [
  { id: '1', name: 'Day 1', createdAt: Date.now() },
  { id: '2', name: 'Day 2', createdAt: Date.now() },
  { id: '3', name: 'Day 3', createdAt: Date.now() },
  { id: '4', name: 'Day 4', createdAt: Date.now() },
  { id: '5', name: 'Day 5', createdAt: Date.now() },
]

const initialWords: Word[] = [
  { id: '1', english: 'apple', korean: '사과', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '2', english: 'book', korean: '책', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '3', english: 'cat', korean: '고양이', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '4', english: 'dog', korean: '개', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '5', english: 'egg', korean: '달걀', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '6', english: 'fish', korean: '물고기', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '7', english: 'girl', korean: '소녀', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '8', english: 'house', korean: '집', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '9', english: 'ice', korean: '얼음', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '10', english: 'juice', korean: '주스', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '11', english: 'king', korean: '왕', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '12', english: 'lion', korean: '사자', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '13', english: 'moon', korean: '달', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '14', english: 'nose', korean: '코', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '15', english: 'orange', korean: '오렌지', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '16', english: 'pen', korean: '펜', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '17', english: 'queen', korean: '여왕', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '18', english: 'rain', korean: '비', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '19', english: 'sun', korean: '태양', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '20', english: 'tree', korean: '나무', memorized: false, createdAt: Date.now(), group: '1' },
  { id: '21', english: 'umbrella', korean: '우산', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '22', english: 'violin', korean: '바이올린', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '23', english: 'water', korean: '물', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '24', english: 'yellow', korean: '노란색', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '25', english: 'zoo', korean: '동물원', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '26', english: 'ball', korean: '공', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '27', english: 'car', korean: '자동차', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '28', english: 'door', korean: '문', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '29', english: 'ear', korean: '귀', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '30', english: 'flower', korean: '꽃', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '31', english: 'green', korean: '초록색', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '32', english: 'hand', korean: '손', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '33', english: 'island', korean: '섬', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '34', english: 'jump', korean: '점프하다', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '35', english: 'kite', korean: '연', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '36', english: 'lamp', korean: '램프', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '37', english: 'milk', korean: '우유', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '38', english: 'night', korean: '밤', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '39', english: 'ocean', korean: '바다', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '40', english: 'pig', korean: '돼지', memorized: false, createdAt: Date.now(), group: '2' },
  { id: '41', english: 'rabbit', korean: '토끼', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '42', english: 'star', korean: '별', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '43', english: 'table', korean: '테이블', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '44', english: 'uncle', korean: '삼촌', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '45', english: 'village', korean: '마을', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '46', english: 'window', korean: '창문', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '47', english: 'box', korean: '상자', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '48', english: 'chair', korean: '의자', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '49', english: 'desk', korean: '책상', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '50', english: 'eye', korean: '눈', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '51', english: 'face', korean: '얼굴', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '52', english: 'garden', korean: '정원', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '53', english: 'hat', korean: '모자', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '54', english: 'ink', korean: '잉크', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '55', english: 'jacket', korean: '재킷', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '56', english: 'key', korean: '열쇠', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '57', english: 'leg', korean: '다리', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '58', english: 'map', korean: '지도', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '59', english: 'neck', korean: '목', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '60', english: 'owl', korean: '올빼미', memorized: false, createdAt: Date.now(), group: '3' },
  { id: '61', english: 'park', korean: '공원', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '62', english: 'red', korean: '빨간색', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '63', english: 'ship', korean: '배', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '64', english: 'toy', korean: '장난감', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '65', english: 'van', korean: '밴', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '66', english: 'wall', korean: '벽', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '67', english: 'yard', korean: '마당', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '68', english: 'zebra', korean: '얼룩말', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '69', english: 'ant', korean: '개미', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '70', english: 'bear', korean: '곰', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '71', english: 'cake', korean: '케이크', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '72', english: 'duck', korean: '오리', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '73', english: 'elephant', korean: '코끼리', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '74', english: 'frog', korean: '개구리', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '75', english: 'goat', korean: '염소', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '76', english: 'horse', korean: '말', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '77', english: 'insect', korean: '곤충', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '78', english: 'jam', korean: '잼', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '79', english: 'kangaroo', korean: '캥거루', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '80', english: 'leaf', korean: '나뭇잎', memorized: false, createdAt: Date.now(), group: '4' },
  { id: '81', english: 'monkey', korean: '원숭이', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '82', english: 'nest', korean: '둥지', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '83', english: 'onion', korean: '양파', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '84', english: 'potato', korean: '감자', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '85', english: 'rice', korean: '쌀', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '86', english: 'snake', korean: '뱀', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '87', english: 'tiger', korean: '호랑이', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '88', english: 'vest', korean: '조끼', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '89', english: 'whale', korean: '고래', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '90', english: 'wolf', korean: '늑대', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '91', english: 'bread', korean: '빵', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '92', english: 'cheese', korean: '치즈', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '93', english: 'cloud', korean: '구름', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '94', english: 'drum', korean: '드럼', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '95', english: 'fire', korean: '불', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '96', english: 'grass', korean: '풀', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '97', english: 'hill', korean: '언덕', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '98', english: 'mountain', korean: '산', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '99', english: 'river', korean: '강', memorized: false, createdAt: Date.now(), group: '5' },
  { id: '100', english: 'wind', korean: '바람', memorized: false, createdAt: Date.now(), group: '5' },
]

interface WordStore {
  words: Word[]
  groups: WordGroup[]
  selectedGroup: string | null
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
}

export const useWordStore = create<WordStore>()(
  persist(
    (set, get) => ({
      words: initialWords,
      groups: initialGroups,
      selectedGroup: null,

      addWord: (english, korean, group) => {
        const newWord: Word = {
          id: Date.now().toString(),
          english,
          korean,
          memorized: false,
          createdAt: Date.now(),
          group: group || get().selectedGroup || get().groups[0]?.id || '1',
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
          group: group || get().selectedGroup || get().groups[0]?.id || '1',
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
                group: group || get().selectedGroup || get().groups[0]?.id || '1',
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
    }),
    {
      name: 'word-storage',
    }
  )
)
