import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'

interface AlertDialogProps {
  open: boolean
  title?: string
  message: string
  onClose: () => void
}

export default function AlertDialog({ open, title = '알림', message, onClose }: AlertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}
