import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '../../../components/Button'
import TodoLayout from '../../layouts/TodoLayout'
import { AddTaskStyle } from './index.style'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import Loading from '../../../components/Loading'
import { useEffect } from 'react'

const AddEditTask = () => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')

  const [titleError, setTitleError] = useState(false)
  const [titleErrorText, setTitleErrorText] = useState('')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const token = JSON.parse(localStorage.getItem('todoapp_token'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const bodyParameters = {
    title,
    status,
  }

  // convert string status to number
  const convertStatus = status => {
    var num = -1
    switch (status) {
      case '対応しない':
        return (num = 0)
      case '未対応':
        return (num = 1)
      case '対応中':
        return (num = 2)
      case '完了':
        return (num = 3)
      default:
        return num
    }
  }

  // get current task
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/todo/${params.id}/getTask`, config)
      .then(res => {
        setTitle(res.data.data.title)
        setStatus(convertStatus(res.data.data.status))
      })
      .catch(error => console.log(error))
  }, [])

  // handle Title
  const handleTitle = e => {
    setTitle(e.target.value)
    if (e.target.value !== '') {
      setTitleError(false)
      setTitleErrorText('')
      setTitle(e.target.value)
    } else {
      setTitleError(true)
      setTitleErrorText('タイトル必須')
    }
  }

  // submit task
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    console.log(bodyParameters)
    if (params.id) {
      axios
        .post(
          `http://127.0.0.1:8000/api/todo/${params.id}/update`,
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
        .post('http://127.0.0.1:8000/api/todo/add', bodyParameters, config)
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
    <TodoLayout>
      <AddTaskStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <p>タスク</p>
          <TextField
            id='title'
            error={titleError}
            helperText={titleErrorText}
            label='タスクを入力する'
            variant='outlined'
            value={title ? title : ''}
            onChange={e => handleTitle(e)}
            required
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <p>ステータス</p>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              ステータスを選択する
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='status'
              value={status}
              label='ステータスを選択する'
              onChange={e => setStatus(e.target.value)}
              required
            >
              <MenuItem value={0}>対応しない</MenuItem>
              <MenuItem value={1}>未対応</MenuItem>
              <MenuItem value={2}>対応中</MenuItem>
              <MenuItem value={3}>完了</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className='Footer'>
          <Button type='submit'>保存</Button>
          <Button>
            <p onClick={() => navigate('/home')}>キャンセル</p>
          </Button>
        </div>
        {loading ? <Loading /> : ''}
      </AddTaskStyle>
    </TodoLayout>
  )
}

export default AddEditTask
