import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import TodoLayout from '../../layouts/TodoLayout'
import { ReminderStyle } from './index.style'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Box } from '@mui/material'

const Reminder = () => {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    console.log(date.$d)
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
              renderInput={params => <TextField {...params} />}
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
              renderInput={params => <TextField {...params} />}
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
