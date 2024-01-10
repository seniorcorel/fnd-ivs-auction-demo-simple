"use client"

import { Button, TextField, Stack } from '@mui/material'
import { Wrapper } from './styles/page'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState()

  return (
    <Wrapper style={{ alignItems: 'center', justifyContent: 'center' }}>
      <form>
        <TextField
          required
          onChange={e => setUsername(e.target.value)}
          label='Display name'
          width={'300px'}
          sx={{ width: '300px', pb: 3 }}
        />
        <Stack flexDirection={'row'} justifyContent={'space-evenly'}>
          <Link href={`/streamer?username=${username}`} passHref>
            <Button
              type="submit"
              variant="contained"
              disabled={!username}
            >
              Streamer
            </Button>
          </Link>
          <Link href={`/viewers?username=${username}`} passHref>
            <Button
              type="submit"
              variant="contained"
              disabled={!username}
            >
              Viewer
            </Button>
          </Link>
        </Stack>
      </form>
    </Wrapper >
  )
}