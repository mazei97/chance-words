import { useState, useRef } from 'react'
import { Box, Button, Typography, TextField, Paper, CircularProgress, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { useWordStore } from '@/store/useWordStore'
import { useRouter } from 'next/router'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import AlertDialog from '@/components/AlertDialog'

export default function Camera() {
  const [loading, setLoading] = useState(false)
  const [manualMode, setManualMode] = useState(true)
  const [english, setEnglish] = useState('')
  const [korean, setKorean] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [csvPreview, setCsvPreview] = useState<any[]>([])
  const csvInputRef = useRef<HTMLInputElement>(null)
  const { addWord, addOrUpdateWords, groups } = useWordStore()
  const router = useRouter()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('알림')

  const showAlert = (message: string, title = '알림') => {
    setAlertMessage(message)
    setAlertTitle(title)
    setAlertOpen(true)
  }

  const handleManualAdd = () => {
    if (english.trim() && korean.trim()) {
      addWord(english.trim(), korean.trim(), selectedGroup || undefined)
      setEnglish('')
      setKorean('')
      showAlert('단어가 추가되었습니다!')
    }
  }

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)

    // Excel 파일인 경우
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as string[][]

          const words = jsonData
            .filter((row) => row.length >= 2 && row[0]?.toString().trim() && row[1]?.toString().trim())
            .map((row) => ({
              english: row[0].toString().trim(),
              korean: row[1].toString().trim(),
            }))

          if (words.length > 0) {
            setCsvPreview(words)
          } else {
            showAlert('유효한 데이터가 없습니다.', '오류')
          }
        } catch (error) {
          showAlert('Excel 파일 읽기 실패', '오류')
        }
        setLoading(false)
      }
      reader.readAsArrayBuffer(file)
    } else {
      // CSV 파일인 경우
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as string[][]
          const words = data
            .filter((row) => row.length >= 2 && row[0]?.trim() && row[1]?.trim())
            .map((row) => ({
              english: row[0].trim(),
              korean: row[1].trim(),
            }))

          if (words.length > 0) {
            setCsvPreview(words)
          } else {
            showAlert('유효한 데이터가 없습니다.', '오류')
          }
          setLoading(false)
        },
        error: () => {
          showAlert('파일 읽기 실패', '오류')
          setLoading(false)
        },
      })
    }
  }

  const handleCsvSave = () => {
    if (csvPreview.length > 0) {
      addOrUpdateWords(csvPreview, selectedGroup || undefined)

      // 결과 확인
      setTimeout(() => {
        const result = (window as any).__wordUpdateResult
        if (result) {
          const messages = []
          if (result.addedCount > 0) messages.push(`${result.addedCount}개 추가`)
          if (result.updatedCount > 0) messages.push(`${result.updatedCount}개 업데이트`)
          showAlert(messages.join(', ') + ' 되었습니다!', '완료')
          delete (window as any).__wordUpdateResult
        }
      }, 100)

      setCsvPreview([])
      router.push('/words')
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        단어 추가
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant={manualMode ? 'contained' : 'outlined'} onClick={() => setManualMode(true)}>
          직접 입력
        </Button>
        <Button variant={!manualMode ? 'contained' : 'outlined'} onClick={() => setManualMode(false)}>
          파일 업로드
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

      {manualMode ? (
        <Paper sx={{ p: 3 }}>
          <TextField label="영어 단어" fullWidth value={english} onChange={(e) => setEnglish(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="한글 뜻" fullWidth value={korean} onChange={(e) => setKorean(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" fullWidth startIcon={<AddIcon />} onClick={handleManualAdd}>
            추가
          </Button>
        </Paper>
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 2 }}>
            Excel 또는 CSV 파일 형식: 첫 번째 열은 영어, 두 번째 열은 한글
            <br />
            예: A열(apple), B열(사과)
          </Alert>

          <input type="file" accept=".csv,.xlsx,.xls" ref={csvInputRef} style={{ display: 'none' }} onChange={handleCsvUpload} />

          <Button variant="contained" fullWidth size="large" startIcon={<UploadFileIcon />} onClick={() => csvInputRef.current?.click()} sx={{ mb: 3 }}>
            CSV/Excel 파일 선택
          </Button>

          {loading && (
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {csvPreview.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                미리보기 ({csvPreview.length}개 단어)
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
                {csvPreview.slice(0, 10).map((word, idx) => (
                  <Typography key={idx} variant="body2" sx={{ py: 0.5 }}>
                    {word.english} - {word.korean}
                  </Typography>
                ))}
                {csvPreview.length > 10 && <Typography variant="body2">... 외 {csvPreview.length - 10}개</Typography>}
              </Box>
              <Button variant="contained" fullWidth onClick={handleCsvSave}>
                단어장에 추가
              </Button>
            </Paper>
          )}
        </>
      )}

      <AlertDialog open={alertOpen} title={alertTitle} message={alertMessage} onClose={() => setAlertOpen(false)} />
    </Box>
  )
}
