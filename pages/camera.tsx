import { useState, useRef } from 'react'
import { Box, Button, Typography, TextField, Paper, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import AddIcon from '@mui/icons-material/Add'
import { useWordStore } from '@/store/useWordStore'
import { useRouter } from 'next/router'

export default function Camera() {
  const [image, setImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [manualMode, setManualMode] = useState(false)
  const [english, setEnglish] = useState('')
  const [korean, setKorean] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addWord, addWords, groups } = useWordStore()
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const imageData = event.target?.result as string
      setImage(imageData)
      setLoading(true)

      try {
        const Tesseract = (await import('tesseract.js')).default
        const result = await Tesseract.recognize(imageData, 'eng')
        setExtractedText(result.data.text)
      } catch (error) {
        console.error('OCR 오류:', error)
        alert('텍스트 추출에 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveExtracted = () => {
    const lines = extractedText.split('\n').filter((line) => line.trim())
    const words = lines
      .map((line) => {
        const parts = line.split(/[\s-:]+/)
        return {
          english: parts[0]?.trim() || '',
          korean: parts.slice(1).join(' ').trim() || '뜻 없음',
        }
      })
      .filter((word) => word.english)

    if (words.length > 0) {
      addWords(words, selectedGroup || undefined)
      alert(`${words.length}개의 단어가 추가되었습니다!`)
      router.push('/words')
    }
  }

  const handleManualAdd = () => {
    if (english.trim() && korean.trim()) {
      addWord(english.trim(), korean.trim(), selectedGroup || undefined)
      setEnglish('')
      setKorean('')
      alert('단어가 추가되었습니다!')
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        단어 추가
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button variant={!manualMode ? 'contained' : 'outlined'} onClick={() => setManualMode(false)}>
          카메라로 추가
        </Button>
        <Button variant={manualMode ? 'contained' : 'outlined'} onClick={() => setManualMode(true)}>
          직접 입력
        </Button>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>추가할 그룹</InputLabel>
        <Select value={selectedGroup} label="추가할 그룹" onChange={(e) => setSelectedGroup(e.target.value)}>
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {!manualMode ? (
        <>
          <input type="file" accept="image/*" capture="environment" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />

          <Button variant="contained" fullWidth size="large" startIcon={<CameraAltIcon />} onClick={() => fileInputRef.current?.click()} sx={{ mb: 3 }}>
            사진 촬영 / 업로드
          </Button>

          {image && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <img src={image} alt="Uploaded" style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }} />
            </Paper>
          )}

          {loading && (
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 2 }}>
                텍스트 추출 중...
              </Typography>
            </Box>
          )}

          {extractedText && !loading && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                추출된 텍스트:
              </Typography>
              <TextField multiline fullWidth rows={8} value={extractedText} onChange={(e) => setExtractedText(e.target.value)} sx={{ mb: 2 }} />
              <Button variant="contained" fullWidth onClick={handleSaveExtracted}>
                단어장에 추가
              </Button>
            </Paper>
          )}
        </>
      ) : (
        <Paper sx={{ p: 3 }}>
          <TextField label="영어 단어" fullWidth value={english} onChange={(e) => setEnglish(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="한글 뜻" fullWidth value={korean} onChange={(e) => setKorean(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" fullWidth startIcon={<AddIcon />} onClick={handleManualAdd}>
            추가
          </Button>
        </Paper>
      )}
    </Box>
  )
}
