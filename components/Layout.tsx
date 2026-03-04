import { ReactNode } from 'react'
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            영어 단어장
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, py: 3 }}>{children}</Container>
      <Navigation />
    </Box>
  )
}
