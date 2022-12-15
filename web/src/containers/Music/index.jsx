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
  const [musicType, setMusicType] = useState()
  const [listMusic, setListMusic] = useState()

  const token = JSON.parse(localStorage.getItem('todoapp_token'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/music', config)
      .then(res => {
        setListMusic(res.data.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleMusicType = musicType => {
    switch (musicType) {
      case 1:
        return 'ポップス'
      case 2:
        return 'ロフィ'
      case 3:
        return 'EDM'
      case 4:
        return '他'
      default:
        return
    }
  }

  const handleChangeType = event => {
    setMusicType(event.target.value)
    console.log(listMusic)
    const newList = listMusic.filter(
      music => music.category === handleMusicType(event.target.value),
    )
    console.log(newList)
    setListMusic(newList)
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
          <p onClick={() => console.log('Add music')}>追加</p>
        </Button>
      </div>
      <Grid container spacing={2}>
        {listMusic
          ? listMusic.map(index => (
              <Grid item md={3} xs={4} key={index}>
                <MusicCard />
              </Grid>
            ))
          : ''}
      </Grid>
    </MusicStyle>
  )
}

export default Music
