import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Button from '../../components/Button'
import { MusicStyle } from './index.style'
import MusicCard from './MusicCard'

const Music = () => {
  const [musicType, setMusicType] = useState(0)
  const [listMusic, setListMusic] = useState()

  const token = JSON.parse(localStorage.getItem('todoapp_token'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/music', config)
      .then(res => {
        console.log(res.data.data)
        setListMusic(res.data.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleChangeType = event => {
    setMusicType(event.target.value)
    setListMusic(listMusic.filter(music => music.type === event.target.value))
  }

  return (
    <MusicStyle>
      <div className='Header'>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='music-type-label'>Music Type</InputLabel>
            <Select
              labelId='music-type-label'
              id='music'
              value={musicType}
              label='Music Type'
              defaultValue=''
              onChange={handleChangeType}
            >
              <MenuItem value={1}>ポップス</MenuItem>
              <MenuItem value={2}>ロフィ</MenuItem>
              <MenuItem value={3}>EDM</MenuItem>
              <MenuItem value={4}>他</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button>
          <p onClick={() => console.log('he')}>追加</p>
        </Button>
      </div>
      {listMusic
        ? listMusic.map(() => (
            <Grid container spacing={2}>
              <Grid item md={3} xs={4}>
                <MusicCard />
              </Grid>
            </Grid>
          ))
        : ''}
    </MusicStyle>
  )
}

export default Music
