import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'

interface ConfirmDialogProps {
  open: boolean
  title?: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, title = '확인', message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          취소
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  )
}
