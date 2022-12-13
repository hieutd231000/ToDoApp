import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { HomeStyle } from '../../Home/index.style'
import SignOut from '../../SignOut'
import Music from '../../Music'
import CountDown from '../../Countdown'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export default function TodoLayout({ children }) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <SignOut />
      <HomeStyle
        sx={{
          flexGrow: 1,
          display: 'flex',
        }}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{ borderRight: 1, borderColor: 'divider' }}>
          <Tab label='Todoリスト' {...a11yProps(0)} />
          <Tab label='音楽を聴く' {...a11yProps(1)} />
          <Tab label='タイマー設定' {...a11yProps(2)} />
        </Tabs>
        <TabPanel className='TabPanel' value={value} index={0}>
          {children}
        </TabPanel>
        <TabPanel className='TabPanel' value={value} index={1}>
          <Music />
        </TabPanel>
        <TabPanel className='TabPanel' value={value} index={2}>
          <CountDown />
        </TabPanel>
      </HomeStyle>
    </>
  )
}
