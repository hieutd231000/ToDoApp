import React from 'react'
import YouTube from 'react-youtube'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const MusicCard = () => {
  return (
    <div className='MusicCard'>
      <div className='MusicCard__Header'>
        <EditOutlinedIcon />
        <DeleteOutlineOutlinedIcon />
      </div>
      <div className='MusicCard__Content'>
        <YouTube
          videoId='dhDdW0mwyXg'
          sandbox='allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation'
          onReady={e => e.target.pauseVideo()}
        />
      </div>
      <div className='MusicCard__Footer'>
        <p>Co em</p>
      </div>
    </div>
  )
}

export default MusicCard
