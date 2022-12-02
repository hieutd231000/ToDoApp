import { styled } from '@mui/material/styles'

export const SignInStyle = styled('form')`
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

    .LogInFail {
        color: red;
        font-size: 10px;
    }

    .Bottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            margin-top: 20px;
        }
        
        a {
            cursor: pointer;
            color: #ccc;
            text-align: center;
            padding: 20px;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
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

    .Loading {
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
    }
`