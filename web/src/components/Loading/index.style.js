import { styled } from '@mui/material/styles'

export const LoadingStyle = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:after{
        background-color: #ccc;
        opacity: 0.5;
    }

    .MuiCircularProgress-root {
        width: 60px;
        height: 60px;
    }
`