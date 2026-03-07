import { useState } from 'react'
import { Box, Typography, Card, CardContent, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useWordStore } from '@/store/useWordStore'
import { useRouter } from 'next/router'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function Groups() {
  const { groups, addGroup, deleteGroup, getWordsByGroup } = useWordStore()
  const [open, setOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<{ id: string; name: string } | null>(null)
  const router = useRouter()

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      addGroup(newGroupName.trim())
      setNewGroupName('')
      setOpen(false)
    }
  }

  const handleGroupClick = (groupId: string) => {
    router.push(`/words?group=${groupId}`)
  }

  const handleDeleteClick = (e: React.MouseEvent, group: { id: string; name: string }) => {
    e.stopPropagation()
    setGroupToDelete(group)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (groupToDelete) {
      deleteGroup(groupToDelete.id)
    }
    setConfirmOpen(false)
    setGroupToDelete(null)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">그룹 관리</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          그룹 추가
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {groups.map((group) => {
          const wordCount = getWordsByGroup(group.id).length
          const memorizedCount = getWordsByGroup(group.id).filter((w) => w.memorized).length

          return (
            <Card key={group.id} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }} onClick={() => handleGroupClick(group.id)}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{group.name}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Chip label={`${wordCount}개 단어`} size="small" />
                    <Chip label={`${memorizedCount}개 암기`} size="small" color="primary" />
                  </Box>
                </Box>
                <IconButton onClick={(e) => handleDeleteClick(e, { id: group.id, name: group.name })}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          )
        })}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>새 그룹 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="그룹 이름"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddGroup()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>취소</Button>
          <Button onClick={handleAddGroup} variant="contained">
            추가
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        title="그룹 삭제"
        message={groupToDelete ? `${groupToDelete.name}을(를) 삭제하시겠습니까? 그룹의 모든 단어도 삭제됩니다.` : ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false)
          setGroupToDelete(null)
        }}
      />
    </Box>
  )
}
