import React from 'react'
import { LogInLayoutStyle } from './index.style'

const LogInLayout = ({ children }) => {
  return (
    <LogInLayoutStyle>
      <div className='LogInBox'>
        <div className='Logo'></div>
        <div className='Title'>新規アカウント登録</div>
        <div className='Content'>{children}</div>
      </div>
    </LogInLayoutStyle>
  )
}

export default LogInLayout
