import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Notification = () => {
  const [currentTime, setCurrentTime] = useState()
  const setTime1 = '15:20:35'
  const setTime2 = '09:12:40'
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString([])),
      1000,
    )
    return () => clearInterval(interval)
  }, [])

  if (currentTime === setTime1 || currentTime === setTime2) {
    alert('Dậy đi ông cháu ơi!!!')
  }

  return <div>{currentTime}</div>
}

export default Notification
