export interface Word {
  id: string
  english: string
  korean: string
  memorized: boolean
  createdAt: number
  group: string
}

export interface WordGroup {
  id: string
  name: string
  createdAt: number
}
