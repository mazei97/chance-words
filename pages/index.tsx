import { useState, useEffect } from 'react'
import { Typography, Button, Box, Card, CardContent, IconButton, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useWordStore } from '@/store/useWordStore'

export default function Home() {
  const { words, groups, getRandomWord, toggleMemorized, selectedGroup, setSelectedGroup } = useWordStore()
  const [currentWord, setCurrentWord] = useState<any>(null)
  const [showKorean, setShowKorean] = useState(false)

  const loadRandomWord = () => {
    const word = getRandomWord()
    setCurrentWord(word)
    setShowKorean(false)
  }

  useEffect(() => {
    loadRandomWord()
  }, [selectedGroup])

  if (words.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          등록된 단어가 없습니다
        </Typography>
        <Typography variant="body1" color="text.secondary">
          카메라로 단어를 추가해보세요!
        </Typography>
      </Box>
    )
  }

  if (!currentWord) {
    return null
  }

  const currentGroup = groups.find((g) => g.id === currentWord.group)

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>학습할 그룹</InputLabel>
        <Select value={selectedGroup || 'all'} label="학습할 그룹" onChange={(e) => setSelectedGroup(e.target.value === 'all' ? null : e.target.value)}>
          <MenuItem value="all">전체</MenuItem>
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Card elevation={3}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          {currentGroup && <Chip label={currentGroup.name} color="primary" sx={{ mb: 2 }} />}

          <Typography variant="h3" component="div" gutterBottom>
            {currentWord.english}
          </Typography>

          {showKorean && (
            <Typography variant="h5" color="primary" sx={{ mt: 3 }}>
              {currentWord.korean}
            </Typography>
          )}

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {!showKorean ? (
              <Button variant="contained" size="large" onClick={() => setShowKorean(true)}>
                뜻 보기
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => {
                    toggleMemorized(currentWord.id)
                    loadRandomWord()
                  }}
                >
                  암기 완료
                </Button>
                <Button variant="outlined" onClick={loadRandomWord}>
                  다음 단어
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <IconButton onClick={loadRandomWord} size="large">
          <RefreshIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {selectedGroup ? `${groups.find((g) => g.id === selectedGroup)?.name} 그룹` : '전체'} {words.filter((w) => !selectedGroup || w.group === selectedGroup).length}개 단어
        </Typography>
      </Box>
    </Box>
  )
}
