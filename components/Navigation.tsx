import { useRouter } from 'next/router'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import ListIcon from '@mui/icons-material/List'
import QuizIcon from '@mui/icons-material/Quiz'
import FolderIcon from '@mui/icons-material/Folder'

export default function Navigation() {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={currentPath}
        onChange={(_, newValue) => {
          router.push(newValue)
        }}
        showLabels
      >
        <BottomNavigationAction label="홈" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction label="추가" value="/camera" icon={<CameraAltIcon />} />
        <BottomNavigationAction label="그룹" value="/groups" icon={<FolderIcon />} />
        <BottomNavigationAction label="단어장" value="/words" icon={<ListIcon />} />
        <BottomNavigationAction label="테스트" value="/test" icon={<QuizIcon />} />
      </BottomNavigation>
    </Paper>
  )
}
