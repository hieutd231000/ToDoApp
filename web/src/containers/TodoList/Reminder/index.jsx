import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import TodoLayout from '../../layouts/TodoLayout'
import { ReminderStyle } from './index.style'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Box } from '@mui/material'
import axios from 'axios'

const Reminder = () => {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  const navigate = useNavigate()
  const params = useParams()

  const token = JSON.parse(localStorage.getItem('todoapp_token'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  // get current task
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/reminder/${params.id}`, config)
      .then(res => {
        const data = res.data.data.end
        if (data) {
          const splitData = data.split(' ')
          setDate(splitData[0])
          setTime(data)
        }
      })
      .catch(error => console.log(error))
  }, [])

  // Add new reminder
  const handleSubmit = e => {
    e.preventDefault()
    const bodyParameters = {
      end: `${date.$y}-${
        date.$M + 1 < 10 ? '0' + (date.$M + 1) : date.$M + 1
      }-${date.$D < 10 ? '0' + date.$D : date.$D} ${
        time.$H < 10 ? '0' + time.$H : time.$H
      }:${time.$m < 10 ? '0' + time.$m : time.$m}:00`,
    }
    axios
      .post(
        `http://127.0.0.1:8000/api/reminder/${params.id}/update`,
        bodyParameters,
        config,
      )
      .then(res => {
        navigate('/home')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <TodoLayout>
      <ReminderStyle onSubmit={e => handleSubmit(e)}>
        <div className='title'>リマインダー</div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <p>日付</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='日付を選択する'
              value={date}
              onChange={newValue => {
                setDate(newValue)
              }}
              renderInput={params => <TextField {...params} required />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <p>時間</p>
            <TimePicker
              label='時間を選択する'
              value={time}
              onChange={newValue => {
                setTime(newValue)
              }}
              renderInput={params => <TextField {...params} required />}
            />
          </LocalizationProvider>
        </Box>

        <div className='Footer'>
          <Button type='submit'>保存</Button>
          <Button>
            <span onClick={() => navigate('/home')}>キャンセル</span>
          </Button>
        </div>
      </ReminderStyle>
    </TodoLayout>
  )
}

export default Reminder
