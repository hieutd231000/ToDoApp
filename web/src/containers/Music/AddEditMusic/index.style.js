import { styled } from '@mui/material/styles'

export const AddMusicStyle = styled('form')`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    

    .MuiBox-root {
        margin: 20px 0 40px 10%;  
        position: relative;
        display: flex;
        align-items: center;

        .MuiFormControl-root {
            position: absolute;
            margin-left: 20%;
            width: 50%;
        }
    }

    .Footer {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
            margin: 28px;
        }
    }
`