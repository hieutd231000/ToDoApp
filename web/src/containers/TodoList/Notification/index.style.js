import { keyframes, styled } from '@mui/material/styles'

const BellAnimation = keyframes`
    0% {
  	transform: rotateZ(16deg);
  }
   50% {
  	transform: rotateZ(-16deg);
  }
  100% {
  	transform: rotateZ(16deg);
  }
`

export const NotificationStyle = styled('div')`
    .animation {
        animation-name: ${BellAnimation};
        animation-duration: 1s;
        animation-iteration-count: infinite;
        color: #1976d2;
    }
`

export const NotificationElmStyle = styled('div')`
    display: flex;

    .MuiAvatar-root {
        margin-right: 10px;
    }

    span {
        padding-left: 4px;
        font-size: 18px;
        font-weight: bold;
    }

    h5 {
        font-weight: 100;
        opacity: 0.7;
    }
`