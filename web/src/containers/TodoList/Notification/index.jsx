import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Notification = () => {
  const [currentTime, setCurrentTime] = useState()
  const setTime = '22:04:50'
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString([])),
      1000,
    )
    return () => clearInterval(interval)
  }, [])

  if (currentTime === setTime) {
    alert('Dậy đi ông cháu ơi!!!')
  }

  return <div>{currentTime}</div>
}

export default Notification
