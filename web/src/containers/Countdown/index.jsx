import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { CountdownStyle } from './index.style'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const formatTime = time => {
  let hours = Math.floor(time / 3600)
  let minutes = Math.floor((time - hours * 3600) / 60)
  let seconds = Math.floor(time - hours * 3600 - minutes * 60)

  if (hours < 10) hours = '0' + hours
  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds
  return `${hours}:${minutes}:${seconds}`
}

const Countdown = () => {
  const [countdown, setCountdown] = useState()
  const [openAdd, setOpenAdd] = useState(false)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const timerId = useRef()

  const [stop, setStop] = useState(false)

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current)
      alert('END')
    }
  }, [countdown])

  const handleAdd = () => {
    console.log(hour, minute, second)
    setCountdown(Number(hour) * 3600 + Number(minute) * 60 + Number(second))
    setOpenAdd(false)
  }

  const handleStop = () => {
    setStop(false)
    timerId.current = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
  }

  return (
    <CountdownStyle>
      {openAdd ? (
        <Box>
          <div className='AddContent'>
            <TextField
              id='hour'
              type='number'
              min='0'
              max='100'
              label='Hour'
              variant='outlined'
              onChange={e => setHour(e.target.value)}
            />
            <p>H</p>
            <TextField
              id='minute'
              type='number'
              min='0'
              max='59'
              label='Minute'
              variant='outlined'
              onChange={e => setMinute(e.target.value)}
            />
            <p>M</p>
            <TextField
              id='second'
              type='number'
              min='0'
              max='59'
              label='Second'
              variant='outlined'
              onChange={e => setSecond(e.target.value)}
            />
            <p>S</p>
          </div>
          <div className='footer'>
            <button onClick={() => setOpenAdd(false)}>キャンセル</button>
            <button onClick={() => handleAdd()}>保存</button>
          </div>
        </Box>
      ) : (
        <>
          <button className='Add' onClick={() => setOpenAdd(true)}>
            設定
          </button>
          <div className='Content'>
            <h2>カウントダウン</h2>
            <div className='Time'>
              <h1>{countdown ? formatTime(countdown) : '00:00:00'}</h1>
              <div className='footer'>
                <button className='cancel' onClick={() => setCountdown(0)}>キャンセル</button>
                {stop ? (
                  <button onClick={() => handleStop()} className='BtnStop'>
                    続く
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setStop(true)
                      clearInterval(timerId.current)
                    }}
                    disabled={countdown === 0 || !countdown}>
                    ストップ
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </CountdownStyle>
  )
}

export default Countdown
