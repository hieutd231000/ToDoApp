import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Notification = () => {
  const [currentTime, setCurrentTime] = useState()
  const setTime = '18:10:45'
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentTime(
          new Date().toLocaleTimeString('en-US', { hour12: false }),
        ),
      1000,
    )
    return () => clearInterval(interval)
  }, [])

  if (currentTime == setTime) {
    alert('Dậy đi ông cháu ơi!!!')
    console.log('hee')
  }

  return <div>{currentTime}</div>
}

export default Notification
