import { styled } from '@mui/material/styles'

export const SignUpStyle = styled('form')`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    .MuiBox-root {
        width: 90%;
        margin: 12px 0;
        .MuiSvgIcon-root {
            width: 24px;
        }
        .MuiFormControl-root {
            label {
                left: 8px;
            }
            .MuiInputBase-root {
                font-size: 20px;
                padding: 0 4px;
            }
            .MuiFormHelperText-root {
                position: absolute;
                top: 50px;
            }
        }
    }

    .Bottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            margin-top: 20px;
        }
        
        p {
            cursor: pointer;
            color: #ccc;
            text-align: center;
            padding: 20px;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`