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
  const [title, setTitle] = useState()
  const [status, setStatus] = useState()

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

  // get current task
  if (params.id) {
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/todo/${params.id}/getTask`, config)
        .then(res => {
          setTitle(res.data.data.title)
          setStatus(res.data.data.status)
        })
        .catch(error => console.log(error))
    }, [])
  }

  // submit task
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
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

  // convert string status to number
  const convertStatus = str => {
    switch (str) {
      case '対応しない':
        return 0
      case '未対応':
        return 1
      case '対応中':
        return 2
      case '完了':
        return 3
      default:
        return ''
    }
  }

  return (
    <TodoLayout>
      <AddTaskStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <p>タスク</p>
          <TextField
            id='title'
            label='タスクを入力する'
            variant='outlined'
            onChange={e => setTitle(e.target.value)}
            defaultValue={title ? title : ''}
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
              defaultValue={convertStatus(status)}
              label='スステータスを選択する'
              onChange={e => setStatus(e.target.value)}
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
