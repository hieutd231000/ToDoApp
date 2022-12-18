import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import MusicLayout from '../../layouts/MusicLayout'
import { AddMusicStyle } from './index.style'
import Loading from '../../../components/Loading'

const AddEditMusic = () => {
  const [musicUrl, setMusicUrl] = useState('')
  const [musicType, setMusicType] = useState('')
  const [musicName, setMusicName] = useState('')

  const [urlError, setUrlError] = useState(false)
  const [urlErrorText, setUrlErrorText] = useState('')

  const [nameError, setNameError] = useState(false)
  const [nameErrorText, setNameErrorText] = useState('')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const token = JSON.parse(localStorage.getItem('todoapp_token'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const bodyParameters = {
    link: musicUrl,
    category_id: musicType,
    name: musicName,
  }

  // convert string status to number
  const convertStatus = status => {
    var num = -1
    switch (status) {
      case 'ポップス':
        return (num = 1)
      case 'ロフィ':
        return (num = 2)
      case 'EDM':
        return (num = 3)
      case 'ほかの':
        return (num = 4)
      default:
        return num
    }
  }

  // handle url
  const handleUrl = e => {
    setMusicUrl(e.target.value)
    if (e.target.value !== '') {
      setUrlError(false)
      setUrlErrorText('')
      setMusicUrl(e.target.value)
    } else {
      setUrlError(true)
      setUrlErrorText('URL必須')
    }
  }

  // handle Name
  const handleName = e => {
    setMusicName(e.target.value)
    if (e.target.value !== '') {
      setNameError(false)
      setNameErrorText('')
      setMusicName(e.target.value)
    } else {
      setNameError(true)
      setNameErrorText('音楽名必須')
    }
  }

  // submit task
  const handleSubmit = e => {
    e.preventDefault()
    console.log(bodyParameters)
    if (params.id) {
      axios
        .post(
          `http://127.0.0.1:8000/api/music/${params.id}/update`,
          bodyParameters,
          config,
        )
        .then(res => {
          setLoading(false)
          navigate('/home')
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    } else {
      axios
        .post('http://127.0.0.1:8000/api/music/add', bodyParameters, config)
        .then(res => {
          setLoading(false)
          navigate('/home')
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    }
  }

  return (
    <MusicLayout>
      <AddMusicStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <p>URL</p>
          <TextField
            id='url'
            error={urlError}
            helperText={urlErrorText}
            label='URLを入力する'
            variant='outlined'
            value={musicUrl ? musicUrl : ''}
            onChange={e => handleUrl(e)}
            required
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <p>タイプ</p>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              タイプを選択する
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='type'
              value={musicType}
              label='タイプを選択する'
              onChange={e => setMusicType(e.target.value)}
              required
            >
              <MenuItem value={1}>ポップス</MenuItem>
              <MenuItem value={2}>ロフィ</MenuItem>
              <MenuItem value={3}>EDM</MenuItem>
              <MenuItem value={4}>ほかの</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <p>音楽名</p>
          <TextField
            id='name'
            error={nameError}
            helperText={nameErrorText}
            label='音楽名を入力する'
            variant='outlined'
            value={musicName ? musicName : ''}
            onChange={e => handleName(e)}
            required
          />
        </Box>

        <div className='Footer'>
          <Button type='submit'>保存</Button>
          <Button>
            <p onClick={() => navigate('/home')}>キャンセル</p>
          </Button>
        </div>
        {loading ? <Loading /> : ''}
      </AddMusicStyle>
    </MusicLayout>
  )
}

export default AddEditMusic
