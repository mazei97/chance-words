import { useState, useEffect } from 'react'
import { Typography, List, ListItem, ListItemText, IconButton, Box, Chip, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useWordStore } from '@/store/useWordStore'
import { useRouter } from 'next/router'

export default function Words() {
  const { words, groups, toggleMemorized, deleteWord, getWordsByGroup } = useWordStore()
  const router = useRouter()
  const [selectedGroup, setSelectedGroup] = useState<string>('all')
  const [page, setPage] = useState(1)
  const itemsPerPage = 50

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if (router.query.group) {
      setSelectedGroup(router.query.group as string)
    }
  }, [router.query.group])

  useEffect(() => {
    setPage(1)
  }, [selectedGroup])

  const displayWords = selectedGroup === 'all' ? words : getWordsByGroup(selectedGroup)
  const totalPages = Math.ceil(displayWords.length / itemsPerPage)
  const paginatedWords = displayWords.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  if (words.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" color="text.secondary">
          등록된 단어가 없습니다
        </Typography>
      </Box>
    )
  }

  const memorizedCount = displayWords.filter((w) => w.memorized).length

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
        <Typography variant="h5">단어장</Typography>
        <Chip label={`${memorizedCount} / ${displayWords.length} 암기`} color="primary" />
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>그룹 선택</InputLabel>
        <Select value={selectedGroup} label="그룹 선택" onChange={(e) => setSelectedGroup(e.target.value)}>
          <MenuItem value="all">전체</MenuItem>
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {page} / {totalPages} 페이지
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" disabled={page === 1} onClick={() => setPage(page - 1)}>
              ◀
            </IconButton>
            <IconButton size="small" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              ▶
            </IconButton>
          </Box>
        </Box>
      )}

      <List>
        {paginatedWords.map((word) => {
          const group = groups.find((g) => g.id === word.group)
          return (
            <ListItem
              key={word.id}
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
              }}
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => speakWord(word.english)} sx={{ mr: 1 }}>
                    <VolumeUpIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => toggleMemorized(word.id)} sx={{ mr: 1 }}>
                    {word.memorized ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      if (confirm('이 단어를 삭제하시겠습니까?')) {
                        deleteWord(word.id)
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={
                  <Box>
                    <Typography variant="h6" component="span">
                      {word.english}
                    </Typography>
                    {group && <Chip label={group.name} size="small" sx={{ ml: 1 }} variant="outlined" />}
                  </Box>
                }
                secondary={word.korean}
              />
            </ListItem>
          )
        })}
      </List>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {page} / {totalPages} 페이지
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" disabled={page === 1} onClick={() => setPage(page - 1)}>
              ◀
            </IconButton>
            <IconButton size="small" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              ▶
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}
