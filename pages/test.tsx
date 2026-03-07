import { useState, useEffect } from 'react'
import { Typography, Button, Box, Card, CardContent, TextField, LinearProgress, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useWordStore } from '@/store/useWordStore'

export default function Test() {
  const { words, groups, totalScore, addScore, getWordsByGroup } = useWordStore()
  const [testWords, setTestWords] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [testStarted, setTestStarted] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string>('all')

  const startTest = () => {
    const targetWords = selectedGroup === 'all' ? words : getWordsByGroup(selectedGroup)
    const shuffled = [...targetWords].sort(() => Math.random() - 0.5)
    setTestWords(shuffled)
    setCurrentIndex(0)
    setScore(0)
    setTestStarted(true)
    setShowResult(false)
    setAnswer('')
  }

  const checkAnswer = () => {
    const currentWord = testWords[currentIndex]
    // 쉼표로 구분된 여러 뜻 중 하나라도 맞으면 정답 처리
    const meanings = currentWord.korean.split(',').map((m: string) => m.trim().toLowerCase().replace(/\s/g, ''))
    const userAnswer = answer.trim().toLowerCase().replace(/\s/g, '')
    const isCorrect = meanings.some((meaning: string) => meaning === userAnswer)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentIndex < testWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswer('')
      setShowResult(false)
    }
  }

  const finishTest = () => {
    // 테스트 완료 시 점수를 누적
    addScore(score)
    setTestStarted(false)
  }

  if (words.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" color="text.secondary">
          테스트할 단어가 없습니다
        </Typography>
      </Box>
    )
  }

  if (!testStarted) {
    const targetWords = selectedGroup === 'all' ? words : getWordsByGroup(selectedGroup)
    
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          단어 테스트
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Chip label={`누적 점수: ${totalScore}점`} color="primary" sx={{ fontSize: '1.1rem', py: 3, px: 2 }} />
        </Box>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>테스트할 그룹</InputLabel>
          <Select value={selectedGroup} label="테스트할 그룹" onChange={(e) => setSelectedGroup(e.target.value)}>
            <MenuItem value="all">전체</MenuItem>
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {selectedGroup === 'all' ? '전체' : groups.find((g) => g.id === selectedGroup)?.name} {targetWords.length}개의 단어를 테스트합니다
        </Typography>
        <Button variant="contained" size="large" onClick={startTest} disabled={targetWords.length === 0}>
          테스트 시작
        </Button>
      </Box>
    )
  }

  const currentWord = testWords[currentIndex]
  const progress = ((currentIndex + 1) / testWords.length) * 100
  const isLastQuestion = currentIndex === testWords.length - 1

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          문제 {currentIndex + 1} / {testWords.length}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <Card elevation={3}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h3" component="div" gutterBottom>
            {currentWord.english}
          </Typography>

          <TextField
            fullWidth
            label="한글 뜻을 입력하세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={showResult}
            sx={{ mt: 3, mb: 3 }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !showResult) {
                checkAnswer()
              }
            }}
          />

          {showResult && (
            <Box sx={{ mb: 3 }}>
              {(() => {
                const meanings = currentWord.korean.split(',').map((m: string) => m.trim().toLowerCase().replace(/\s/g, ''))
                const userAnswer = answer.trim().toLowerCase().replace(/\s/g, '')
                const isCorrect = meanings.some((meaning: string) => meaning === userAnswer)
                return (
                  <>
                    <Typography variant="h6" color={isCorrect ? 'success.main' : 'error.main'}>
                      {isCorrect ? '정답!' : '오답'}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      정답: {currentWord.korean}
                    </Typography>
                  </>
                )
              })()}
            </Box>
          )}

          {!showResult ? (
            <Button variant="contained" size="large" onClick={checkAnswer} disabled={!answer.trim()}>
              확인
            </Button>
          ) : isLastQuestion ? (
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                테스트 완료!
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
                점수: {score} / {testWords.length}
              </Typography>
              <Button variant="contained" onClick={finishTest}>
                완료
              </Button>
            </Box>
          ) : (
            <Button variant="contained" onClick={nextQuestion}>
              다음 문제
            </Button>
          )}
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          현재 점수: {score} / {currentIndex + (showResult ? 1 : 0)}
        </Typography>
      </Box>
    </Box>
  )
}
