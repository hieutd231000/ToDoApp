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
            background-color: white;
            color: black;
            border: 2px solid #085997;
            border-radius: 32px;
            padding: 8px 28px;
            font-size: 18px;
            cursor: pointer;
            transition: 0.5s ease;
            box-shadow: inset 0px 0px 0px 0px #085997, inset 0px 0px 0px 0px #EE2C49;
            &:hover {
                color: white;
                background-color: #085997;
                box-shadow: inset 6px 5px 27px 22px #085997, inset 1px 0px 0px 0px #085997, rgba(0, 0, 0, 0.35) 0px 5px 15px;
                transform: translateY(-2px);
            }
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
`