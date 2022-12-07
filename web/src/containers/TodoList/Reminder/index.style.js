import { styled } from '@mui/material/styles'

export const ReminderStyle = styled('form')`
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 60px;
    }

    .MuiBox-root {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
        width: 100%;

        .MuiFormControl-root {
            margin-left: 10%;
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